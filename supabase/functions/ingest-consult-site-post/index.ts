import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { IngestionValidationError, ingestConsultBlogPost } from "../../../src/lib/consultBlogIngestion.js";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-consult-ingestion-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...cors, "Content-Type": "application/json" } });
}

function requestSecret(request: Request) {
  const header = request.headers.get("x-consult-ingestion-secret") || "";
  if (header) return header;
  return (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (request.method !== "POST") return json({ ok: false, error: "Método não permitido." }, 405);

  const expectedSecret = Deno.env.get("CONSULT_BLOG_INGESTION_SECRET") || "";
  if (!expectedSecret || requestSecret(request) !== expectedSecret) return json({ ok: false, error: "Não autorizado." }, 401);

  try {
    const body = await request.json();
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    if (!supabaseUrl || !serviceKey) return json({ ok: false, error: "Ingestão não configurada." }, 500);

    const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const result = await ingestConsultBlogPost(body, {
      requestSecret: requestSecret(request),
      expectedSecret,
      findClient: async (id: string) => {
        const { data, error } = await admin.from("clients").select("id,slug").eq("id", id).maybeSingle();
        if (error) throw error;
        return data;
      },
      findProject: async (id: string, clientId: string) => {
        const { data, error } = await admin.from("projects").select("id,client_id").eq("id", id).eq("client_id", clientId).maybeSingle();
        if (error) throw error;
        return data;
      },
      findExisting: async (payload: Record<string, unknown>) => {
        const { data, error } = await admin.from("site_posts").select("id,status,is_public").eq("client_id", payload.client_id).eq("project_id", payload.project_id).eq("slug", payload.slug).maybeSingle();
        if (error) throw error;
        return data;
      },
      upsert: async (payload: Record<string, unknown>, options: { onConflict: string }) => {
        const { data, error } = await admin.from("site_posts").upsert(payload, { onConflict: options.onConflict }).select().maybeSingle();
        if (error) throw error;
        return data;
      },
    });
    return json({ ok: true, post: result });
  } catch (error) {
    if (error instanceof IngestionValidationError) return json({ ok: false, error: error.message }, 400);
    return json({ ok: false, error: "Não foi possível ingerir o artigo." }, 500);
  }
});
