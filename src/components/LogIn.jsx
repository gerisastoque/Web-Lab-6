import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { loginUser } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const LogIn = () => {
	// here I store email and password
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// here I update the values when typing
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// here I try to log in
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const { email, password } = formData;

		try {
			const user = await loginUser(email, password);

			// store data in Redux
			dispatch(loginSuccess({ uid: user.uid, email: user.email }));
			localStorage.setItem('uid', user.uid);

			// redirect to dashboard
			navigate('/dashboard');
		} catch (err) {
			setError('Login error: ' + err.message);
		}
	};

	return (
		<Container maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component='h1' variant='h5'>
					Log In
				</Typography>
				<Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<TextField
						fullWidth
						required
						label='Email Address'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
						margin='normal'
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
					/>
					{error && (
						<Typography color='error' sx={{ mt: 1 }}>
							{error}
						</Typography>
					)}
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }}>
						Log In
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default LogIn;
