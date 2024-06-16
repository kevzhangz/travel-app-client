import React from 'react';
import { Grid, TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import image from '../../assets/registerImage.png';
import AuthServices from '../../services/AuthServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        error: '',
        signedIn: false,
    })
    
    const handleSubmit = (event) => {
        event.preventDefault();

        AuthServices.register(values).then(data => {
            console.log(data);
            if(data.message){
                navigate('/login')
            } else {
                setValues({...values, error: data.error })
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
                        Sign Up.
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                        Already have an account? <Link href="/login" style={{ color: '#4093CE' }}>Login</Link>
                    </Typography>
                    {
                        values.error && (<Typography component="p" sx={{ mb: 2 }} color="error">
                        {values.error}
                        </Typography>)
                    }
                    <Box component="form" sx={{ '& .MuiTextField-root': { marginBottom: '1rem', width: '100%' } }}>
                        <TextField label="Name" onChange={handleChange('name')} variant="outlined" required />
                        <TextField label="Email" onChange={handleChange('email')} variant="outlined" required />
                        <TextField label="Username" onChange={handleChange('username')} variant="outlined" required />
                        <TextField label="Password" onChange={handleChange('password')} type="password" variant="outlined" required />
                        <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" fullWidth>Register</Button>
                    </Box>
                </Container>
            </Grid>
            <Grid item xs={false} md={8} style={{ height: '100vh', overflow: 'hidden' }}>
                <img src={image} alt="Travel Scene" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Grid>
        </Grid>
    );
}