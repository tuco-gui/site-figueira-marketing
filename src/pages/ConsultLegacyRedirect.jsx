import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const AREA_PATHS = {
  'fisica-medica': '/fisica-medica',
  'protecao-radiologica': '/protecao-radiologica',
  'engenharia-clinica': '/engenharia-clinica',
}

const SERVICE_PATHS = {
  'controle-qualidade': '/fisica-medica/controle-de-qualidade',
  'controle-de-qualidade': '/fisica-medica/controle-de-qualidade',
  'programa-protecao-radiologica': '/protecao-radiologica/programa-protecao-radiologica',
  'levantamento-radiometrico': '/protecao-radiologica/levantamento-radiometrico',
  'projeto-blindagem': '/protecao-radiologica/projeto-blindagem',
  treinamentos: '/protecao-radiologica/treinamentos',
  'licenciamento-sanitario': '/protecao-radiologica/licenciamento-sanitario',
}

export default function ConsultLegacyRedirect({ type }) {
  const { slug } = useParams()

  if (type === 'area') {
    return <Navigate to={AREA_PATHS[slug] || '/'} replace />
  }

  if (type === 'service') {
    return <Navigate to={SERVICE_PATHS[slug] || '/servicos'} replace />
  }

  if (type === 'equipment') {
    return <Navigate to={`/engenharia-clinica/equipamentos/${slug}`} replace />
  }

  if (type === 'region') {
    return <Navigate to={`/atuacao/${slug}`} replace />
  }

  return <Navigate to="/" replace />
}
