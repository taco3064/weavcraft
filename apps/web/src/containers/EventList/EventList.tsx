import { useTranslation } from 'next-i18next';

import { EditorList } from '~web/components';
import type { EventListProps } from './EventList.types';

export default function EventList({
  config,
  widget,
  onActive,
  onClose,
}: EventListProps) {
  const { t } = useTranslation('pages');

  return (
    <EditorList
      title={t('ttl-widget-events')}
      description={widget.title}
      onClose={onClose}
      render={(classes) => {
        return <>tEST</>;
      }}
    />
  );
}
