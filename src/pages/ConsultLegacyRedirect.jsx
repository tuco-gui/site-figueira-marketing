import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const AREA_PATHS = {
  'fisica-medica': '/consult/fisica-medica',
  'protecao-radiologica': '/consult/protecao-radiologica',
  'engenharia-clinica': '/consult/engenharia-clinica',
}

const SERVICE_PATHS = {
  'controle-qualidade': '/consult/fisica-medica/controle-de-qualidade',
  'controle-de-qualidade': '/consult/fisica-medica/controle-de-qualidade',
  'programa-protecao-radiologica': '/consult/protecao-radiologica/programa-protecao-radiologica',
  'levantamento-radiometrico': '/consult/protecao-radiologica/levantamento-radiometrico',
  'projeto-blindagem': '/consult/protecao-radiologica/projeto-blindagem',
  treinamentos: '/consult/protecao-radiologica/treinamentos',
  'licenciamento-sanitario': '/consult/protecao-radiologica/licenciamento-sanitario',
}

export default function ConsultLegacyRedirect({ type }) {
  const { slug } = useParams()

  if (type === 'area') {
    return <Navigate to={AREA_PATHS[slug] || '/consult'} replace />
  }

  if (type === 'service') {
    return <Navigate to={SERVICE_PATHS[slug] || '/consult/servicos'} replace />
  }

  if (type === 'equipment') {
    return <Navigate to={`/consult/engenharia-clinica/equipamentos/${slug}`} replace />
  }

  if (type === 'region') {
    return <Navigate to="/consult/servicos" replace />
  }

  return <Navigate to="/consult" replace />
}
