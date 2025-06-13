import React, { useState, useMemo } from 'react';
import { Box, TextField, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { DebounceInput } from 'react-debounce-input';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FixedSizeList as VirtualizedText } from 'react-window';

const Search = ({ input }) => {
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }
  const searchResults = useMemo(() => {
    if (!searchText) return [];
    const searchTermLower = searchText.trim().toLowerCase();

    const check = input.map((val) => ({
      matchedArtifacts: val.artifacts.filter((art) =>
        art.toLowerCase().includes(searchTermLower)
      ),
      matchedDate: val.date,
    }))
      .filter((val) => val.matchedArtifacts.length > 0);

    let artifactCount = 0;
    const listArtifactsMatch = check.flatMap(item =>
      item.matchedArtifacts.map(artifact => ({
        artifact,
        date: item.matchedDate,
        inc: artifactCount++
      })
      )
    )
    return listArtifactsMatch;
  }, [searchText, input]);

  const renderItem = ({ index, style }) => {
    const item = searchResults[index];

    return (
      <ListItem key={index} style={style}>
        <ListItemAvatar>
          <Avatar>{item.inc + 1}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={item.artifact}
          secondary={item.date}
        />
      </ListItem>
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ width: '100%', height: '90vh' }}>
      <Box
        display="flex"
        flexDirection="column"
        height="70vh"
      >
        <DebounceInput
          debounceTimeout={950}
          element={TextField}
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{ endAdornment: <SearchOutlinedIcon /> }}
          color="secondary"
          autoFocus
        />
        {searchText && searchResults.length === 0 ? (
          <ListItem style={{ marginTop: '10px' }}>
            <ListItemText primary="No matching artifacts found" />
          </ListItem>
        ) : (
          searchResults.length > 0 && (
            <VirtualizedText
              style={{ marginTop: '20px', marginBottom: '20px' }}
              height={7050}
              width="100%"
              itemCount={searchResults.length}
              itemSize={80}
            >
              {renderItem}
            </VirtualizedText>
          ))}

      </Box>
    </Box>
  );
};

export default Search;