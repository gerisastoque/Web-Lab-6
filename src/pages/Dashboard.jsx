import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../service/userService';
import ProfileSummary from '../components/ProfileSummary';
import Form from '../components/Form';
import { CircularProgress, Box, Typography } from '@mui/material';

const Dashboard = () => {
	const uid = useSelector((state) => state.auth.uid);
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	// aquí cargo el perfil desde Firestore
	useEffect(() => {
		const fetchData = async () => {
			try {
				const profile = await getUserProfile(uid);
				setUserData(profile);
			} catch (error) {
				console.error('Error al obtener perfil:', error);
			} finally {
				setLoading(false);
			}
		};

		if (uid) fetchData();
	}, [uid]);

	if (loading) {
		return (
			<Box display='flex' justifyContent='center' mt={5}>
				<CircularProgress />
			</Box>
		);
	}

	if (!userData) {
		return (
			<Box mt={5} textAlign='center'>
				<Typography variant='h6'>No se encontró información del perfil.</Typography>
			</Box>
		);
	}

	return (
<Box mt={5}>
	{userData.profileCompleted ? (
		<ProfileSummary profile={userData} />
	) : (
		<Form uid={uid} onComplete={(updatedProfile) => setUserData(updatedProfile)} />
	)}
</Box>	);
};

export default Dashboard;