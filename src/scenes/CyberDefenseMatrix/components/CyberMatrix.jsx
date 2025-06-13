import { React, useState } from 'react';
import { Box, Dialog, Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import CDMDialog from './CDMDialog';
import { headers, getRows } from './tables/TableComponent';
import { getRowStyle } from './tables/TableUtils';


const CyberMatrix = () => {

  const [ open, setOpen ] = useState(false);
  const [ selectItem, setSelectItem ] = useState(null); 

  const handleClose = () => {
    setSelectItem(null);
    setOpen(false);
  };


  return (
    <Box>

      <TableContainer component={Paper}>
        <Table aria-label="table with row headers">
          <TableBody>
            <TableRow style={getRowStyle()}>
              {headers}
            </TableRow>
            {getRows(setOpen, setSelectItem)}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <CDMDialog selectItem={selectItem}/>
      </Dialog>
    </Box>
  );
};

export default CyberMatrix;