import {
  ChartsItemTooltipContent,
  type ChartsItemContentProps,
} from '@mui/x-charts';

import { useTooltipStyles } from './PaletteViewer.styles';
import type { TooltipStyleParams } from './PaletteViewer.types';

export default function TooltipContent({
  classes: defaultClasses,
  ...props
}: ChartsItemContentProps<'pie'>) {
  const { itemData, series } = props;

  const { classes, cx } = useTooltipStyles(
    series.data[itemData.dataIndex as number] as unknown as TooltipStyleParams
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
