
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Grid,
  Paper,
  TextField,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import { toTitleCase } from '../../helpers/helpers';
import FlightServices from '../../services/FlightServices';
import auth from '../../helpers/auth';

const BookingForm = () => {
  const token = auth.isAuthenticated().token
  const location = useLocation();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
      flight_details: {
        ...location.state.destinationData,
        leaving_date: location.state.destinationData.leaving_date.$d,
        returning_date: location.state.destinationData.returning_date.$d,
      },
      contact_details: {
          first_name: '',
          last_name: '',
          mobile_number: '',
      },
      traveler_details: [],
      price: location.state.flightData.grandTotal
  });

  const generateTravelerDetails = (data) => {
    const travelers = [];
    for (let i = 0; i < data.adults; i++) {
        travelers.push({
            type: 'adult',
            first_name: '',
            last_name: '',
            birth_date: '',
            nationality: '',
        });
    }
    for (let i = 0; i < data.childs; i++) {
        travelers.push({
            type: 'child',
            first_name: '',
            last_name: '',
            birth_date: '',
            nationality: '',
        });
    }
    return travelers;
  };

  useEffect(() => {
      const initialTravelers = generateTravelerDetails(location.state.destinationData);
      setFormData((prevFormData) => ({
          ...prevFormData,
          traveler_details: initialTravelers,
      }));
  }, [location.state.destinationData]);

    // Function to handle change in form fields
    const handleChange = (e, index = null) => {

      const { name, value } = e.target;

      if (index !== null) {
          // Update traveler_details
          const updatedTravelerDetails = formData.traveler_details.map((traveler, i) => {
              if (i === index) {
                  return { ...traveler, [name]: value };
              }
              return traveler;
          });

          setFormData({
              ...formData,
              traveler_details: updatedTravelerDetails
          });
      } else {
          // Update contact_details
          setFormData({
              ...formData,
              contact_details: {
                  ...formData.contact_details,
                  [name]: value
              }
          });
      }
    };

  const handleSubmit = () => {
    FlightServices.placeFlightOrder(formData, token).then(result => {
      if(result.messages){

      } else {
        setError(result.error)
      }
    })
  }

  return location.state ? <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="first_name"
                  label="First name"
                  fullWidth
                  value={formData.contact_details.first_name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="last_name"
                  label="Last name"
                  fullWidth
                  value={formData.contact_details.last_name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="mobile_number"
                  label="Mobile Number"
                  fullWidth
                  value={formData.contact_details.mobile_number}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>
          {formData.traveler_details.map((traveler, index) => (
            <Paper key={index} elevation={3} sx={{ p: 3, mt: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Traveler {index + 1} ( {toTitleCase(traveler.type)} )</Typography>
              </Box>
              <TextField
                  name="first_name"
                  label="Traveler First Name"
                  value={traveler.first_name}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  mb={2}
              />
              <TextField
                  name="last_name"
                  label="Traveler Last Name"
                  value={traveler.last_name}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  mb={2}
              />
              <TextField
                  name="birth_date"
                  label="Traveler Birth Date"
                  type="date"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  value={traveler.birth_date}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  mb={2}
              />
              <TextField
                  name="nationality"
                  label="Traveler Nationality"
                  value={traveler.nationality}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  mb={2}
              />
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardHeader sx={{ textAlign: 'center' }} title={`${location.state.destinationData.from.city} ➔ ${location.state.destinationData.to.city}`} />
            <CardContent>
            <Grid>
                <Box display="flex" alignItems="center" justifyContent="center">
                <Box textAlign="center" mx={2}>
                    <Typography variant="h6">{location.state.flightData.departure.at}</Typography>
                    <Typography variant="body2" color="textSecondary">{location.state.flightData.departure.iataCode}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box textAlign="center" mx={2}>
                    <Typography variant="body2" color="textSecondary">{location.state.flightData.differenceTime}</Typography>
                    <Box display="flex" alignItems="center" justifyContent="center">
                    <Box width={10} height={10} borderRadius="50%" bgcolor="grey.500" />
                    <Divider style={{ width: 40 }} />
                    <Box width={10} height={10} borderRadius="50%" bgcolor="grey.500" />
                    </Box>
                    <Typography variant="body2" color="textSecondary">Direct</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box textAlign="center" mx={2}>
                <Typography variant="h6">{location.state.flightData.arrival.at}</Typography>
                    <Typography variant="body2" color="textSecondary">{location.state.flightData.arrival.iataCode}</Typography>
                </Box>
                </Box>
            </Grid>
            </CardContent>
          </Card>
          {
            error && (<Typography component="p" sx={{ mt: 5, mb: 2 }} color="error">
            {error}
            </Typography>)
          }
        </Grid>
      </Grid>
      <Box mt={3} textAlign="right">
        <Button variant="contained" color="primary" button="submit" onClick={handleSubmit}>
          Continue
        </Button>
      </Box>
    </Box> : <NotFound/>
}

export default BookingForm;
