jest.mock('@mui/x-charts', () => ({
  PieChart: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@mui/material/styles/createPalette', () => ({
  default: jest.fn().mockImplementation(({ children }) => children),
}));
