import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Nav from "../components/Nav"
import Hero from '../components/Hero';
import Destinations from '../components/DestinationSearch';
import { Grid, Typography } from '@mui/material';
import DestinationCard from '../components/DestinationCard';
import { Helmet } from 'react-helmet';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const drawerWidth = 0;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const Layout = () => {
  return(
    <StyledRoot>
      <Helmet>
      <script type="text/javascript"
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key="SB-Mid-client-ZCUryak1Z9FBi05r"></script>
      </Helmet>
      <Nav key="navbar" drawerWidth={drawerWidth}/>
      <Main>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
        <Outlet />
        </Box>
      </Main>
    </StyledRoot>
  )
}

export default Layout;