import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ToggleButtonGroup from './ToggleButtonGroup';

describe('@weavcraft/core/components/ToggleButtonGroup', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<ToggleButtonGroup />);

    expect(getByTestId('ToggleButtonGroup')).toBeTruthy();
  });

  it('should render options successfully', () => {
    const { getAllByTestId } = render(
      <ToggleButtonGroup
        records={records}
        optionProps={{ propMapping: { text: 'label', value: 'value' } }}
      />
    );

    const buttons = getAllByTestId('ToggleButton');

    expect(buttons).toHaveLength(records.length);

    buttons.forEach((button, i) => {
      expect(button).toHaveTextContent(records[i].label);
      expect(button).toHaveValue(records[i].value);
    });
  });

  it('should render value by index if not provided', () => {
    const { getAllByTestId } = render(
      <ToggleButtonGroup
        records={records}
        optionProps={{ propMapping: { text: 'label' } }}
      />
    );

    getAllByTestId('ToggleButton').forEach((button, i) =>
      expect(button).toHaveValue(i.toString())
    );
  });

  it('should render icon if text is also provided', () => {
    const { getByTestId, getAllByTestId } = render(
      <ToggleButtonGroup
        records={records}
        optionProps={{ propMapping: { text: 'label', icon: 'icon' } }}
      />
    );

    getAllByTestId('ToggleButton').forEach((_button, i) =>
      expect(getByTestId(`Icon_${records[i].icon}`)).toBeTruthy()
    );
  });

  it('calls onChange when selected changes', () => {
    const name = 'rest';
    const onChange = jest.fn();

    const { getAllByTestId } = render(
      <ToggleButtonGroup
        name={name}
        records={records}
        optionProps={{ propMapping: { text: 'label', value: 'value' } }}
        onChange={onChange}
      />
    );

    const buttons = getAllByTestId('ToggleButton');

    buttons.forEach((button, i) => {
      button.click();
      expect(onChange).toHaveBeenCalledWith(records[i].value, name);
    });
  });

  it('supports multiple selection', () => {
    const onChange = jest.fn();

    const { getAllByTestId } = render(
      <ToggleButtonGroup
        records={records}
        value={[records[0].value]}
        optionProps={{ propMapping: { text: 'label', value: 'value' } }}
        variant="multiple"
        onChange={onChange}
      />
    );

    fireEvent.click(getAllByTestId('ToggleButton')[1]);

    expect(onChange).toHaveBeenCalledWith(
      [records[0].value, records[1].value],
      undefined
    );
  });

  const records = [
    { icon: 'faGithub', label: 'Option 1', value: 'option1' },
    { icon: 'faEdit', label: 'Option 2', value: 'option2' },
    { icon: 'faClose', label: 'Option 3', value: 'option3' },
  ];
});
