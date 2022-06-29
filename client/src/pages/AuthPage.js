import React, {useContext, useEffect, useState} from 'react';
import 'materialize-css';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/auth.context";

export const AuthPage = () =>{
	const auth = useContext(AuthContext);
	const message = useMessage();
	const {loading,error, request,clearError} = useHttp();

	useEffect(()=>{
		message(error);
		clearError();
	},[error,message,clearError])

	useEffect(()=>{
		window.M.updateTextFields()
	},[])

	const [form, setform] = useState({
		email:"",
		password:""
	})

	const changeHandler = event =>
	{
		setform({...form, [event.target.name]:event.target.value})
	}


	const loginHandler =async () =>{
		try {
			const data = await  request('/api/auth/login', 'POST', {...form});
			auth.login(data.accessToken,data.userId,data.userType);
		}catch (e) {
		}
	}

	const registerHandler =async () =>{
		try {
			const data = await  request('/api/auth/register', 'POST', {...form});
		}catch (e) {
		}
	}


	return(
		<div className="row">
			<div className="col s6 offset-s3">
				<div className="card grey darken-1">
					<div className="card-content white-text">
						<span className="card-title">Authorization</span>
						<div>
							<div className="input-field">
								<input placeholder="Enter your email"
									   id="email"
									   type="email"
									   name="email"
									   className="yellow-input"
									   value={form.email}
									   onChange={changeHandler}/>
								<label htmlFor="email">Email</label>
							</div>
							<div className="input-field">
								<input
										placeholder="Enter your password"
										id="password"
									   	type="password"
									   	name="password"
									   	className="yellow-input"
										value={form.password}
										onChange={changeHandler}
										disabled={loading}/>
								<label htmlFor="password">Password</label>
							</div>

						</div>
					</div>
					<div className="card-action">
						<button className="btn yellow darken-4" style={{marginRight:10}}
						onClick={loginHandler}>Login</button>
					</div>
					<div className="card-action">
						<button className="btn yellow darken-4" style={{marginRight:10}}
							onClick={registerHandler}>Register</button>
					</div>
				</div>
			</div>

		</div>
	)
}