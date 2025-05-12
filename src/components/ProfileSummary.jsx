import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Chip, Stack } from '@mui/material';

const ProfileSummary = ({ profile }) => {
	const {
		username,
		email,
		birthDate,
		avatar,
		description,
		interests = [],
	} = profile;

	return (
		<Box display='flex' justifyContent='center'>
			<Card sx={{ maxWidth: 400, p: 2 }}>
				<CardContent>
					{avatar && (
						<Box display='flex' justifyContent='center' mb={2}>
							<Avatar alt='User avatar' src={`/avatars/${avatar}`} sx={{ width: 90, height: 90 }} />
						</Box>
					)}

					<Typography variant='h6' align='center' fontWeight='bold' mb={2}>
						{username}
					</Typography>

					<Typography variant='body2' align='center' color='text.secondary'>
						{email}
					</Typography>

					<Typography variant='body2' align='center' mt={1}>
						Birth date: {birthDate}
					</Typography>

					{description && (
						<Typography variant='body2' mt={2}>
							<strong>About me:</strong> {description}
						</Typography>
					)}

					{interests.length > 0 && (
						<>
							<Typography variant='body2' mt={2}>
								<strong>Interests:</strong>
							</Typography>
							<Stack direction='row' spacing={1} flexWrap='wrap' mt={1}>
								{interests.map((item, index) => (
									<Chip key={index} label={item} />
								))}
							</Stack>
						</>
					)}
				</CardContent>
			</Card>
		</Box>
	);
};

export default ProfileSummary;
