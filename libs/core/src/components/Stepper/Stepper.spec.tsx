import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from '../Card';
import Form from '../Form';
import Stepper from './Stepper';
import TextField from '../TextField';

describe('@weavcraft/core/components/Stepper', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Stepper />);

    expect(getByTestId('Stepper')).toBeTruthy();
  });

  it('should render the card step', () => {
    const { getByTestId, getByText } = render(
      <Stepper
        items={[
          {
            label: 'Step 1',
            variant: 'card',
            content: <Card>step_1 content</Card>,
          },
        ]}
      />
    );

    const next = getByTestId('StepNextButton');

    expect(getByTestId('StepLabel')).toBeTruthy();
    expect(getByTestId('StepContent')).toBeTruthy();
    expect(getByTestId('StepPrevButton')).toBeDisabled();
    expect(next).not.toBeDisabled();
    expect(next).toHaveAttribute('type', 'submit');
    expect(getByText('step_1 content')).toBeTruthy();
  });

  it('should render the form step', () => {
    const { getByTestId, getByText } = render(
      <Stepper
        items={[
          {
            label: 'Step 1',
            variant: 'form',
            content: (
              <Form>
                <TextField name="field1" />
              </Form>
            ),
          },
        ]}
      />
    );

    const next = getByTestId('StepNextButton');

    expect(getByTestId('StepLabel')).toBeTruthy();
    expect(getByTestId('StepContent')).toBeTruthy();
    expect(getByTestId('StepPrevButton')).toBeDisabled();
    expect(next).not.toBeDisabled();
    expect(next).toHaveAttribute('type', 'submit');

    expect(getByTestId('TextField').querySelector('input')!).toHaveAttribute(
      'name',
      'field1'
    );
  });

  it('should next and prev steps', () => {
    const data = {
      step1: { title: 'Step 1', content: 'step_1' },
      step2: { title: 'Step 2', content: 'step_2' },
    };

    const { getAllByTestId, getByText } = render(
      <Stepper
        data={data}
        doneButtonText="Done"
        nextButtonText="Next"
        prevButtonText="Prev"
        items={[
          {
            propMapping: { label: 'step1.title' },
            content: <Card propMapping={{ children: 'step1.content' }} />,
          },
          {
            propMapping: { label: 'step2.title' },
            content: <Card propMapping={{ children: 'step2.content' }} />,
          },
        ]}
      />
    );

    fireEvent.click(getAllByTestId('StepNextButton')[0]);
    expect(getAllByTestId('StepLabel')[1]).toHaveTextContent(data.step2.title);
    expect(getByText(data.step2.content)).toBeTruthy();
    expect(getByText('Done')).toBeTruthy();

    fireEvent.click(getAllByTestId('StepPrevButton')[1]);
    expect(getAllByTestId('StepLabel')[0]).toHaveTextContent(data.step1.title);
    expect(getByText(data.step1.content)).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  it('should call onDone', () => {
    const handleDone = jest.fn();

    const { getByTestId } = render(
      <Stepper
        onDone={handleDone}
        items={[
          {
            label: 'Step 1',
            variant: 'card',
            content: <Card>step_1 content</Card>,
          },
        ]}
      />
    );

    fireEvent.click(getByTestId('StepNextButton'));
    expect(handleDone).toHaveBeenCalled();
  });

  it('should not next when form is invalid', () => {
    const handleDone = jest.fn();

    const { getByTestId } = render(
      <Stepper
        onDone={handleDone}
        items={[
          {
            label: 'Step 1',
            variant: 'form',
            content: (
              <Form onValidate={() => false}>
                <TextField name="field1" required />
              </Form>
            ),
          },
        ]}
      />
    );

    fireEvent.click(getByTestId('StepNextButton'));
    expect(handleDone).not.toHaveBeenCalled();
  });
});
