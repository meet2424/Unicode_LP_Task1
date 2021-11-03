import React, { useState } from "react";
import '../styles/Signup.css'
import GoogleButton from 'react-google-button'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Container from '@material-ui/core/Container';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SignUp() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory()
    const [invalidMsg, setInvalidMsg] = useState('')
    const [selectedValue, setSelectedValue] = useState('user');

    const handleRole = (event) => {
        setSelectedValue(event.target.value);
    };

    const onSubmit = async (data) => {
        const { username, email, password, phone } = data
        console.log(selectedValue);
        let reqOptions = {
            url: "http://localhost:5000/api/auth/register",
            method: "POST",
            "Content-Type": "application/json",
            data: ({
                "username": username,
                "email": email,
                "phone": phone,
                "password": password,
                "role": selectedValue,
            }),
        }
        try {
            const response = await axios.request(reqOptions)

            if (!response.data.success) {
                setInvalidMsg(response.data.message)
            }

            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("role", response.data.role);
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

                                {/* <label><b>Please Select your Role</b></label>
                                <br />
                                <input id="user" type="radio" name="role" value="user" />
                                <label htmlFor="user">User</label>
                                <input id="artist" type="radio" name="role" value="artist" />
                                <label htmlFor="artist">Artist</label><br /> */}

                                <FormControl component="fieldset">
                                    <FormLabel component="legend"><b className="role">Please Select your Role</b></FormLabel>
                                    <RadioGroup row name="role">
                                        <FormControlLabel value="user" onChange={handleRole} control={<Radio />} label="User" checked={selectedValue === 'user'} />
                                        <FormControlLabel value="artist" onChange={handleRole} control={<Radio />} label="Artist" checked={selectedValue === 'artist'} />
                                    </RadioGroup>
                                </FormControl>

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

// {/* <FormControl>
//     <RadioGroup value={checked} onChange={handleChange} className="create-note" >
//         <h2>Question {props.index + 1}
//             <span style={{ fontSize: "0.9rem" }}> (5 points)
//             </span>
//         </h2>
//         <br />
//         <p>{he.decode(props.question)}</p>
//         <br />
//         <FormControlLabel value="0" control={<Radio size="medium" />} label={he.decode(props.option[props.index][0])} />
//         <FormControlLabel value="1" control={<Radio size="medium" />} label={he.decode(props.option[props.index][1])} />
//         <FormControlLabel value="2" control={<Radio size="medium" />} label={he.decode(props.option[props.index][2])} />
//         <FormControlLabel value="3" control={<Radio size="medium" />} label={he.decode(props.option[props.index][3])} />

//         <div className="dummy" />

//         {(props.index !== 0) && <ArrowBackIosIcon onClick={previous} className="button-previous" fontSize="large" />}

//         {(props.index !== 9) && <ArrowForwardIosIcon onClick={next} className="button-next" fontSize="large" />}

//         {(props.index === 9) && <button
//             onClick={(() => (checked || require) ? props.handleSubmit(checked) : alert("Please answer the current question"))}
//             className="button-submit">Submit
//         </button>}
//     </RadioGroup>
// </FormControl> */}