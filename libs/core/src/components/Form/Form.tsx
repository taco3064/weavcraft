import MuiGrid from '@mui/material/Grid';
import MuiIconButton from '@mui/material/IconButton';
import _get from 'lodash/get';
import _set from 'lodash/set';
import type { FormEvent, ReactElement } from 'react';
import type { JsonObject } from 'type-fest';

import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  useState,
} from 'react';

import Card from '../Card';
import Icon from '../Icon';
import { useGenerateProps } from '../../hooks';
import type { BaseFieldProps } from '../BaseField';
import type { FormProps } from './Form.types';

export default function Form<D extends JsonObject>(props: FormProps<D>) {
  const [
    GeneratePropsProvider,
    {
      action,
      actionJustify = 'center',
      breakpoint = 'sm',
      children,
      color,
      fullWidthFields,
      resetIcon = 'faRotateLeft',
      size,
      submitIcon = 'faCheck',
      variant,
      onSubmit,
      onValidate,
      ...formProps
    },
    { data, onChange },
  ] = useGenerateProps<D, FormProps<D>>(props);

  const [key, setKey] = useState(new Date().valueOf());

  const fields = Children.toArray(children).filter(
    isValidElement
  ) as ReactElement<BaseFieldProps<any>>[];

  const stringify = JSON.stringify({
    key,
    fields: fields.map((field) => field.props.name as string).filter(Boolean),
  });

  const styleProps = useMemo(
    () =>
      Object.fromEntries(
        Object.entries({ color, size, variant }).filter(([, value]) => value)
      ),
    [color, size, variant]
  );

  const formdata = useMemo(() => {
    const fieldNames = JSON.parse(stringify).fields as string[];

    return fieldNames.reduce(
      (acc, name) => _set(acc, name, _get(data, name)),
      {} as D
    );
  }, [data, stringify]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if ((await onValidate?.(formdata)) !== false) {
        onSubmit?.(formdata);
        onChange(formdata);
      }
    } catch (err) {
      console.warn('@weavcraft/core/Form Error:', err);
    }
  };

  return (
    <GeneratePropsProvider>
      <Card
        {...formProps}
        component="form"
        footerJustify={actionJustify}
        onSubmit={handleSubmit}
        footerAction={
          action || (
            <>
              <MuiIconButton
                data-testid="FormResetButton"
                size="large"
                color="default"
                onClick={() => setKey(new Date().valueOf())}
              >
                <Icon code={resetIcon} />
              </MuiIconButton>

              <MuiIconButton
                data-testid="FormSubmitButton"
                size="large"
                color="primary"
                type="submit"
              >
                <Icon code={submitIcon} />
              </MuiIconButton>
            </>
          )
        }
      >
        <MuiGrid
          data-testid="FormContent"
          key={key}
          container
          columns={2}
          justifyContent="center"
        >
          {fields.map((field, i) => {
            const name = field.props.name as string;
            const value = _get(data, name);
            const cols = fullWidthFields?.includes(name) ? 2 : 1;

            return (
              <MuiGrid key={i} item xs={2} {...{ [breakpoint]: cols }}>
                {cloneElement(field, {
                  value,
                  onChange: (value: any) => _set(formdata!, name, value),

                  ...(['color', 'size', 'variant'] as const).reduce(
                    (acc, styleName) => ({
                      ...acc,
                      [styleName]:
                        field.props[styleName] || styleProps[styleName],
                    }),
                    {}
                  ),
                })}
              </MuiGrid>
            );
          })}
        </MuiGrid>
      </Card>
    </GeneratePropsProvider>
  );
}
