import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionActions from '@mui/material/AccordionActions';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

import Icon from '../Icon';
import { withGenerateData } from '../../contexts';
import type { AccordionProps, MappablePropNames } from './Accordion.types';

export default withGenerateData<AccordionProps, MappablePropNames>(
  function Accordion({
    action,
    children,
    disableActionSpacing,
    expandIcon,
    expanded,
    title,
  }) {
    return (
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
    );
  }
);
