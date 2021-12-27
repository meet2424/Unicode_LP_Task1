import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';

import "./styles/Navbar.css";

import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    transparentBar: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none',
        fontFamily: ['Festive', 'cursive'],
    },
    root: {
        margin: 0,
        flexGrow: 1,
    },
    title: {
        marginLeft: 70,
        flexGrow: 1,
    },
    navBtn: {
        width: 100,
        color: "#effbff !important",
    }
}));

export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();
    const [role, setRole] = useState('')
    useEffect(() => {
        const fetchData = () => {
            if (localStorage.getItem('role')) {
                setRole(localStorage.getItem('role'))
            }
            else {
                setRole('');
            }
            console.log('role');
        }
        fetchData();
    }, [role]);

    const onLogout = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("role")
        console.log(role);
        history.push('/')
    }


    return (
        <div className={classes.root} >
            <AppBar position="static" className={classes.transparentBar}>
                <Toolbar>
                    <Typography
                        variant="h5"
                        className={classes.title}>
                        <Link to='/'>
                            <HomeIcon /> W E S I N G
                        </Link>
                    </Typography>
                    {(role === 'artist') && <Link to='/artist'>
                        <Button className={classes.navBtn}>
                            <HeadsetMicIcon style={{ color: "white" }} /> Uploads
                        </Button>
                    </Link>}
                    {(role === 'user' || role === 'artist') && <Link to='/songs'>
                        <Button className={classes.navBtn}><MusicNoteIcon style={{ color: "white" }} />Music</Button>
                    </Link>}

                    {(!role) && <Link to='/signup' >

                        <Button className={classes.navBtn}>Sign up</Button>
                    </Link>}
                    {(!role) && <Link to='/login'>
                        <Button className={classes.navBtn}>Log in</Button>
                    </Link>}

                    {(role) && <Button className={classes.navBtn} onClick={onLogout}><ExitToAppIcon style={{ color: "white" }} /><a href='/'>Logout</a></Button>}

                </Toolbar>
            </AppBar>
        </div>
    );
}