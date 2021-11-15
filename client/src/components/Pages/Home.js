import React, { useEffect } from 'react'
import axios from 'axios';

import { useHistory } from 'react-router-dom'


export default function Home() {
    const history = useHistory()
    useEffect(() => {
        console.log('home');
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
                const { success } = response.data
                if (success) {
                    console.log('s');
                }

            } catch (error) {
                localStorage.removeItem('authToken')
                localStorage.removeItem('role')
                console.log('d');
                history.push('/');
            }
        }
        console.log('bc');
        if (localStorage.getItem('authToken')) {
            console.log('c');
            callProtected();
        }
    }, [history])
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}