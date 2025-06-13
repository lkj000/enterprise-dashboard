import { React, useState } from 'react';
import { Box } from '@mui/material';
import ProductDropdown from './ProductDropdown';
import ProductTable from './ProductTable';

const ProductCard = ({ data, theme, colors }) => {

  const [ projKey, setProjKey ] = useState('All');
  const [ port, setPort ] = useState('All');
  const [ selectVP, setSelectVP ] = useState('All');
  const [ selectDirector, setSelectDirector ] = useState('All');
  const [ selectManager, setSelectManager ] = useState('All');

  
  return (
    <Box>
      <ProductDropdown
        input={data}
        projKey={projKey}
        setProjKey={setProjKey}
        port={port}
        setPort={setPort}
        selectVP={selectVP}
        setSelectVP={setSelectVP}
        selectDirector={selectDirector}
        setSelectDirector={setSelectDirector}
        selectManager={selectManager}
        setSelectManager={setSelectManager}
        theme={theme}
        colors={colors}
      />
       <ProductTable
          input={data}
          colors={colors}
          projKey={projKey}
          port={port}
          selectVP={selectVP}
          selectDirector={selectDirector}
          selectManager={selectManager}
       />
    </Box>
  );
};

export default ProductCard;