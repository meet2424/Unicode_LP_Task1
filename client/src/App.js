import React from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import Signup from "./components/Signup"
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import Protected from "./components/Protected";
//--------------------------------------------------IMP read-----------------------------------------------
//Half done jwt 
// oauth and finishing stylings are left

const App = () => {

    // const [signUp, setSignUp] = useState(false)
    // const [logIn, setLogIn] = useState(false)

    // const signup = () => {
    //     setSignUp(true)
    //     setLogIn(false)
    // }

    // const login = () => {
    //     setLogIn(true)
    //     setSignUp(false)
    // }

    // const home = () => {
    //     setLogIn(false)
    //     setSignUp(false)
    //     console.log('h');
    // }



    return (
        <BrowserRouter>
            <div>
                <Navbar />
            </div>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route path='/protected' component={Protected} />

            </Switch>
            {/* {(!signUp && !logIn) && <Home home={home} />}
            {signUp && <SignUp signup={signup} login={login} home={home} />}
            {logIn && <Login signup={signup} login={login} home={home} />} */}
        </BrowserRouter>
    );
}

export default App;






























// Spotify Color Palette
// #1ed760 , #21e065
// #b22c15
// #2941ab
// Google OAuth Button - #1877f2
//