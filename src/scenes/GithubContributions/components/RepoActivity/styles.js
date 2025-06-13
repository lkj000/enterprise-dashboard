import styled from 'styled-components';
import { Box } from '@mui/material';

export const MainBox = styled(Box)`
    padding: 10px;
    margin-bottom: 40px;
`;

export const BoxStyle = {
  box1: {
    height: 550,
    position: 'relative'
  },
  box2: {
    direction: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '20px',
    height: 'auto',
    width: '100%',
    padding: '15px'
  },
  box3: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px'
  },
  box4: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  box5: {
    marginTop: '-3px'
  }
};