import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "./styles/Navbar.css";
import { Link } from "react-router-dom";

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
    // navbarBut: {
    //     // marginLeft: '7rem',
    //     fontSize: '1.1rem',
    //     color: 'inherit',
    // },
    navBtn: {
        // fontSize: '1rem',
        width: 100,
        // paddingLeft: "2%",
    }
}));

export default function Navbar(props) {
    const classes = useStyles();
    // const { signup, login, home } = props

    return (
        <div className={classes.root} >
            <AppBar position="static" className={classes.transparentBar}>
                <Toolbar>
                    <Typography
                        variant="h5"
                        className={classes.title}>
                        <Link to='/'>
                            Music App
                        </Link>
                    </Typography>
                    <Link to='/signup' className={classes.navBtn}>
                        <Button >Sign up</Button>
                    </Link>
                    <Link to='/login'>
                        <Button className={classes.navBtn}>Log in</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}