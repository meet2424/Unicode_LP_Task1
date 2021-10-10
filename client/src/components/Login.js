import React from "react";
import Container from '@material-ui/core/Container';

import Box from '@mui/material/Box';

import './Login.css'
import axios from "axios";

export default function Login(props) {

    const { login, home } = props

    const handleSubmit = async (event) => {
        console.log('log');
        event.preventDefault()
        const { email, password } = event.target.elements

        let headersList = {
            "Content-Type": "application/json"
        }

        let formData = JSON.stringify({
            "email": email.value,
            "password": password.value
        })

        let reqOptions = {
            url: "http://localhost:5000/api/auth/login",
            method: "POST",
            headers: headersList,
            data: formData,
        }

        const response = await axios.request(reqOptions)

        console.log(response);
        if (response.data.success) {
            console.log(response.data.token);
            home(true, response.data.token)
        } else {
            login()
        }


    }

    return (
        <div>
            <Container maxWidth="sm" >
                <Box sx={{ mt: 16 }} >
                    <div>
                        <form class="modal-content" onSubmit={handleSubmit}>
                            <div class="container">
                                <h1>Login</h1>
                                <p>Please fill in this form to Log in</p>
                                <hr />

                                <label for="email"><b>Email</b></label>
                                <input type="email" placeholder="Enter Email" name="email" required />

                                <label for="password"><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" name="password" required />

                                <div class="clearfix">
                                    <button type="submit" className="loginbtn button">Log in</button>
                                </div>
                                <p></p>
                            </div>
                        </form>
                    </div>
                </Box>
            </Container>
        </div>
    )
}