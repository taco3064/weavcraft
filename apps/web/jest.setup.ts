jest.mock('@mui/x-charts', () => ({
  PieChart: jest.fn().mockImplementation(({ children }) => children),
}));
