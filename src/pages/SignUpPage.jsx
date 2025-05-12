import React from 'react';
import SignUp from '../components/SignUp';

const SignUpPage = () => {
	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100vh',
             backgroundColor: '#f0f0f0',
		}}>
			<SignUp />
		</div>
	);
};

export default SignUpPage;