import * as Comp from './components';

export const Display = {
  Avatar: Comp.Avatar,
  Badge: Comp.Badge,
  Chip: Comp.Chip,
  Icon: Comp.Icon,
  Tooltip: Comp.Tooltip,
  Typography: Comp.Typography,
};

export const Layout = {
  Accordion: Comp.Accordion,
  Collapse: Comp.Collapse,
  Dialog: Comp.Dialog,
  Toolbar: Comp.Toolbar,

  /**
   * TODO: Need to add the following components
   * * - Card
   * * - Container
   * * - Divider (唯一一個不支援資料轉換 props 的元件)
   * * - Drawer
   * * - Form
   * * - Popover
   */
};

export const Collection = {
  AvatarGroup: Comp.AvatarGroup,
  ImageList: Comp.ImageList,
  List: Comp.List,

  /**
   * TODO: Need to add the following components
   * * - ButtonGroup
   * * - Grid
   * * - Menu
   * * - SpeedDial
   * * - Step
   * * - ToggleButtonGroup
   */
};

export const Interaction = {
  Button: Comp.Button,
  SelectionControl: Comp.SelectionControl,

  /**
   * TODO: Need to add the following components
   * * - Fab
   * * - IconButton
   * * - Link
   * * - Slider
   */
};

export const Input = {
  CheckboxGroup: Comp.CheckboxGroup,
  RadioGroup: Comp.RadioGroup,
  NumericField: Comp.NumericField,
  NumericFormatField: Comp.NumericFormatField,
  MultipleSelectField: Comp.MultipleSelectField,
  SingleSelectField: Comp.SingleSelectField,
  SwitchField: Comp.SwitchField,
  TextAreaField: Comp.TextAreaField,
  TextField: Comp.TextField,
  TimePickerField: Comp.TimePickerField,
  DatePickerField: Comp.DatePickerField,
  DateTimePickerField: Comp.DateTimePickerField,
};
