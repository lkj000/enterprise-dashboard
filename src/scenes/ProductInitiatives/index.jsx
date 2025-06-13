import React from 'react';
import { Box, useTheme } from '@mui/material';
import Header from "../../components/Header";
import ProductCard from './components/ProductCard';
import { InitiativeData } from "./requests";
import { tokens } from "../../theme";

const ProductInitiatives = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box m="25px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Product Initiatives" />
      </Box>

      <ProductCard data={InitiativeData} theme={theme} colors={colors} />
    </Box>
  );
};

export default ProductInitiatives;