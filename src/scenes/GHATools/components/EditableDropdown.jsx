import {React, useState} from "react";
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import CheckBox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const EditableDropdown = ({name, options, setStateToParent}) => {

    const [selectedValues, setSelectedValues] = useState([]);
    const accentGreen = '#70d8bd';

    const handleChange = (event, newValue) => {
        setSelectedValues(newValue);
        setStateToParent(name, newValue);
    };

    return (
        <>
            <Autocomplete
                multiple
                freeSolo
                name={name}
                value={selectedValues}
                onChange={handleChange}  
                options={options}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={(params) => (
                    <TextField {...params} 
                    label="Select or type(Press ENTER after type)" 
                    variant="outlined"  />
                )}
                renderOption={(props, option, { selected }) => (
                    <MenuItem {...props} key={option}>
                    <CheckBox
                        checked={selected}
                        onChange={() => {}}
                        sx={{
                            marginRight: 8,
                            color: selected ? accentGreen : 'default',
                            '&.Mui-checked': {
                              color: accentGreen,
                            },
                          }}
                    />
                    <ListItemText primary={option} />
                    </MenuItem>
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip
                        key={option}
                        label={option}
                        {...getTagProps({ index })}
                    />
                    ))
                }
                sx={{
                    '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: accentGreen,
                          fontWeight: 'bold',
                        },
                      },
                  }}
                />
        </>
    )
}

export default EditableDropdown;