import { Card, CardContent, Typography, Box, Button, Link } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation } from 'react-router-dom';
import { numberFormat } from '../../helpers/helpers';
import NotFound from './NotFound';

const PaymentSuccess = () => {
    const location = useLocation();

    return location.state ? <Box component="main" sx={{ width: '95vw', justifyContent: 'center', bgcolor: 'background.default' }}>
        <Card
        sx={{
            maxWidth: 400,
            margin: 'auto',
            borderRadius: '16px',
            textAlign: 'center',
            padding: '20px 10px',
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
        }}
        >
        <CardContent>
            <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mb={2}
            >
            <CheckCircleIcon sx={{ fontSize: 50, color: 'green' }} />
            <Typography variant="h5" component="div" sx={{ color: '#4caf50', marginTop: 1 }}>
                Payment Successful!
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                Transaction Number: {location.state.orderId}
            </Typography>
            </Box>
            <Box>
            <Typography variant="body2" color="textSecondary">
                Amount Paid:
            </Typography>
            <Typography variant="h6" component="div">
                Rp {numberFormat(location.state.price)}
            </Typography>
            </Box>
            <Box mt={2}>
                <Link to="/home">
                    <Button type="button" variant="contained" sx={{ width: '150px', backgroundColor: '#4caf50', color: 'white' }}>Back to Home</Button>
                </Link>
            </Box>
        </CardContent>
        </Card>
    </Box> : <NotFound/>
}

export default PaymentSuccess;