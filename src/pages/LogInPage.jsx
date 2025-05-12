import React from 'react';
import { Typography } from '@mui/material';
import LogIn from '../components/LogIn';

const LogInPage = () => {
	return (
        
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100vh', 
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: '#f0f0f0',
		}}>
            <Typography component='h1' variant='h5' fontWeight='bold' alignContent={'center'}>
					Welcome Back!
				</Typography>

			<LogIn />
		</div>
	);
};

export default LogInPage;
