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
			<Route path="/" exact element={<AuthPage />} />
			<Route
				path="*"
				element={<Navigate to="/" replace />}
			/>
		</Routes>
	)
}