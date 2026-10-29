import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ingestConsultBlogPost,
  validateConsultBlogPost,
} from '../src/lib/consultBlogIngestion.js'

const input = {
  client_id: 'client-consult',
  project_id: 'project-consult',
  title: 'Como estruturar um plano técnico',
  slug: 'como-estruturar-um-plano-tecnico',
  content_markdown: '# Plano técnico\n\nConteúdo editorial.',
  seo_title: 'Plano técnico para instituições',
  seo_description: 'Um guia prático para organizar conteúdo.',
  cover_url: 'https://example.test/cover.jpg',
}

test('ingestion normalizes input and always creates a private draft', async () => {
  const calls = []
  const result = await ingestConsultBlogPost({ ...input, status: 'published', is_public: true }, {
    requestSecret: 'unit-test-secret',
    expectedSecret: 'unit-test-secret',
    findClient: async id => ({ id, slug: 'consult' }),
    findProject: async (id, clientId) => ({ id, client_id: clientId }),
    upsert: async (payload, options) => {
      calls.push({ payload, options })
      return { ...payload, id: 'post-1' }
    },
  })

  assert.equal(result.status, 'draft')
  assert.equal(result.is_public, false)
  assert.equal(result.published_at, null)
  assert.deepEqual(calls[0].options, { onConflict: 'client_id,project_id,slug' })
})

test('repeated ingestion remains idempotent on the same conflict target', async () => {
  const calls = []
  const deps = {
    requestSecret: 'unit-test-secret',
    expectedSecret: 'unit-test-secret',
    findClient: async id => ({ id, slug: 'consult' }),
    findProject: async (id, clientId) => ({ id, client_id: clientId }),
    upsert: async (payload, options) => {
      calls.push({ payload, options })
      return { ...payload, id: 'same-post' }
    },
  }

  const first = await ingestConsultBlogPost(input, deps)
  const second = await ingestConsultBlogPost(input, deps)
  assert.equal(first.id, second.id)
  assert.deepEqual(calls[0].options, calls[1].options)
  assert.deepEqual(calls[0].payload, calls[1].payload)
})

test('retries do not overwrite review or published records', async () => {
  const existing = { id: 'post-1', status: 'published', is_public: true }
  let upserted = false
  const result = await ingestConsultBlogPost(input, {
    requestSecret: 'unit-test-secret',
    expectedSecret: 'unit-test-secret',
    findClient: async () => ({ id: input.client_id, slug: 'consult' }),
    findProject: async () => ({ id: input.project_id, client_id: input.client_id }),
    findExisting: async () => existing,
    upsert: async () => { upserted = true; return null },
  })
  assert.deepEqual(result, existing)
  assert.equal(upserted, false)
})

test('ingestion rejects wrong secret, another client, and unsafe cover URLs', async () => {
  await assert.rejects(ingestConsultBlogPost(input, {
    requestSecret: 'wrong-secret', expectedSecret: 'unit-test-secret',
  }), /não autorizado/i)

  await assert.rejects(ingestConsultBlogPost(input, {
    requestSecret: 'unit-test-secret',
    expectedSecret: 'unit-test-secret',
    findClient: async () => ({ id: input.client_id, slug: 'other-client' }),
    findProject: async () => ({ id: input.project_id, client_id: input.client_id }),
    upsert: async () => null,
  }), /Consult/i)

  assert.throws(() => validateConsultBlogPost({ ...input, cover_url: 'javascript:alert(1)' }), /capa/i)
})
