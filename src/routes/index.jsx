import { Navigate, useRoutes } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  Home,
  BookingForm,
  Login,
  NotFound,
  Register,
  AdminLogin,
  AdminRegister,
  Dashboard,
  Order,
} from '../pages'
import Guest from '../middleware/Guest';
import Admin from '../middleware/Admin';


export default function MainRouter() {
  const routes = useRoutes([
    {
      path: 'index.html',
      element: <Navigate to="/" />
    },
    {
      path: '/',
      element: <HomeLayout/>,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: '/home', element: <Home/>},
        { path: '/booking', element: <BookingForm/>}
      ]
    },
    {
      path: '/dashboard',
      element: <Admin><DashboardLayout/></Admin>,
      children: [
        { path: '', element: <Dashboard/>},
        { path: 'order', element: <Order/>},
      ]
    },
    {
      path: '/booking',
      element: <BookingForm/>
    },
    {
      path: '/register',
      element: <Guest><Register/></Guest>
    },
    {
      path: '/login',
      element: <Guest><Login/></Guest>
    },
    {
      path: '/admin/login',
      element: <Guest><AdminLogin/></Guest>
    },
    {
      path: '/admin/register',
      element: <Guest><AdminRegister/></Guest>
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return routes;
}