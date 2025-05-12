import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { registerUser } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const SignUp = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		username: '',
		birthDate: '',
	});

	const [error, setError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const { email, password, username, birthDate } = formData;

		try {
			const user = await registerUser(email, password, username, birthDate);

			dispatch(loginSuccess({ uid: user.uid, email: user.email }));
			localStorage.setItem('uid', user.uid);

			navigate('/dashboard');
		} catch (err) {
			setError('Registration error: ' + err.message);
		}
	};

	return (
		<Container
			maxWidth='xs'
			sx={{
			
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
		
					padding: 4,
					backgroundColor: '#fff',
					boxShadow: 3, 
					borderRadius: 5,
				}}
			>
				<Typography component='h1' variant='h5' align='center' fontWeight='bold'>
					Create Account
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
<TextField
	fullWidth
	required
	label='Username'
	name='username'
	value={formData.username}
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
	label='Birth Date'
	name='birthDate'
	type='date'
	InputLabelProps={{ shrink: true }}
	value={formData.birthDate}
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
		mt: 3,
		borderRadius: '12px',
	}}
>
	Sign Up
</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default SignUp;
