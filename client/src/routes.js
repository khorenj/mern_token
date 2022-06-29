import React from 'react';
import {
	Route,
	Routes,
	Navigate

} from "react-router-dom";
import  {AuthPage} from "./pages/AuthPage";
import {UsersPage} from "./pages/UsersPage";
export const useRoutes = (isAuthenticated, userType) =>{


	if(isAuthenticated)
	{
		return(
			<Routes>
				{globalRoutes()}
				<Route path="/users" exact element={<UsersPage />} />
				<Route
					path="*"
					element={<Navigate to="/users" replace />}
				/>
			</Routes>
		)

	}

	return (
		<Routes>
			{globalRoutes()}
			<Route path="/" exact element={<AuthPage />} />
			<Route
				path="*"
				element={<Navigate to="/" replace />}
			/>
		</Routes>
	)
}