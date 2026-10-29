import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getSitePostPermissions,
  prepareSitePostWrite,
} from '../src/lib/sitePostsAdminApi.js'

const consult = { id: '0b88061b-676d-48fb-846a-2483b0cf8284', slug: 'consult' }
const consultProject = { id: '6bf62bce-b7ff-46f1-84e9-07c54689a8e4', client_id: consult.id }

test('Figueira admin and staff can manage the Consult project', () => {
  for (const role of ['admin', 'staff']) {
    assert.deepEqual(getSitePostPermissions({
      profile: { platform_role: role },
      client: consult,
      project: consultProject,
    }), { canRead: true, canEdit: true, canReview: true, canPublish: true })
  }
})

test('Consult owner and manager can manage only the scoped project', () => {
  for (const role of ['owner', 'manager']) {
    const permissions = getSitePostPermissions({
      profile: { memberships: [{ client_id: consult.id, role, is_active: true }] },
      client: consult,
      project: consultProject,
    })
    assert.equal(permissions.canEdit, true)
    assert.equal(permissions.canPublish, true)
  }

  assert.equal(getSitePostPermissions({
    profile: { memberships: [{ client_id: consult.id, role: 'manager', is_active: true }] },
    client: consult,
    project: { id: 'other-project', client_id: consult.id },
  }).canEdit, false)
})

test('client and viewer remain read-only', () => {
  for (const role of ['client', 'viewer']) {
    assert.deepEqual(getSitePostPermissions({
      profile: { memberships: [{ client_id: consult.id, role, is_active: true }] },
      client: consult,
      project: consultProject,
    }), { canRead: true, canEdit: false, canReview: false, canPublish: false })
  }
})

test('write preparation scopes actions and keeps drafts private', () => {
  const post = {
    title: 'Título válido',
    slug: 'titulo-valido',
    content_markdown: 'Conteúdo técnico',
    seo_title: 'Título SEO',
    seo_description: 'Descrição SEO',
    cover_url: 'https://example.test/cover.jpg',
  }
  const scope = {
    profile: { memberships: [{ client_id: consult.id, role: 'manager', is_active: true }] },
    client: consult,
    project: consultProject,
  }

  const draft = prepareSitePostWrite(post, scope, 'draft')
  assert.equal(draft.status, 'draft')
  assert.equal(draft.is_public, false)
  assert.equal(draft.client_id, consult.id)
  assert.throws(() => prepareSitePostWrite(post, {
    ...scope,
    profile: { memberships: [{ client_id: consult.id, role: 'viewer', is_active: true }] },
  }, 'publish'), /permissão/i)
  assert.throws(() => prepareSitePostWrite({ ...post, seo_title: 'x'.repeat(61) }, scope, 'review'), /SEO/i)
})
