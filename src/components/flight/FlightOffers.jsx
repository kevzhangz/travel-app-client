import { useEffect, useState } from 'react';
import { getTimeDifference, numberFormat, toTitleCase } from '../../helpers/helpers';
import { Button, Dialog, DialogActions, CircularProgress, Slide, IconButton, Card, CardContent, Typography, Divider, Grid, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import auth from '../../helpers/auth';
import { useNavigate } from 'react-router-dom';

const FlightOffers = (props) => {
    let { flightData, destination, isLoading } = props


    const [openDetail, setOpenDetail] = useState(false);
    const [selectedFlightData, setSelectedFlightData] = useState([]);

    const handleClickOpen = (data) => {
      setOpenDetail(true);
      setSelectedFlightData(data);
    };
  
    const handleClose = () => {
      setOpenDetail(false);
    };

    const [dataAvailable, setDataAvailable] = useState(false)

    useEffect(() => {
        if(flightData.length == 0 || flightData.offers.length == 0){
            setDataAvailable(false)
        } else {
            setDataAvailable(true)
        }

    }, [flightData, dataAvailable, isLoading])

    return <>
        <h2>{destination.from.city} ➔ {destination.to.city}</h2>
            {isLoading ? <CircularProgress /> : dataAvailable ? flightData.offers.map((data) => {
                let departureTime = new Date(data.itineraries[0].segments[0].departure.at);
                let arrivalTime = new Date(data.itineraries[0].segments[0].arrival.at);

                let differenceTime = getTimeDifference(departureTime, arrivalTime)

                let airLine = flightData.airlines.find(airline => airline.iataCode === data.itineraries[0].segments[0].operating.carrierCode)

                let detail = {
                    airlineName: toTitleCase(airLine?.businessName),
                    departure: {
                        at: data.itineraries[0].segments[0].departure.at.split('T')[1].slice(0,5),
                        iataCode: data.itineraries[0].segments[0].departure.iataCode
                    },
                    arrival: {
                        at: data.itineraries[0].segments[0].arrival.at.split('T')[1].slice(0,5),
                        iataCode: data.itineraries[0].segments[0].arrival.iataCode
                    },
                    differenceTime: `${differenceTime.hours}h ${differenceTime.minutes}m`,
                    personPrice: data.price.total / (Number(destination.adults) + Number(destination.childs)),
                    grandTotal: data.price.grandTotal
                }

            return  <Card variant="outlined" style={{ borderRadius: '8px', padding: '16px', marginTop: '15px' }}>
                        <CardContent>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={3}>
                                    <Typography variant="h6">{detail.airlineName}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                    <Box textAlign="center" mx={2}>
                                        <Typography variant="h6">{detail.departure.at}</Typography>
                                        <Typography variant="body2" color="textSecondary">{detail.departure.iataCode}</Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Box textAlign="center" mx={2}>
                                        <Typography variant="body2" color="textSecondary">{detail.differenceTime}</Typography>
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                        <Box width={10} height={10} borderRadius="50%" bgcolor="grey.500" />
                                        <Divider style={{ width: 40 }} />
                                        <Box width={10} height={10} borderRadius="50%" bgcolor="grey.500" />
                                        </Box>
                                        <Typography variant="body2" color="textSecondary">Direct</Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Box textAlign="center" mx={2}>
                                    <Typography variant="h6">{detail.arrival.at}</Typography>
                                        <Typography variant="body2" color="textSecondary">{detail.arrival.iataCode}</Typography>
                                    </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Typography variant="h6" style={{ color: 'orange' }}>Rp {numberFormat(detail.personPrice)} / Person </Typography>
                                        <Button variant="contained" color="primary" onClick={() => handleClickOpen(detail)}>Choose</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
            }) : <h1>No Flight Data Found</h1> }

        <SlideDialog open={openDetail} destinationData={destination} flightData={selectedFlightData} onClose={handleClose} />
    </>
}

function SlideDialog({ open, onClose, flightData, destinationData }) {
    const token = auth.isAuthenticated().token
    const navigate = useNavigate();
  
    const handleOrder = () => {
      if(token){
        navigate('/booking', { state: { flightData, destinationData } })
      } else {
        navigate('/login');
      }
    }
  
    return (
      <Dialog
        open={open}
        TransitionComponent={SlideTransition}
        onClose={onClose}
        aria-labelledby="slide-dialog-title"
        aria-describedby="slide-dialog-description"
        maxWidth="lg"
        PaperProps={{
          sx: {
            position: 'fixed',
            top: 0,
            right: 0,
            m: 0,
            width: '900px',
            height: '100%',
            maxHeight: '100%'
          },
        }}
      >
        <div style={{ padding: '16px', position: 'relative', flexGrow: 1 }}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            style={{
              position: 'absolute',
              right: '8px',
              top: '8px',
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2>Your Journey</h2>
  
          {flightData.length != 0 ? <Card variant="outlined" style={{ borderRadius: '8px', padding: '16px', marginTop: '15px' }}>
            <CardContent>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="h6">{flightData.airlineName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center" justifyContent="center">
                        <Box textAlign="center" mx={2}>
                            <Typography variant="h6">{flightData.departure.at}</Typography>
                            <Typography variant="body2" color="textSecondary">{flightData.departure.iataCode}</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box textAlign="center" mx={2}>
                            <Typography variant="body2" color="textSecondary">{flightData.differenceTime}</Typography>
                            <Box display="flex" alignItems="center" justifyContent="center">
                            <Box width={10} height={10} borderRadius="50%" bgcolor="grey.500" />
                            <Divider style={{ width: 40 }} />
                            <Box width={10} height={10} borderRadius="50%" bgcolor="grey.500" />
                            </Box>
                            <Typography variant="body2" color="textSecondary">Direct</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box textAlign="center" mx={2}>
                        <Typography variant="h6">{flightData.arrival.at}</Typography>
                            <Typography variant="body2" color="textSecondary">{flightData.arrival.iataCode}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h6" style={{ color: 'orange' }}>Rp {numberFormat(flightData.grandTotal)}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
          </Card> : ''}
        </div>
        <DialogActions>
          <Button sx={{ mb: 3 }} autoFocus variant="contained" onClick={handleOrder}>
            Proceed to Order
          </Button>
        </DialogActions>
      </Dialog>
    );
}
  
function SlideTransition(props) {
    return <Slide direction="left" {...props} />;
}

export default FlightOffers;