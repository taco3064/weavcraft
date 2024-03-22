import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Form from './Form';
import NumericField from '../NumericField';
import TextField from '../TextField';

describe('@weavcraft/core/components/Form', () => {
  it('renders successfully', () => {
    const { baseElement, getByTestId } = render(<Form />);

    expect(baseElement.querySelector('form')).toBeInTheDocument();
    expect(getByTestId('FormContent')).toBeInTheDocument();
    expect(getByTestId('FormResetButton')).toBeInTheDocument();
    expect(getByTestId('Icon_faRotateLeft')).toBeInTheDocument();
    expect(getByTestId('FormSubmitButton')).toBeInTheDocument();
    expect(getByTestId('Icon_faCheck')).toBeInTheDocument();
  });

  it('renders with button icons', () => {
    const resetIcon = 'faRotateRight';
    const submitIcon = 'faGithub';
    const { getByTestId } = render(<Form {...{ resetIcon, submitIcon }} />);

    expect(getByTestId(`Icon_${resetIcon}`)).toBeInTheDocument();
    expect(getByTestId(`Icon_${submitIcon}`)).toBeInTheDocument();
  });

  it('renders field with style props', () => {
    const { getByTestId } = render(
      <Form color="secondary" size="small" variant="filled">
        <TextField name="field1" />
      </Form>
    );

    expect(
      getByTestId('TextField').querySelector('.MuiInputBase-root')
    ).toHaveClass(
      'MuiFilledInput-root',
      'MuiInputBase-colorSecondary',
      'MuiInputBase-sizeSmall'
    );
  });

  it('renders all fields', () => {
    const { getByTestId } = render(
      <Form>
        <TextField name="field1" />
        <NumericField name="field2" />
      </Form>
    );

    const text = getByTestId('TextField');
    const numeric = getByTestId('NumericField');

    expect(text).toBeInTheDocument();
    expect(text.querySelector('input')).toHaveAttribute('name', 'field1');
    expect(numeric).toBeInTheDocument();
    expect(numeric.querySelector('input')).toHaveAttribute('name', 'field2');
  });

  it('renders all fields with breakpoint and fullWidthFields', () => {
    const { baseElement } = render(
      <Form breakpoint="md" fullWidthFields={['field3']}>
        <TextField name="field1" />
        <TextField name="field2" />
        <TextField name="field3" />
      </Form>
    );

    expect(baseElement.querySelectorAll('.MuiGrid-grid-xs-2')).toHaveLength(3);
    expect(baseElement.querySelectorAll('.MuiGrid-grid-md-1')).toHaveLength(2);
    expect(baseElement.querySelectorAll('.MuiGrid-grid-md-2')).toHaveLength(1);
  });

  it('renders all fields with default values', () => {
    const { getByTestId } = render(
      <Form data={{ field1: 'value1', field2: 2 }}>
        <TextField name="field1" />
        <NumericField name="field2" />
      </Form>
    );

    const text = getByTestId('TextField');
    const numeric = getByTestId('NumericField');

    expect(text.querySelector('input')).toHaveValue('value1');
    expect(numeric.querySelector('input')).toHaveValue('2');
  });

  it('calls onSubmit with form data', async () => {
    const inputs = { field1: 'value1', field2: 2 };
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <Form onSubmit={onSubmit}>
        <TextField name="field1" />
        <NumericField name="field2" />
      </Form>
    );

    fireEvent.change(getByTestId('TextField').querySelector('input')!, {
      target: { value: inputs.field1 },
    });

    fireEvent.change(getByTestId('NumericField').querySelector('input')!, {
      target: { value: inputs.field2 },
    });

    fireEvent.click(getByTestId('FormSubmitButton'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(inputs));
  });

  it('should not calls onSubmit when onValidate returns false', async () => {
    const data = { field1: 'value1', field2: 2 };
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <Form data={data} onValidate={() => false} onSubmit={onSubmit}>
        <TextField name="field1" />
        <NumericField name="field2" />
      </Form>
    );

    fireEvent.change(getByTestId('TextField').querySelector('input')!, {
      target: { value: 'invalid2' },
    });

    fireEvent.change(getByTestId('NumericField').querySelector('input')!, {
      target: { value: 3 },
    });

    fireEvent.click(getByTestId('FormSubmitButton'));
    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
  });

  it('should reset form', async () => {
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <Form onSubmit={onSubmit}>
        <TextField name="field1" />
        <NumericField name="field2" />
      </Form>
    );

    fireEvent.change(getByTestId('TextField').querySelector('input')!, {
      target: { value: 'value1' },
    });

    fireEvent.change(getByTestId('NumericField').querySelector('input')!, {
      target: { value: 2 },
    });

    fireEvent.click(getByTestId('FormResetButton'));
    fireEvent.click(getByTestId('FormSubmitButton'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({}));
  });

  it('should reset form with initial data', async () => {
    const data = { field1: 'value1', field2: 2 };
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <Form data={data} onSubmit={onSubmit}>
        <TextField name="field1" />
        <NumericField name="field2" />
      </Form>
    );

    fireEvent.change(getByTestId('TextField').querySelector('input')!, {
      target: { value: 'value2' },
    });

    fireEvent.change(getByTestId('NumericField').querySelector('input')!, {
      target: { value: 3 },
    });

    fireEvent.click(getByTestId('FormResetButton'));
    fireEvent.click(getByTestId('FormSubmitButton'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(data));
  });
});
