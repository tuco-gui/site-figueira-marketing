import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { consultPath } from '@/lib/consultProject'

const AREA_PATHS = {
  'fisica-medica': consultPath('fisica-medica'),
  'protecao-radiologica': consultPath('protecao-radiologica'),
  'engenharia-clinica': consultPath('engenharia-clinica'),
}

const SERVICE_PATHS = {
  'controle-qualidade': consultPath('fisica-medica/controle-de-qualidade'),
  'controle-de-qualidade': consultPath('fisica-medica/controle-de-qualidade'),
  'programa-protecao-radiologica': consultPath('protecao-radiologica/programa-protecao-radiologica'),
  'levantamento-radiometrico': consultPath('protecao-radiologica/levantamento-radiometrico'),
  'projeto-blindagem': consultPath('protecao-radiologica/projeto-blindagem'),
  treinamentos: consultPath('protecao-radiologica/treinamentos'),
  'licenciamento-sanitario': consultPath('protecao-radiologica/licenciamento-sanitario'),
}

export default function ConsultLegacyRedirect({ type }) {
  const { slug } = useParams()

  if (type === 'area') {
    return <Navigate to={AREA_PATHS[slug] || '/consult'} replace />
  }

  if (type === 'service') {
    return <Navigate to={SERVICE_PATHS[slug] || consultPath('servicos')} replace />
  }

  if (type === 'equipment') {
    return <Navigate to={consultPath(`engenharia-clinica/equipamentos/${slug}`)} replace />
  }

  if (type === 'region') {
    return <Navigate to={consultPath(`atuacao/${slug}`)} replace />
  }

  return <Navigate to={consultPath()} replace />
}
