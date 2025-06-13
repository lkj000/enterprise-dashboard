import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { HeaderData, securityFunctions, assetTypes } from "../../requests";
import { renderBoxName } from "./TableUtils";
import { getRowHeaderStyle } from "./TableUtils";


// HEADERS
export const headers = (
  <>
    <TableCell component="th" scope="row" style={getRowHeaderStyle(0)}>
      ASSETS
    </TableCell>
    {HeaderData.map((item, i) => (
    <TableCell key={i} sx={{ borderRight: i < HeaderData.length - 1 ? '1px solid #ddd' : 'none' }}>
      <Box sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
          {item.title}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'justify', flexGrow: 1 }}>
          {item.description}
        </Typography>
      </Box>
    </TableCell>
    ))}
  </>
);


// ROWS
export const getRows = (setOpen, setSelectItem) =>  securityFunctions.map((security) => (
  <TableRow key={security}>
    <TableCell component="th" scope="row" style={getRowHeaderStyle(1)}>
      {security}
    </TableCell>
  
    {assetTypes.map((asset, i, arr) => (
      <TableCell key={i} sx={{ borderRight: i === arr.length - 1 ? 'none' : '1px solid #ddd' }}>
        {renderBoxName(security, asset, setOpen, setSelectItem)}
      </TableCell>
    ))}
  </TableRow>
));