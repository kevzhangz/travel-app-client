import { Navigate, useRoutes } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import BookingForm from '../pages/BookingForm';
import {
  Home,
  Login,
  NotFound,
  Register
} from '../pages'


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
      path: '/booking',
      element: <BookingForm/>
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return routes;
}