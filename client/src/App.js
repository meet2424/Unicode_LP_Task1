import React, { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import SignUp from "./components/Signup"
//--------------------------------------------------IMP read-----------------------------------------------
//Half done jwt 
// oauth and finishing stylings are left

const App = () => {

    const [signUp, setSignUp] = useState(false)
    const [logIn, setLogIn] = useState(false)
    const [token, setToken] = useState("")
    const [showPrivate, setShowPrivate] = useState(false)

    const signup = () => {
        setSignUp(true)
        setLogIn(false)
    }

    const login = () => {
        setLogIn(true)
        setSignUp(false)
    }

    const home = (bool, token) => {
        setLogIn(false)
        setSignUp(false)
        setShowPrivate(bool)
        setToken(token)
        console.log(token);
        console.log(bool);
    }



    return (
        <div>
            <Navbar signup={signup} login={login} home={home} />
            <Home showPrivate={showPrivate} token={token} />
            {signUp && <SignUp signup={signup} login={login} home={home} />}
            {logIn && <Login signup={signup} login={login} home={home} />}
        </div>
    );
}

export default App;






























// Spotify Color Palette
// #1ed760 , #21e065
// #b22c15
// #2941ab
// Google OAuth Button - #1877f2
//