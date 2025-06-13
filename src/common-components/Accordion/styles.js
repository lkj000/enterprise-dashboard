import { Accordion } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MuiAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />)) (({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2))',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
}));