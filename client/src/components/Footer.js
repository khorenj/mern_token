import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

export const Footer= () =>{
    const navigate = useNavigate();

    return (

        <footer className="page-footer">
            <div className="container">
                <div className="row">
                    <div className="col s6 m3">
                        <img className="materialize-logo" alt="Materialize" />
                            <p>Made with love by Sudo.</p>
                    </div>
                    <div className="col s6 m3">
                        <h5>About</h5>
                        <ul>
                            <li><a href="#">Pricing</a></li>
                        </ul>
                    </div>
                    <div className="col s6 m3">
                        <h5>Help</h5>
                        <ul>
                            <li><a href="#">Documents</a></li>
                            <li><a href="#">Videos</a></li>
                        </ul>
                    </div>
                    <div className="col s6 m3">
                        <h5>Contact</h5>
                        <ul>
                            <li><span>Sales support:<br/> sales@sudopower.com</span></li><br/>
                            <li><span>Technical support:<br/>  support@sudopower.com</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}