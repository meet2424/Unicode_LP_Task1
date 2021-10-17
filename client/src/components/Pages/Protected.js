import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import Logout from '../Logout';

export default function Protected() {
    const query = new URLSearchParams(useLocation().search);

    if (query.get('token') && !localStorage.getItem('authToken')) {
        localStorage.setItem('authToken', query.get('token'))
    }

    const history = useHistory()
    const [privateMsg, setPrivateMsg] = useState("")

    useEffect(() => {

        if (!localStorage.getItem('authToken')) {
            history.push('/')
        }

        const callProtected = async () => {
            let headersList = {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("authToken"),
            }

            let reqOptions = {
                url: "http://localhost:5000/api/private",
                method: "GET",
                headers: headersList,
            }

            try {
                const response = await axios.request(reqOptions)
                const { success, data } = response.data
                if (success) {
                    setPrivateMsg(data)
                    history.push('/protected')
                }

            } catch (error) {
                localStorage.removeItem('authToken')
                history.push('/')
            }
        }

        callProtected();

    }, [history, privateMsg])


    return (
        <div>
            <h1>{privateMsg}</h1>
            <Logout />
        </div>
    )

}