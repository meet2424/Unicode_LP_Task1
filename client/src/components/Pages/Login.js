import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Box from '@mui/material/Box';
import '../styles/Login.css'
import GoogleButton from 'react-google-button'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory()
    const [invalidMsg, setInvalidMsg] = useState('')


    const onSubmit = async (data) => {
        const { email, password } = data
        let reqOptions = {
            url: "http://localhost:5000/api/auth/login",
            method: "POST",
            "Content-Type": "application/json",
            data: ({
                "email": email,
                "password": password
            }),
        }


        try {
            const response = await axios.request(reqOptions)

            if (!response.data.success) {
                setInvalidMsg(response.data.message)
            }

            localStorage.setItem("authToken", response.data.token);
            history.push('/protected')

        } catch (error) {
            setInvalidMsg(error.response.data.message)
        }

    }

    return (
        <div>
            <Container maxWidth="sm" >
                <Box sx={{ mt: 16 }} >
                    <div>
                        <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
                            <div className="container">
                                {!invalidMsg && <h1>Login</h1>}
                                {!invalidMsg && <p>Please fill in this form to Log in</p>}
                                <h1 style={{ color: "red" }}>{invalidMsg}</h1>
                                <hr />

                                <a href='http://localhost:5000/api/auth/google'>                                <GoogleButton
                                    className="gbtn"
                                />
                                </a>
                                <br />
                                <p style={{ textAlign: 'center' }}>OR</p>
                                <br />
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

                                <label><b>Password</b></label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
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