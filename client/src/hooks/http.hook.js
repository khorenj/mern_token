import {useState, useCallback, useContext,useEffect} from 'react';
import {AuthContext} from "../context/auth.context";
import {useAuth} from "./auth.hook";


export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
     const auth = useContext(AuthContext);
    // const {token,login,logout,userId,ready,userType} = useAuth();

    const request = useCallback(async (url, method = "GET", body=null,useToken = true) =>{
        setLoading(true);
        try{

            let headers = {};

            if(useToken)
            {
                headers.Authorization = `Bearer ${auth.token}`;
            }

            if(body)
            {
                body = JSON.stringify(body);
                headers['Content-Type'] = "application/json";
            }

            const response = await fetch(url, {method,body,headers});

            const data = await response.json();
            if(!response.ok)
            {
                if(response.status === 401)
                {
                    const data = await  request('/api/auth/refresh', 'POST', {});

                    console.log("newAccessToken",data.accessToken);

                    auth.login(data.accessToken,data.userId,data.userType);

                    console.log("currentAcessToken",auth.token);

                    return await request(url, method, body, useToken);
                }
                else if(response.status === 402)
                {
                    auth.logout();
                }
                else
                {
                    throw  new Error(data.message || 'Something went wrong');
                }

            }

           setLoading(false);
           return data;

        }catch(e){

            setLoading(false);

            setError(e.message);

            throw  e;
        }
    },[]);


    const clearError = useCallback(() =>
    {
        setError(null);
    },[])

    return  {loading, request, error,clearError}
}