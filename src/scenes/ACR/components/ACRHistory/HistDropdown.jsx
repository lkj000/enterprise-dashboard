import { React } from "react";
import { Autocomplete, Grid, TextField } from '@mui/material';
import * as S from './styles';


const HistDropdown = ({ repoNames, selectRepo, setSelectRepo, colors }) => {


  // REPO
  const handleSelectRepo = (event, newValue) => {
    setSelectRepo(newValue);
    if (!newValue) {
      setSelectRepo(null);
    }
  };



  return (
    <S.MainBox>
      <Grid container>
        <S.Box1>
          <S.StyledTypography variant="h4" color={colors.grey[100]} mb={3}>
            Repository
          </S.StyledTypography>
          <Autocomplete
            id="Repository-autocomplete"
            value={selectRepo}
            options={repoNames}
            onChange={handleSelectRepo}
            renderInput={(params) => (
              <S.AutocompleteBox>
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Repository"
                  color="secondary"
                />
              </S.AutocompleteBox>
            )}
          />
        </S.Box1>
      </Grid>
    </S.MainBox>
  );
};

export default HistDropdown;