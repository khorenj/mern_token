import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";

import 'materialize-css';

function App() {
    const {token,login,logout,userId,ready,userType} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated,userType);

    if(!ready)
    {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token,login,logout,userId,isAuthenticated,userType
        }}>
            <Router>
                {isAuthenticated && <Navbar />}
                <div className="container page-content">
                    {routes}
                    <div className="push"></div>
                </div>
                {/*<Footer />*/}
            </Router>
        </AuthContext.Provider>


    );
}

export default App;
