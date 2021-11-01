import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Box from '@mui/material/Box';
import '../styles/Signup.css'
import GoogleButton from 'react-google-button'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignUp() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory()
    const [invalidMsg, setInvalidMsg] = useState('')


    const onSubmit = async (data) => {
        const { username, email, password, phone } = data

        let reqOptions = {
            url: "http://localhost:5000/api/auth/register",
            method: "POST",
            "Content-Type": "application/json",
            data: ({
                "username": username,
                "email": email,
                "phone": phone,
                "password": password,
                "role": "artist"
            }),
        }
        try {
            const response = await axios.request(reqOptions)

            if (!response.data.success) {
                setInvalidMsg(response.data.message)
            }

            localStorage.setItem("authToken", response.data.token);
            history.push("/");

        } catch (error) {
            setInvalidMsg(error.response.data.message)
        }
    }



    return (
        <div>
            <Container maxWidth="sm" className='registerBox' >
                <Box sx={{ mt: 10 }} >
                    <div>
                        <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
                            <div className="container">
                                {!invalidMsg && <h1>Sign Up</h1>}
                                {!invalidMsg && <p>Please fill in this form to create an account.</p>}
                                <h1 style={{ color: "red" }}>{invalidMsg}</h1>
                                <hr />

                                <a href='http://localhost:5000/api/auth/google'>                                <GoogleButton
                                    className="gbtn"
                                />
                                </a>

                                <br />
                                <p style={{ textAlign: 'center' }}>OR</p>
                                <br />
                                <label><b>Username</b></label>
                                <input
                                    type="text"
                                    placeholder="Create Username"
                                    name="username"
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                />
                                <p className="error">{errors.username?.message}</p>

                                <label><b>Email</b></label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
                                            message: "Enter a valid email",
                                        }
                                    })}
                                />
                                <p className="error">{errors.email?.message}</p>

                                <label><b>Phone Number</b></label>
                                <input
                                    type="tel"
                                    placeholder="Enter Phone Number"
                                    name="phone"
                                    {...register("phone", {
                                        required: "Phone Number is required",
                                        pattern: {
                                            value: /^[0-9\b]+$/,
                                            message: "Only Numbers allowed",
                                        },
                                        minLength: {
                                            value: 10,
                                            message: "Phone Number must be of length 10 ",
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Phone Number must be of length 10 ",
                                        },
                                    })}
                                />
                                <p className="error">{errors.phone?.message}</p>

                                <label><b>Password</b></label>
                                <input
                                    type="password"
                                    placeholder="Create Password"
                                    name="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be more than 6 characters",
                                        }
                                    })}
                                />
                                <p className="error">{errors.password?.message}</p>


                                <div className="clearfix">
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