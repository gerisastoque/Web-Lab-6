import React, { useState } from 'react';
import {
	Box,
	Button,
	Stepper,
	Step,
	StepLabel,
	Typography,
	Avatar,
	Grid,
	TextField,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import { updateUserProfile } from '../service/userService';

const steps = ['Choose Avatar', 'Description', 'Select Interests'];
const availableAvatars = ['1.png', '2.png', '3.png', '4.png'];
const interestOptions = ['Art', 'Science', 'Games', 'Technology', 'Music', 'Reading', 'Travel'];

const Form = ({ uid, onComplete }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [avatar, setAvatar] = useState('');
	const [description, setDescription] = useState('');
	const [interests, setInterests] = useState([]);
	const [error, setError] = useState('');

	// move to the next step
	const handleNext = () => {
		if (activeStep === 0 && !avatar) {
			setError('You must select an avatar.');
			return;
		}
		if (activeStep === 1 && description.trim() === '') {
			setError('Please add a description.');
			return;
		}
		setError('');
		setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => {
		setError('');
		setActiveStep((prev) => prev - 1);
	};

	const handleFinish = async () => {
		try {
			const updatedProfile = {
				avatar,
				description,
				interests,
				profileCompleted: true,
			};

			await updateUserProfile(uid, updatedProfile);

			if (onComplete) {
				onComplete(updatedProfile); // Llama la función para actualizar desde Dashboard
			}
		} catch (err) {
			setError('Error saving data: ' + err.message);
		}
	};

	const toggleInterest = (item) => {
		setInterests((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
	};

	return (
		<Box sx={{ maxWidth: 600, mx: 'auto' }}>
			<Typography variant='h6' align='center' gutterBottom>
				Complete Your Profile
			</Typography>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>

			<Box sx={{ mt: 4 }}>
				{activeStep === 0 && (
					<Grid container spacing={2} justifyContent='center'>
						{availableAvatars.map((img) => (
							<Grid item key={img}>
								<Avatar
									src={`/avatars/${img}`}
									alt={`Avatar ${img}`}
									sx={{
										width: 64,
										height: 64,
										border: avatar === img ? '2px solid #1976d2' : '2px solid transparent',
										cursor: 'pointer',
									}}
									onClick={() => setAvatar(img)}
								/>
							</Grid>
						))}
					</Grid>
				)}

				{activeStep === 1 && (
					<TextField
						label='Personal Description'
						fullWidth
						multiline
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				)}

				{activeStep === 2 && (
					<Box>
						{interestOptions.map((option) => (
							<FormControlLabel
								key={option}
								control={
									<Checkbox
										checked={interests.includes(option)}
										onChange={() => toggleInterest(option)}
									/>
								}
								label={option}
							/>
						))}
					</Box>
				)}

				{error && (
					<Typography color='error' sx={{ mt: 2 }}>
						{error}
					</Typography>
				)}

				<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
					<Button disabled={activeStep === 0} onClick={handleBack}>
						Back
					</Button>

					{activeStep === steps.length - 1 ? (
						<Button variant='contained' onClick={handleFinish}>
							Finish
						</Button>
					) : (
						<Button variant='contained' onClick={handleNext}>
							Next
						</Button>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default Form;
