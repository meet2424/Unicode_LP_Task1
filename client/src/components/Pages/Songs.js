import React, { useState, useEffect } from "react";
import { Box } from '@mui/material';
// import React, { useState, useEffect } from 'react'
import { getAllSingleFiles, getMultipleFiles } from '../../api/files';
// import { Box, Button, TextField } from '@mui/material';
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'



function SongsDisplay() {

    const history = useHistory()
    const [userName, setUserName] = useState('')
    //Check If User Or Not
    const query = new URLSearchParams(useLocation().search);

    if (query.get('token') && !localStorage.getItem('authToken')) {
        localStorage.setItem('authToken', query.get('token'))
    }

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/')
        }

        const callProtected = async () => {
            let reqOptions = {
                url: "http://localhost:5000/api/user",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("authToken"),
                },
            }

            try {
                const response = await axios.request(reqOptions)
                const { success, username } = response.data
                if (success) {
                    setUserName(username)
                }
                else {
                    history.push('/')
                }

            } catch (error) {
                history.push('/')
            }
        }

        callProtected();

    }, [history, setUserName])


    const [showMultipleFiles, setShowMultipleFiles] = useState([]);
    const [showSingleFiles, setShowSingleFiles] = useState([]);

    const display = async () => {
        try {
            const singleFilesList = await getAllSingleFiles();
            setShowSingleFiles(singleFilesList.data);
        } catch (error) {
            console.log(error)
        }
        try {
            const multipleFilesList = await getMultipleFiles();
            setShowMultipleFiles(multipleFilesList.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        display()
    }, []);

    return <Box>
        <h1>Hii {userName}</h1>
        <br />
        <br />
        <Box>
            <h2>Single Tracks</h2>
            {showSingleFiles.map((file) => {
                return <Box>
                    <p>{file.fileName}</p>
                    <br />
                </Box>
            })}
        </Box>
        <Box>
            <h2>Albums</h2>
            {showMultipleFiles.map((album) => {
                return <Box>
                    <Box key={album._id} >
                        <h3>{album.albumTitle}</h3>
                    </Box>
                    <Box>
                        {album.files.map((file) => {
                            return <Box key={file._id}>
                                <p> {file.fileName}</p>
                            </Box>
                        })}
                    </Box>
                    <br />
                </Box>
            })}
        </Box>

    </Box>

}

export default SongsDisplay;