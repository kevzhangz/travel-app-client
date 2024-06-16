import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DestinationServices from '../services/DestinationServices';
import { debounce } from '@mui/material/utils';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.


const DestinationAutocomplete = (props) => {
  const {value, handleChange} = props
  const [options, setOptions] = React.useState([]);
  
  const handleInputChange = (event, newValue) => {
    if(newValue == ''){
        return;
    }

    DestinationServices.searchAirport(newValue).then((data) => {
        if(data.error){
            setOptions([]);
            return;
        }

        if(data.length != 0){
            let options = data.map(({city, name, iata}) => {
                if(iata != ""){
                  return {city, name, iata}
                }
            })

            setOptions(options);
        }
    })
  }

  return (
    <Autocomplete
      freeSolo
      sx={{ width: 400, mt: 1 }}
      getOptionLabel={(option) => option ? `${option.name}` : option}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      noOptionsText="No locations"
      onChange={handleChange}
      onInputChange={debounce(handleInputChange, 1000)}
      renderInput={(params) => (
        <TextField {...params} label="Search Airport" fullWidth />
      )}
      renderOption={(props, option) => {

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {option.name} ({option.iata})
                <Typography variant="body2" color="text.secondary">
                  {option.city}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

export default DestinationAutocomplete;