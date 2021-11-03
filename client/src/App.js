import React, { useState, useEffect } from "react";
import Login from "./components/Pages/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home"
import Signup from "./components/Pages/Signup"
import Artist from "./components/Pages/Artist";
import Songs from "./components/Pages/Songs";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css'

const App = () => {
    const [role, setRole] = useState('')
    useEffect(() => {
        const fetchData = () => {
            setRole(localStorage.getItem('role'))
            console.log('role');
        }
        fetchData();
    }, [role]);

    return (
        <BrowserRouter>
            <div>
                <Navbar role={role} />
            </div>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route path='/artist' component={Artist} />
                <Route path='/songs' component={Songs} />

            </Switch>

        </BrowserRouter>
    );
}

export default App;

