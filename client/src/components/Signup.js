import React from "react";
import Container from '@material-ui/core/Container';
import Box from '@mui/material/Box';
import '../App.css'
import './styles/Signup.css'
import GoogleButton from 'react-google-button'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {

    const history = useHistory()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const { username, email, password } = event.target.elements
        // console.log(password.value)

        const formData = ({
            "username": username.value,
            "email": email.value,
            "password": password.value,
        })


        let reqOptions = {
            url: "http://localhost:5000/api/auth/register",
            method: "POST",
            data: formData,
        }

        // axios.request(reqOptions).then(function (response) {
        //     console.log(response.data);
        //     history.push("/");
        // })

        // console.log(reqOptions);
        const response = await axios.request(reqOptions)
        try {
            console.log(response.data);
            localStorage.setItem("authToken", response.data.token);

            if (response.data) {
                history.push("/protected");
                // console.log('s');
            }
        } catch (error) {
            console.log(error);
            history.push("/signup");
        }
    }



    return (
        <div>
            <Container maxWidth="sm" className='registerBox' >
                <Box sx={{ mt: 10 }} >
                    <div>
                        <form class="modal-content" onSubmit={handleSubmit}>
                            <div class="container">
                                <h1>Sign Up</h1>
                                <p>Please fill in this form to create an account.</p>
                                <hr />
                                <label for="username"><b>Username</b></label>
                                <input type="text" placeholder="Create Username" name="username" required />

                                <label for="email"><b>Email</b></label>
                                <input type="email" placeholder="Enter Email" name="email" required />

                                <label for="password"><b>Password</b></label>
                                <input type="password" placeholder="Create Password" name="password" required />

                                <a href='http://localhost:5000/api/auth/google'>                                <GoogleButton
                                    className="gbtn"
                                /></a>

                                <p>By creating an account you agree to our  <a href='blank'>Terms & Privacy</a></p>

                                <div class="clearfix">
                                    <button type="submit" className="signupbtn button">Sign Up</button>
                                </div>
                                <Link to='/login'>
                                    <p>Already have an account ? Log in</p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </Box>
            </Container>
        </div>
    )
}