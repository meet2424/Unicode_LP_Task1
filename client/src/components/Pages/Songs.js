import React, { useState, useEffect } from "react";
import { Box, Button } from '@mui/material';
import { getAllSingleFiles, getMultipleFiles } from '../../api/files';
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'



function SongsDisplay() {

    const history = useHistory()
    const [userName, setUserName] = useState('')
    //Check If User Or Not
    const query = new URLSearchParams(useLocation().search);

    if (query.get('token') && !localStorage.getItem('authToken')) {
        localStorage.setItem("role", "user");
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

    const [list, setList] = useState([{
        name: '',
        musicSrc: '',
        singer: '',
    }])
    const convertString = (path) => {
        path = path.replace(/\\/g, "/");
        path = path.replace(/ /g, "%20");
        return path;
    }
    return <Box>
        <h1>Hii {userName}</h1>
        <br />
        <br />
        <Box>
            <h2>Single Tracks</h2>
            {showSingleFiles.map((file) => {
                return <Box>
                    <Button
                        key={file._id}
                        onClick={() => {
                            let path = convertString("http://localhost:5000/" + file.filePath);
                            setList([{
                                name: file.songTitle,
                                musicSrc: path,
                                singer: file.artist,
                            }])
                        }}>{file.songTitle}</Button>
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
                                <Button
                                    key={file._id}
                                    onClick={() => {
                                        let path = convertString("http://localhost:5000/" + file.filePath);
                                        setList([{
                                            name: file.fileName.split('.', 1),
                                            musicSrc: path,
                                            singer: file.artist,
                                        }])
                                    }}> {file.fileName.split("-", 1)}
                                </Button>
                            </Box>
                        })}
                    </Box>
                    <br />
                </Box>
            })}
        </Box>
        <Box>
            <ReactJkMusicPlayer
                quietUpdate
                clearPriorAudioLists
                audioLists={list}
                theme="auto"
                mode="full"
                autoHiddenCover
                spaceBar={true}
                toggleMode={false}
                showMiniProcessBar={true}
                showDownload={false}
                showThemeSwitch={false}
                defaultVolume="0.5"
                restartCurrentOnPrev={true}
            />
        </Box>

    </Box>

}

export default SongsDisplay;