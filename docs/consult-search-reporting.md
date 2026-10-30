# Consult: relatórios, indexação e radar de busca

The Consult admin uses Vercel Functions under `/api/consult/*`; there is no N8N dependency.

## Google access required by the deployed functions

Set the following as **private server environment variables** in the Vercel project that serves the Figueira homologation URL:

- `GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL`
- `GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY` (PEM value; Vercel multiline secret or escaped `\\n`)
- `GOOGLE_GA4_PROPERTY_ID` (optional; defaults to the Consult property configured in the project)
- `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`, or the existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`

The Google service account must be granted read access to the `https://consult.med.br/` Search Console property and Viewer access to the Consult GA4 property. Enable the Search Console API and Google Analytics Data API in the Google Cloud project that owns the service account. Never use the Google private key or Supabase service-role key in browser variables or source control.

## Endpoints

- `GET /api/consult/reports`: GA4 totals and acquisition channels, Search Console totals, queries and pages for the last 28 complete days. Google Ads is explicitly marked as awaiting MCC linkage.
- `POST /api/consult/indexing`: with `{ "fromSitemaps": true }`, lists URLs in Search Console sitemaps; with `{ "urls": [...] }`, inspects up to 50 URLs through URL Inspection. Inspections are live and are not persisted in Supabase. A URL Inspection result describes Google's indexed version and is not a live indexability test.
- `GET /api/consult/trends`: Google Trends RSS for Brazil plus Google News RSS for Consult's editorial themes. Trends RSS is a public signal for country-level trending searches, not keyword search-volume history. Google's Trends API remains alpha access by application.

All three endpoints verify the caller's Supabase session and Consult client membership before returning information. The endpoints expose only Consult's fixed Search Console property and GA4 property.
