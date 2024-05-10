import { useTooltipStyles } from './PaletteViewer.styles';

import {
  ChartsItemTooltipContent,
  type ChartsItemContentProps,
} from '@mui/x-charts';

export default function TooltipContent({
  classes: defaultClasses,
  ...props
}: ChartsItemContentProps) {
  const { itemData, series } = props;

  const { classes, cx } = useTooltipStyles(
    series.data[itemData.dataIndex as number] as Record<string, string>
  );

  return (
    <ChartsItemTooltipContent
      {...props}
      classes={{
        ...defaultClasses,
        root: cx(defaultClasses.root, classes.root),
        markCell: cx(defaultClasses.markCell, classes.markCell),
        labelCell: cx(defaultClasses.labelCell, classes.labelCell),
        valueCell: cx(defaultClasses.valueCell, classes.valueCell),
      }}
    />
  );
}
