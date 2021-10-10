import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import "../App.css"

const useStyles = makeStyles((theme) => ({

    root: {
        margin: 0,
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Navbar(props) {
    const classes = useStyles();
    const { signup, login, home } = props

    return (
        <div className={classes.root} >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Music App
                        <Button className='navbarBut' onClick={() => home()}>Home</Button>
                        <Button className='navbarBut'>Support</Button>
                        <Button className='navbarBut'>Download</Button>
                    </Typography>
                    <div class="vl" />
                    <Button className='navBut' onClick={() => signup()}>Sign up</Button>
                    <Button className='navBut' onClick={() => login()}>Log in</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}