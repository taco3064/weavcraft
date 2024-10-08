import * as Comp from './components';

//* Default export all the components
export default Comp;

//* Export the containers & hooks
export * from './containers';

export {
  getBreakpointMatches,
  useBreakpoint,
  useBreakpointMatches,
  type BreakpointValues,
} from './hooks';

//* Export the components by group, and the group name must be in uppercase.
export const Display = {
  Avatar: Comp.Avatar,
  AvatarGroup: Comp.AvatarGroup,
  Badge: Comp.Badge,
  Chip: Comp.Chip,
  Form: Comp.Form,
  Icon: Comp.Icon,
  ImageList: Comp.ImageList,
  Tooltip: Comp.Tooltip,
  Typography: Comp.Typography,
};

export const Layout = {
  Accordion: Comp.Accordion,
  Card: Comp.Card,
  Collapse: Comp.Collapse,
  Container: Comp.Container,
  Dialog: Comp.Dialog,
  Divider: Comp.Divider,
  Drawer: Comp.Drawer,
  Grid: Comp.Grid,
  List: Comp.List,
  Popover: Comp.Popover,
  Stepper: Comp.Stepper,
  Tabs: Comp.Tabs,
  Toolbar: Comp.Toolbar,
};

export const Interaction = {
  Button: Comp.Button,
  ButtonGroup: Comp.ButtonGroup,
  IconButton: Comp.IconButton,
  Link: Comp.Link,
  Fab: Comp.Fab,
  Menu: Comp.Menu,
  SpeedDial: Comp.SpeedDial,
  Selection: Comp.Selection,
  Slider: Comp.Slider,
};

export const Input = {
  TextAreaField: Comp.TextAreaField,
  TextField: Comp.TextField,
  NumericField: Comp.NumericField,
  NumericFormatField: Comp.NumericFormatField,
  SwitchField: Comp.SwitchField,
  MultipleSelectField: Comp.MultipleSelectField,
  SingleSelectField: Comp.SingleSelectField,
  TimePickerField: Comp.TimePickerField,
  DatePickerField: Comp.DatePickerField,
  DateTimePickerField: Comp.DateTimePickerField,
  CheckboxGroup: Comp.CheckboxGroup,
  RadioGroup: Comp.RadioGroup,
  ToggleButtonGroup: Comp.ToggleButtonGroup,
};
