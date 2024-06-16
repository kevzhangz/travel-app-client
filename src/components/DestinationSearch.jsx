import React from 'react';
import { Grid, Button, Typography, TextField, Modal, Box } from '@mui/material';
import { useState } from 'react';
import FlightServices from '../services/FlightServices';
import DestinationAutocomplete from './DestinationAutocomplete';

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from 'dayjs';
import { CustomDialog } from './CustomDialog';
import FlightOffers from './flight/FlightOffers';


const DestinationSearch = () => {
    const [values, setValues] = useState({
      from: '',
      to: '',
      leaving_date: '',
      returning_date: '',
      adults: '',
      childs: '',
      error: '',
    })

    const [flightData, setFlightData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    
    const handleSubmit = (event) => {
      event.preventDefault();

      setIsLoading(true);
      setFlightData([]);
  
      if(!values.from || !values.to){
        setValues({...values, error: 'Destination is not selected'})
        return
      }

      if(!values.leaving_date || !values.returning_date){
        setValues({...values, error: 'Date is not selected'})
        return
      }

      FlightServices.searchFlight(values).then(result => {
        if(result.error){
          setValues({...values, error: result.error})
        } else {
          setFlightData(result.data)
        }

        setIsLoading(false)
      })

      setOpen(true)
    };

    const handleChange = name => (event, newValue) => {
      let value = '';
      
      if(name === 'leaving_date' || name === 'returning_date'){
        value = dayjs(event.$d)
      } else if(name == 'from' || name == 'to') {
        value = newValue
      } else {
        value = event.target.value
      }

      setValues({...values, [name]: value});
    }

  return (
    <div>
        <Grid container>
            <Grid container columnSpacing={6} sx={{ mt: 2 }}>
                <Grid item>
                    From
                    <DestinationAutocomplete
                      value={values.from}
                      handleChange={handleChange('from')}
                    />
                </Grid>
                <Grid item>
                    To
                    <DestinationAutocomplete
                      value={values.to}
                      handleChange={handleChange('to')}
                    />
                </Grid>
            </Grid>
            <Grid container columnSpacing={6} sx={{ mt: 4 }}>
                <Grid item>
                    Leaving Date
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          label="Tanggal"
                          name="date"
                          inputFormat="YYYY-MM-DD"
                          id="date"
                          value={values.leaving_date || null}
                          onChange={handleChange('leaving_date')}
                          slotProps={{ textField: { variant: 'outlined', error: false } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    Return Date
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          label="Tanggal"
                          name="date"
                          inputFormat="YYYY-MM-DD"
                          id="date"
                          value={values.returning_date || null}
                          onChange={handleChange('returning_date')}
                          slotProps={{ textField: { variant: 'outlined', error: false } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                </Grid>
            </Grid>

            <Grid container columnSpacing={2} sx={{mt: 4, mb: 3}}>
              <Grid item>
                <Typography>Adult</Typography>
                <TextField sx={{ mt: 1 }} onInput={handleChange('adults')}></TextField>
              </Grid>
              <Grid item>
                <Typography>Child</Typography>
                <TextField sx={{ mt: 1 }} onInput={handleChange('childs')}></TextField>
              </Grid>
            </Grid>
        </Grid>
        <Button variant="contained" type="submit" onClick={handleSubmit}>Search</Button>
        <CustomDialog
          component={<FlightOffers flightData={flightData} destination={values} isLoading={isLoading}/>}
          open={open} 
          handleClose={handleClose}
        />
    </div>
  );
};

export default DestinationSearch;