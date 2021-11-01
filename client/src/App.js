import React from "react";
import Login from "./components/Pages/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home"
import Signup from "./components/Pages/Signup"
import Artist from "./components/Pages/Artist";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css'

const App = () => {


    return (
        <BrowserRouter>
            <div>
                <Navbar />
            </div>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route path='/artist' component={Artist} />

            </Switch>

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