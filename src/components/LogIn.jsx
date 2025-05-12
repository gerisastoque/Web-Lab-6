import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { loginUser } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const LogIn = () => {
	// store email and password
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// update values on input change
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// try to log in
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const { email, password } = formData;

		try {
			const user = await loginUser(email, password);

			// store user data in Redux
			dispatch(loginSuccess({ uid: user.uid, email: user.email }));
			localStorage.setItem('uid', user.uid);

			// redirect to dashboard
			navigate('/dashboard');
		} catch (err) {
			setError('Login error: ' + err.message);
		}
	};

	return (
		<Container maxWidth='xs'
			sx={{
			
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Box
				sx={{
				padding: 4,
					backgroundColor: '#fff',
					boxShadow: 3, 
					borderRadius: 5,
				}}
			>
				<Typography component='h1' variant='h5' fontWeight='bold' alignContent={'center'}>
					Log In
				</Typography>
				<Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<TextField
	fullWidth
	required
	label='Email'
	name='email'
	type='email'
	value={formData.email}
	onChange={handleChange}
	margin='normal'
	InputProps={{
		sx: {
			borderRadius: '12px',
		},
	}}
/>

<TextField
	fullWidth
	required
	label='Password'
	name='password'
	type='password'
	value={formData.password}
	onChange={handleChange}
	margin='normal'
	InputProps={{
		sx: {
			borderRadius: '12px',
		},
	}}
/>

					{error && (
						<Typography color='error' sx={{ mt: 1 }}>
							{error}
						</Typography>
					)}
					<Button
	type='submit'
	fullWidth
	variant='contained'
	sx={{
		mt: 2,
		borderRadius: '50px', // Esto sí lo toma
	}}
>
	Log In
</Button>

				</Box>
			</Box>
		</Container>
	);
};

export default LogIn;
