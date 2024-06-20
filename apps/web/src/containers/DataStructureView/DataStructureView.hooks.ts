import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import type { DataStructureViewProps } from './DataStructureView.types';

export function useDataFields(value: DataStructureViewProps['value']) {
  return useMemo(
    () =>
      value
        .map((field) => (Array.isArray(field) ? field : [field]))
        .sort(([field1, sub1], [field2, sub2]) => {
          const s1 = Array.isArray(sub1) ? 1 : 0;
          const s2 = Array.isArray(sub2) ? 1 : 0;

          return s1 - s2 || field1.localeCompare(field2);
        }),
    [value]
  );
}

export function useFieldChangeHandler(
  onChange: DataStructureViewProps['onChange']
) {
  const handleChangeRef = useRef(onChange);

  useImperativeHandle(handleChangeRef, () => onChange, [onChange]);

  return useCallback(
    (
      structures: DataStructureViewProps['value'],
      e: Parameters<NonNullable<DataStructureViewProps['onChange']>>[0]
    ) => {
      const isDuplicate = structures.some(
        (field) => (Array.isArray(field) ? field : [field])[0] === e.fieldPath
      );

      if (!isDuplicate) {
        handleChangeRef.current?.(e);
      }
    },
    []
  );
}
