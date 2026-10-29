# Consult Blog Ingestion Test Fixture

This directory contains an inactive n8n workflow fixture adapted from the growth-hub test copy. It is documentation and test input only. It does not modify, activate, or call any production workflow.

The fixture expects only local or staging environment variables:

- `N8N_TEST_INGESTION_URL`: a non-production `ingest-consult-site-post` endpoint;
- `CONSULT_BLOG_INGESTION_SECRET`: a secret configured only in the non-production n8n runner and Edge Function;
- `CONSULT_TEST_CLIENT_ID` and `CONSULT_TEST_PROJECT_ID`: IDs from a local or staging database;
- `CONSULT_TEST_COVER_URL`: a non-production HTTPS cover URL.

The endpoint always writes `draft`, `is_public = false`, and `published_at = null`. Never point this fixture at production, `consult.med.br`, Supabase main, or an active n8n workflow.
