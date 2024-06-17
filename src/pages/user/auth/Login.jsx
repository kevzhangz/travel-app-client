import { useState } from 'react';
import { Grid, TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../../../services/AuthServices';
import auth from '../../../helpers/auth';
import image from '../../../assets/loginImage.png';

export default function Login(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
      username: '',
      password: '',
      error: '',
      role: 'user',
      signedIn: false,
    })
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      AuthServices.login(values).then(data => {
        if(data.error){
          setValues({...values, error: data.error})
        } else {
          auth.authenticate(data, () => {
            navigate('/home')
          })
        }
      })
    };
  
    const handleChange = name => event => {
      setValues({...values, [name]: event.target.value })
    }

    return (
        <Grid container style={{ height: '100vh' }}>
            <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Container maxWidth="sm" style={{ height: "100%", backgroundColor: '#ffffff', padding: '2rem', borderRadius: '8px' }}>
                    <Box display="flex" sx={{ mb: 20, mt: 3 }} justifyContent="space-between" alignItems="center">
                        <h1 style={{ color: "#4093CE" }}>TravelSkyline</h1>
                    </Box>
                    <Typography style={{ fontSize: 32, fontWeight: 600, marginTop: '1rem', marginBottom: '1rem' }}>
                        Sign In.
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                        Don't have an account? <Link href="/register" style={{ color: '#4093CE' }}>Register</Link>
                    </Typography>
                    {
                        values.error && (<Typography component="p" sx={{ mb: 2 }} color="error">
                        {values.error}
                        </Typography>)
                    }
                    <Box component="form" sx={{ '& .MuiTextField-root': { marginBottom: '1rem', width: '100%' } }}>
                        <TextField label="Username" onChange={handleChange('username')} variant="outlined" required />
                        <TextField label="Password" onChange={handleChange('password')} type="password" variant="outlined" required />
                        <Button variant="contained" onClick={handleSubmit} color="primary" type="submit" fullWidth>Login</Button>
                    </Box>
                </Container>
            </Grid>
            <Grid item xs={false} md={8} style={{ height: '100vh', overflow: 'hidden' }}>
                <img src={image} alt="Travel Scene" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Grid>
        </Grid>
    );
}