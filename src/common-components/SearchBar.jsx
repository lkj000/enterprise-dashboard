import { React }  from 'react';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import { DebounceInput } from 'react-debounce-input';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const SearchBar = ({ search, handleSearch, handleClose, handleOnFocus = () => {}, handleOnBlur = () => {}, timeout = 0, className }) => {


  const handleCloseField = () => {
    handleClose();
  };

  const handleSearchField = (event) => {
    handleSearch(event.target.value);
  };


  return (
    <DebounceInput
      autoFocus={search.length === 0}
      debounceTimeout={timeout}
      element={TextField}
      placeholder="Search"
      type="text"
      variant="outlined"
      color="secondary"
      onChange={handleSearchField}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      value={search}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        ),
        endAdornment: search && (
          <IconButton onClick={handleCloseField}>
            <CloseOutlinedIcon/>
          </IconButton>
        )
      }}
      className={className}
    />
  );
};

export default SearchBar;