import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Link, useNavigate } from "react-router-dom";
import { Typography, Grid, Button } from '@mui/material';

export default function Navbar(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null)
  const drawerWidth = props.drawerWidth

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scroll = (menu) => {
    console.log(`#${menu}`)
    const section = document.querySelector(`#${menu}`);
    console.log(section);
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
            <Grid item sx={{ ml: 3 }}>
                <Button variant="outlined" sx={{ width: '150px', color: '#4093CE' }}>Book Ticket</Button>
            </Grid>
          </Toolbar>

      </AppBar>
      {/* <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography>
            Sistem Inventory
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {navData.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton 
                    component={Link}
                    to={item.path}
                    selected={location.pathname.includes(item.path)}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Drawer> */}
    </div>
  );
}