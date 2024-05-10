import { Trans, useTranslation } from 'next-i18next';
import type { FallbackTransProps } from './FallbackTrans.types';

export default function FallbackTrans<T extends string>({
  i18nKey,
  value,
  ...props
}: FallbackTransProps<T>) {
  const { t } = useTranslation();

  return (
    <Trans {...props} i18nKey={`${i18nKey}.${value}`} defaults={t(i18nKey)} />
  );
}
