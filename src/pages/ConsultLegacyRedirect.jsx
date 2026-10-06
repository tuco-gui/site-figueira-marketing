import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const AREA_PATHS = {
  'fisica-medica': '/consult/fisica-medica',
  'protecao-radiologica': '/consult/protecao-radiologica',
  'engenharia-clinica': '/consult/engenharia-clinica',
}

export default function ConsultLegacyRedirect({ type }) {
  const { slug } = useParams()

  if (type === 'area') {
    return <Navigate to={AREA_PATHS[slug] || '/consult'} replace />
  }

  if (type === 'service') {
    return <Navigate to={`/consult/fisica-medica/${slug}`} replace />
  }

  if (type === 'equipment') {
    return <Navigate to={`/consult/engenharia-clinica/equipamentos/${slug}`} replace />
  }

  if (type === 'region') {
    return <Navigate to={`/consult/atuacao/${slug}`} replace />
  }

  return <Navigate to="/consult" replace />
}
