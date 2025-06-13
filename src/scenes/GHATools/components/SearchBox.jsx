import { React, useEffect, useState }  from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Paper, Tooltip } from '@mui/material';
import CopyIcon from '@mui/icons-material/ContentCopy';
import SearchBar from '../../../common-components/SearchBar';
import './styles.css';


const SearchBox = ({ data, setWorkflowData, setMainTabValue, setSubTabValue, theme, colors }) => {

  const { palette: { mode } } = theme;
  const [searchParams] = useSearchParams();

  const [ input, setInput ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ filteredData, setFilteredData ] = useState([]);
  const [ selectedIndex, setSelectedIndex ] = useState(0);
  const [ showResults, setShowResults ] = useState(false);

  //styles
  const listItemStyles = {
    secondary: { color: colors.tertiary[400], fontSize: '14px' },
    primary: { fontSize: '16px' },
    icon: { color: colors.tertiary[400] }
  };


  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const path1 = searchParams.get('mainTab');
    const path2 = searchParams.get('title');
    const path3 = searchParams.get('index');
    const path4 = searchParams.get('text');
    path1 && getSelectedURL(path1, path2, path3, path4);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */


  // AUTO SCROLL TO SELECTED ITEM
  useEffect(() => {
    if (showResults && selectedIndex > 0) {
      const selectedElement = document.getElementById(`list-item-${selectedIndex}`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [showResults, selectedIndex]);


  useEffect(() => {
    const result = Object.entries(data).flatMap(([mainKey, mainValue]) =>
      mainValue.flatMap(item =>
        item.content ? Object.entries(item.content).flatMap(([subKey, subValue], subIndex) =>
          subValue.map(textItem => ({
            ...textItem,
            mainTab: mainKey,
            title: item.title,
            subIndex: subIndex,
            subTab: subKey
          }))
        ) : []
      )
    );
    setInput(result);
    setWorkflowData(result);
  }, [data, setWorkflowData]);


  const handleSearch = (newValue) => {
    setSearch(newValue);
    if (newValue.length === 0) {
      setSearch("");
      setFilteredData([]);
      setSubTabValue({ subBoxName: "", subText: "" });
      setSelectedIndex(0);
      setShowResults(false);
    } else {
      setShowResults(true);
      const lowerCaseValue = newValue.trim().toLowerCase();
      const isUrlSearch = [':', '//', '-', '.', '_', '.yml'].some(prefix => lowerCaseValue.includes(prefix));
      const filteredData = input.filter(item => isUrlSearch 
        ? item.url.toLowerCase().includes(lowerCaseValue) 
        : item.text.toLowerCase().includes(lowerCaseValue)
      );
      setFilteredData(filteredData);
    }
  };


  const handleClose = () => {
    setSearch("");
    setFilteredData([]);
    setSubTabValue({ subBoxName: "", subText: "" });
    setSelectedIndex(0);
    setShowResults(false);
  };

  const getSelectedURL = (mainTab, title, index, text) => {
    setMainTabValue(mainTab);
    if (title) {
      setSubTabValue({
        subBoxName: title + "-" + index,
        subText: text
      });
    }
  };


  const handleListButton = (info) => {
    getSelectedURL(info.mainTab, info.title, info.subIndex, info.text);
    setShowResults(false);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleOnFocus = () => {
    if (search.length > 0) {
      setShowResults(true);
    }
  };


  // COPY URL
  const handleURL = async (item) => {
    try {
      const host = window.location.origin;
      const urlPath = window.location.pathname;
      const paramsObj = new URLSearchParams({
        mainTab: item.mainTab,
        title: item.title,
        index: item.subIndex,
        text: item.text
      });
      const params = `?${paramsObj.toString()}`;
      const url = `${host}${urlPath}${params}`;
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };


  return (
    <Box className="mainBox">
      <SearchBar
        search={search}
        handleSearch={handleSearch}
        handleClose={handleClose}
        handleOnFocus={handleOnFocus}
        timeout={250}
        className="inputStyle"
      />

      {showResults && search.length > 0 && (
        <Paper className='result-box' sx={{ backgroundColor: colors.primary[400] }} >   
          {filteredData.length === 0 && ( <Box className='box1' >No results found</Box> )}

          {filteredData.length > 0 && filteredData.map((item, index) => (
            <List key={index}>
              <ListItemButton
                id={`list-item-${index + 1}`}
                className="item-button"
                onClick={(event) => handleListItemClick(event, index+1)}
                sx={{ backgroundColor: selectedIndex === index+1 ? 
                  mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(4, 5, 9, 0.08)' : null }}
              >
                <ListItemIcon>
                  <Tooltip title="Copy URL" arrow >
                    <IconButton edge="end" onClick={(event) => { event.stopPropagation(); handleURL(item); }}>
                      <CopyIcon sx={listItemStyles.icon} />
                    </IconButton>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  onClick={() => handleListButton(item)}
                  primary={item.text}
                  secondary={`${item.mainTab} → ${item.title} → ${item.subTab}`} 
                  secondaryTypographyProps={{ sx: listItemStyles.secondary }}
                  primaryTypographyProps={{ sx: listItemStyles.primary }}
                />
              </ListItemButton>
            </List>
          ))}
        </Paper>)}

    </Box>
  );
};

export default SearchBox;