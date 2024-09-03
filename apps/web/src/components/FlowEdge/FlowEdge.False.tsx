import { useTranslation } from 'next-i18next';

import NextEdge from './FlowEdge.Next';
import type { FlowEdgeProps } from './FlowEdge.types';

export default function FalseEdge(props: FlowEdgeProps) {
  const { t } = useTranslation('pages');

  return <NextEdge {...props} label={t('opt-decision.false')} />;
}
