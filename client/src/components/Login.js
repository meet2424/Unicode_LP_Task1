import React from "react";
import Container from '@material-ui/core/Container';
import Box from '@mui/material/Box';
import './styles/Login.css'
import GoogleButton from 'react-google-button'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Login() {

    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { email, password } = event.target.elements

        let reqOptions = {
            url: "http://localhost:5000/api/auth/login",
            method: "POST",
            "Content-Type": "application/json",
            data: ({
                "email": email.value,
                "password": password.value
            }),
        }


        try {
            const response = await axios.request(reqOptions)
            localStorage.setItem("authToken", response.data.token);
            if (response.data.success) {
                history.push('/protected')
            }

        } catch (error) {
            console.log('log');
            history.push('/login')
            // login()
        }

    }

    return (
        <div>
            <Container maxWidth="sm" >
                <Box sx={{ mt: 16 }} >
                    <div>
                        <form className="modal-content" onSubmit={handleSubmit}>
                            <div className="container">
                                <h1>Login</h1>
                                <p>Please fill in this form to Log in</p>
                                <hr />

                                <label for="email"><b>Email</b></label>
                                <input type="email" placeholder="Enter Email" name="email" required />

                                <label for="password"><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" name="password" required />

                                <a href='http://localhost:5000/api/auth/google'>                                <GoogleButton
                                    className="gbtn"
                                /></a>
                                <div className="clearfix">
                                    <button type="submit" className="loginbtn button">Log in</button>
                                </div>
                                <Link to='/signup'>
                                    <p>Dont have an account ? Sign up</p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </Box>
            </Container>
        </div>
    )
}