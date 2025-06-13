import { Box, Typography } from '@mui/material';
import { CyberData } from '../../requests';


export const renderBoxName = (security, asset, setOpen, setSelectItem) => {
  const names = CyberData.filter(item => item.security_function.includes(security) && item.asset_category.includes(asset))
    .map(item => item.name);

  const handleClick = (event) => {
    const clicked = event.target.innerText;
    const clickedElement = CyberData.find(item => item.name === clicked);
    setSelectItem(clickedElement);
    setOpen(true);
  };

  return (
    <Box display="flex" flexWrap="wrap">
      {names.map((name, index) => (
        <Box key={index} sx={{ margin: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center', cursor: 'pointer' }}
          onClick={handleClick}
        >
          <Typography variant="body2">{name}</Typography>
        </Box>
      ))}
    </Box>
  );
};


// STYLES
export const getRowStyle = () => ({
  borderBottom: '2px solid #e0e0e0'
});
    
export const getRowHeaderStyle = (index) => ({
  writingMode: 'vertical-rl',
  transform: 'rotate(180deg)',
  textAlign: 'center',
  backgroundColor: index === 0 ? '#FFA500' : '#008000', // Orange for the first row, green for others
  color: '#fff',
  fontWeight: 'bold',
  textTransform: 'uppercase'
});