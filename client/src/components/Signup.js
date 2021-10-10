import React from "react";
import Container from '@material-ui/core/Container';
import Box from '@mui/material/Box';
import '../App.css'
import './Signup.css'
import axios from "axios";

export default function SignUp(props) {

    const { login, signup } = props

    const handleSubmit = (event) => {
        event.preventDefault()
        const { username, email, password } = event.target.elements
        // console.log(username.value)


        let headersList = {
            "Content-Type": "application/json"
        }

        let formData = JSON.stringify({
            "username": username.value,
            "email": email.value,
            "password": password.value
        })


        let reqOptions = {
            url: "http://localhost:5000/api/auth/register",
            method: "POST",
            headers: headersList,
            data: formData,
        }

        axios.request(reqOptions).then(function (response) {
            if (response.data.success) {
                login()
            } else {
                signup()
            }
        })

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
                                <input type="text" placeholder="Enter Username" name="username" required />

                                <label for="email"><b>Email</b></label>
                                <input type="email" placeholder="Enter Email" name="email" required />

                                <label for="password"><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" name="password" required />

                                {/* <label for="psw-repeat"><b>Repeat Password</b></label>
                                <input type="password" placeholder="Repeat Password" name="psw-repeat" required /> */}


                                <p>By creating an account you agree to our  <a href='/'>Terms & Privacy</a></p>

                                <div class="clearfix">
                                    <button type="submit" className="signupbtn button">Sign Up</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Box>
            </Container>
        </div>
    )
}