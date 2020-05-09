import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './LandingPage.scss';
const SignUp = (props) => {
	return (
		<div>
			<div className="signUp-main">
				<h1>PELARD</h1>
				<h2>Login</h2>
				<div className="input-form">
					<input
						type="text"
						placeholder="FirstName"
						value={props.firstName}
						onChange={(e) => props.onChange('firstName', e)}
					/>
					<input
						type="text"
						placeholder="LastName"
						value={props.lastName}
						onChange={(e) => props.onChange('lastName', e)}
					/>
					<input
						type="text"
						placeholder="UserName"
						value={props.userName}
						onChange={(e) => props.onChange('userName', e)}
					/>
					<input
						type="email"
						placeholder="Email"
						value={props.email}
						onChange={(e) => props.onChange('email', e)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={props.password}
						onChange={(e) => props.onChange('password', e)}
					/>
					<input
						type="text"
						placeholder="PhoneNumber"
						value={props.phoneNumber}
						onChange={(e) => props.onChange('phoneNumber', e)}
					/>
				</div>
				<div className="login-links">
					<a href="#">Forgot password?</a>
				</div>
				<button type="submit" onClick={props.registerHandler}>
					{props.loading ? <CircularProgress style={{ color: '#fff' }} /> : 'SignUp'}
				</button>
				<div className="success-label">
					{props.loading && <p>Registered Successfully</p>}
					<a href="/">Back to login</a>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
