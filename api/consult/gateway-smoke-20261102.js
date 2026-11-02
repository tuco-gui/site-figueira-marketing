export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store')
  if(req.method!=='GET')return res.status(405).end()
  const base=process.env.FIGUEIRA_INTEGRATIONS_API_URL
  const key=process.env.FIGUEIRA_INTEGRATIONS_API_KEY
  if(!base || !key)return res.status(503).end()
  try {
    const params=new URLSearchParams({property_id:'559383890',start_date:'2026-10-20',end_date:'2026-10-21',dimensions:'date',metrics:'sessions',limit:'2'})
    const r=await fetch(base.replace(/\/$/,'')+'/v1/ga4/report?'+params,{headers:{Authorization:'Bearer '+key},signal:AbortSignal.timeout(25000)})
    const v=await r.json()
    return res.status(r.ok && v.tenant==='consult' && v.data?.rows?.length===2 ? 204 : 502).end()
  }catch{return res.status(502).end()}
}
