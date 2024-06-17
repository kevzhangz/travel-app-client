import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, useNavigate } from "react-router-dom";
import { Box, Toolbar, AppBar, Menu, Typography, Grid, Button, IconButton, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import auth from '../helpers/auth';

export default function Navbar(props) {
  const navigate = useNavigate();
  const token = auth.isAuthenticated().token;
  const [anchorEl, setAnchorEl] = React.useState(null)
  const drawerWidth = props.drawerWidth

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scroll = (menu) => {
    const section = document.querySelector(`#${menu}`);
    // section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  };

  const pages = [
    {
      name: 'Home',
      slug: 'home',
      path: '/home',
    },
    {
      name: 'Destinations',
      slug: 'destinations',
      path: '/destinations',
    },
    {
      name: 'About Us',
      slug: 'about-us',
      path: '/about-us',
    },
    {
      name: 'Contacts',
      slug: 'contact',
      path: '/contact',
    },
  ]

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="transparent"
        sx={{ width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar>
          <Box sx={{ justifyContent: 'flex-start', width: '100%', flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <h2 style={{ color: '#4093CE' }}>TravelSkyline</h2>
          </Box>
          <Grid container justifyContent='center'>
              {pages.map((page) => (
              <Grid item>
                  <Button onClick={() => scroll(page.slug)} to={page.path} key={page.name} sx={{ my: 1, mx: 3, color: 'white', display: 'block' }} style={{ color: '#4093CE' }}>{page.name}</Button>
              </Grid>
              ))}
          </Grid>
        {token ? 
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={() => {
                  auth.clearJWT(() => {
                    navigate('/')
                  })
                }}>Logout</MenuItem>
              </Menu>
            </Grid>
          </Grid>
          : 
          <Grid item sx={{ ml: 3 }}>
            <Link to="/login">
              <Button variant="outlined" sx={{ width: '150px', color: '#4093CE' }}>Book Ticket</Button>
            </Link>
          </Grid>
        }
        </Toolbar>
      </AppBar>
    </div>
  );
}