import React, {useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useCallback, useContext, useEffect} from "react";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";
import {UsersList} from "../components/UserList";
import {  useNavigate} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";

import "materialize-css";


export const UsersPage = () =>{
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const {loading, request} = useHttp();
    const {userType} = useContext(AuthContext);
    const message = useMessage();


    const fetchUsers = useCallback(async ()=>{
        try{
            const fetchedUsers = await request("/api/user","GET",null,true);
            setUsers(fetchedUsers);

        }catch (e) {

        }
    },[request]);

    useEffect(()=>{
        fetchUsers();
    },[]);


    if(loading)
    {
        return <Loader />
    }

    return(
        <>
            {!loading && <UsersList loggedInUserType={userType} users={users}/>}
        </>
    )
}