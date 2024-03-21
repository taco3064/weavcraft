import MuiGrid from '@mui/material/Grid';
import MuiIconButton from '@mui/material/IconButton';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { Children, cloneElement, isValidElement, useMemo } from 'react';
import type { FormEvent, ReactElement } from 'react';

import Card from '../Card';
import Icon from '../Icon';
import type { BaseFieldProps } from '../BaseField';
import type { FormProps, MappablePropNames } from './Form.types';

import {
  withGenerateDataProps,
  useComponentData,
  type GenericData,
} from '../../contexts';

export default withGenerateDataProps<FormProps, MappablePropNames>(
  function Form<D extends GenericData>({
    breakpoint = 'sm',
    children,
    fullWidthFields,
    resetIcon = 'faRotateLeft',
    submitIcon = 'faCheck',
    onSubmit,
    ...props
  }: FormProps<D>) {
    const { data, onChange } = useComponentData<D>();

    const fields = Children.toArray(children).filter(
      isValidElement
    ) as ReactElement<BaseFieldProps<any>>[];

    const stringify = JSON.stringify(
      fields.map((field) => field.props.name as string).filter(Boolean)
    );

    const formdata = useMemo(() => {
      const fieldNames = JSON.parse(stringify) as string[];

      return fieldNames.reduce(
        (acc, name) => _set(acc, name, _get(data, name)),
        {} as D
      );
    }, [data, stringify]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onChange(formdata);
      onSubmit?.(formdata!);
    };

    return (
      <Card
        {...props}
        component="form"
        footerJustify="center"
        onSubmit={handleSubmit}
        footerAction={
          <>
            <MuiIconButton size="large" color="default">
              <Icon code={resetIcon} />
            </MuiIconButton>

            <MuiIconButton size="large" color="primary" type="submit">
              <Icon code={submitIcon} />
            </MuiIconButton>
          </>
        }
      >
        <MuiGrid container columns={2}>
          {fields.map((field, i) => {
            const name = field.props.name as string;
            const value = _get(data, name);
            const cols = fullWidthFields?.includes(name) ? 2 : 1;

            return (
              <MuiGrid item xs={2} {...{ [breakpoint]: cols }}>
                {cloneElement(field, {
                  key: i,
                  value,
                  onChange: (value: any) => _set(formdata!, name, value),
                })}
              </MuiGrid>
            );
          })}
        </MuiGrid>
      </Card>
    );
  }
);
