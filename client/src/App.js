import React, { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/Signup"


const App = () => {

    const [signUp, setSignUp] = useState(false)
    const [logIn, setLogIn] = useState(false)

    const signup = () => {
        setSignUp(true)
        setLogIn(false)
    }

    const login = () => {
        setLogIn(true)
        setSignUp(false)
    }




    return (
        <div>
            <Navbar signup={signup} login={login} />
            {signUp && <SignUp signup={signup} login={login} />}
            {logIn && <Login />}
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