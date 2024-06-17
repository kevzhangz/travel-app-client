import { Navigate } from 'react-router-dom';
import auth from '../helpers/auth';

const Admin = ({ children }) => {
    const isAdmin = auth.isAuthenticated().user.role == 'admin'

    return isAdmin ? children : <Navigate to="/home" />
}

export default Admin