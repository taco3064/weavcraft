import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { render } from '@testing-library/react';

export function renderWithLocalizationProvider(
  ...args: Parameters<typeof render>
) {
  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {args[0]}
    </LocalizationProvider>,
    args[1]
  );
}
