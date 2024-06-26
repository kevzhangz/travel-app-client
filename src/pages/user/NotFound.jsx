import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import image from '../../assets/404.png'

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const NotFound = () => {
  return(
	<Box sx={{ width: '95vw' }}>
		<StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
			<Typography variant="h3" paragraph>
				Sorry, page not found!
			</Typography>

			<Typography sx={{ color: 'text.secondary' }}>
				Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
				spelling.
			</Typography>

			<Box
				component="img"
				src={image}
				sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
			/>

			<Button href="/home" variant="contained" sx={{ color: 'white' }}>
				Go to Home
			</Button>
		</StyledContent>
	</Box>
  )
}


export default NotFound