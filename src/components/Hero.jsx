import React from 'react';
import HeroImage from '../assets/image.png';
import { Box, Grid, Button, Typography, Autocomplete, TextField } from '@mui/material';
import DestinationAutoComplete from './DestinationAutocomplete';
import DestinationSearch from './DestinationSearch';

const Hero = () => {
  return (
    <header>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: `url(${HeroImage})`, height: 900, backgroundRepeat:'no-repeat', backgroundSize: 'cover' }}
      >
        <div className='mask'>
          <div className='d-flex align-items-center h-100'>
            <div className='text-white'>
              <h3 style={{ color: '#4093CE' }}>Let's Enjoy A New World</h3>
              <Box width="500px">
                <h1 style={{ fontSize: 78 }}>The World is Your <span style={{ color: '#4093CE' }}>Oyster</span></h1>
              </Box>
              <h4 style={{ color: '#C4C4C4' }}>Build the holidays of your dreams unforgettable</h4>

              <DestinationSearch/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;