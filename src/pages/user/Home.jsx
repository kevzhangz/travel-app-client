import Hero from '../../components/Hero';
import { Grid, Typography } from '@mui/material';
import DestinationCard from '../../components/DestinationCard';
import DestinationSearch from '../../components/DestinationSearch';
import berlin from '../../assets/berlin.png'
import maldives from '../../assets/maldives.png'
import swiss from '../../assets/swiss.png'

const Home = () => {
  return <>
    <Hero id="home"></Hero>

    <Typography sx={{ mt: 10, fontSize: 20, color: '#4093CE', fontWeight: 'bold', textAlign: 'center' }}>TOP DESTINATIONS</Typography>
    <Typography sx={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center' }}>Explore Top Destination</Typography>

    <Grid container spacing={10} sx={{ mt: 1, justifyContent: 'center' }}>
        <Grid item><DestinationCard id="1" image={berlin} destination="Berlin, German" price="$800"></DestinationCard></Grid>
        <Grid item><DestinationCard id="2" image={maldives} destination="Maldives, Maldives" price="$862"></DestinationCard></Grid>
        <Grid item><DestinationCard id="3" image={swiss} destination="Zermat, Swiss" price="$1300"></DestinationCard></Grid>
    </Grid>
    
    <div id="about-us">
      <h2 style={{ color: '#4093CE', fontSize: 40 }}>About Us</h2>
      <Typography sx={{ fontSize: 22, fontWeight: 'semi-bold' }}>
      TravelSkyline is a flight ticket booking platform dedicated to making your travel experience easier and more enjoyable. with our advanced technology. you can quickly and easily find and book flights to your dream destinations. with a variety of airlines and competitives prices, we are committed to being your trusted travel partner. whether you’re jetting off for business or pleasure, our user-friendly interface ensures a seamless booking process. Our dedicated customer support team is available around the clock to assist you with any inquiries or concerns. With us, your travel olans are in safe hands, allowing you to focus on creating unforgettable memories at every destinantion you visit.
      </Typography>
    </div>

    <div id="contacts">
      <h2 style={{ color: '#4093CE', fontSize: 40 }}>Contacts Us</h2>
      <Typography sx={{ fontSize: 26, fontWeight: 'semi-bold' }}>
        +62 823 6686 4882 
      </Typography>
    </div>
  </>
}

export default Home;