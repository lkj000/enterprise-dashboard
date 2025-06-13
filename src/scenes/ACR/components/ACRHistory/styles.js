import styled from 'styled-components';
import { Box, Typography } from '@mui/material';

export const MainBox = styled(Box)`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  height: auto;
`;

export const Box1 = styled(Box)`
  grid-column: span 8;
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

export const StyledTypography = styled(Typography)`
  font-weight: 600;
`; 

export const AutocompleteBox = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
  width: 280px;
`;