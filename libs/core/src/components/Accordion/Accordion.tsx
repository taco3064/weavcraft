import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionActions from '@mui/material/AccordionActions';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { JsonObject } from 'type-fest';

import Icon from '../Icon';
import { useGenerateProps } from '../../hooks';
import type { AccordionProps } from './Accordion.types';

export default function Accordion<D extends JsonObject>(
  props: AccordionProps<D>
) {
  const [
    GenerateDataProvider,
    { action, children, disableActionSpacing, expandIcon, expanded, title },
  ] = useGenerateProps<D, AccordionProps<D>>(props);

  return (
    <GenerateDataProvider>
      <MuiAccordion defaultExpanded={expanded} data-testid="Accordion">
        <MuiAccordionSummary
          expandIcon={<Icon code={expandIcon} />}
          data-testid="AccordionSummary"
        >
          {title}
        </MuiAccordionSummary>

        {!expanded ? null : (
          <>
            <MuiAccordionDetails data-testid="AccordionDetails">
              {children}
            </MuiAccordionDetails>

            {action && (
              <MuiAccordionActions
                disableSpacing={disableActionSpacing}
                data-testid="AccordionActions"
              >
                {action}
              </MuiAccordionActions>
            )}
          </>
        )}
      </MuiAccordion>
    </GenerateDataProvider>
  );
}
