import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function DestinationCard(props) {
  let {id, image, destination, price} = props

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="destination"
        height="225"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {destination}
        </Typography>
      </CardContent>
      <CardActions>
        <Rating style={{ color: '#4093CE' }} value={5} readOnly />
        <Typography>{price}</Typography>
      </CardActions>
    </Card>
  );
}