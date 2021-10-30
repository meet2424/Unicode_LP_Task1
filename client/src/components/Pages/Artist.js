import React, { useState } from 'react'
// import axios from "axios";
import { singleFileUpload, getAllSingleFiles, multipleFilesUpload, getMultipleFiles } from '../../api/files';
import { Box, Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom'

export default function Artist() {

    const history = useHistory()

    const [singleFile, setSingleFile] = useState('')
    const [multipleFiles, setMultipleFile] = useState('')
    const [showMultipleFiles, setShowMultipleFiles] = useState([]);
    const [showSingleFiles, setShowSingleFiles] = useState([]);
    const [uploadMsg, setUploadMsg] = useState('')

    const singleFileChange = (event) => {
        setSingleFile(event.target.files[0]);
    }
    const multipleFileChange = (event) => {
        setMultipleFile(event.target.files);
    }

    //Single Uploads
    const uploadSingleFiles = async (e) => {
        e.preventDefault()
        const { artist, songTitle } = e.target
        const formData = new FormData();
        formData.append("file", singleFile);
        formData.append("songTitle", songTitle.value);
        formData.append("artist", artist.value);
        try {
            const response = await singleFileUpload(formData)
            setUploadMsg(response.data)
            document.getElementById("uploadSingleFile").reset();
            // e.target.value = null;
        } catch (error) {
            setUploadMsg(error.response.data)
        }
    }

    //Multiple Uploads
    const uploadMultipleFiles = async (e) => {
        e.preventDefault()
        const { artist, albumTitle } = e.target
        const formData = new FormData();
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append("files", multipleFiles[i]);
        }
        formData.append("albumTitle", albumTitle.value);
        formData.append("artist", artist.value);


        try {
            const response = await multipleFilesUpload(formData)
            setUploadMsg(response.data)
            document.getElementById("uploadMultipleFile").reset();
        } catch (error) {
            setUploadMsg(error.response.data)
            history.push('/Artist')
        }
    }

    const myUploads = async () => {
        try {
            const singleFilesList = await getAllSingleFiles();
            setShowSingleFiles(singleFilesList.data);
        } catch (error) {
        }
        try {
            const multipleFilesList = await getMultipleFiles();
            setShowMultipleFiles(multipleFilesList.data);
        } catch (error) {
        }
    }

    return (
        <div>
            <h1>Artist Page</h1>

            {/* <h1>Congratulations! Your song is uploaded! Would you like to display all singles? </h1> */}
            {/* <a href="/displaySongs"><Button> Yes, take me there </Button></a> */}
            {/* <a href="/singleUpload"><Button> No, I want to upload another track </Button></a> */}
            {uploadMsg}
            <Box >
                <form id="uploadSingleFile" onSubmit={uploadSingleFiles}>

                    <h1> Tell us more about your track! </h1>

                    <TextField label="Track Title" variant="outlined" name="songTitle" margin="dense" fullWidth required />
                    <TextField label="Artist Name" variant="outlined" name="artist" margin="dense" fullWidth required />

                    <label>Select a file: </label>
                    <input type="file" name="file" accept="audio/mp3,audio/aac,audio/wav,audio/mpeg" onChange={singleFileChange} required />

                    <Button type="submit" variant="contained" fullWidth  >
                        Upload!
                    </Button>

                </form>
                <br />

            </Box>

            <Box >
                <form id="uploadMultipleFile" onSubmit={uploadMultipleFiles}>

                    <h1> Tell us more about your Album! </h1>

                    <TextField label="Album Title" variant="outlined" name="albumTitle" margin="dense" fullWidth required />
                    <TextField label="Artist Name" variant="outlined" name="artist" margin="dense" fullWidth required />

                    <label>Select all file: </label>
                    <input type="file" name="file" multiple accept="audio/mp3,audio/aac,audio/wav,audio/mpeg" onChange={multipleFileChange} required />

                    <Button type="submit" variant="contained" fullWidth  >
                        Upload!
                    </Button>

                </form>
                <br />
            </Box>
            <Button type="button" variant="contained" fullWidth onClick={myUploads} >
                View my catalogue
            </Button>

            <Box>
                <h2>Single Tracks</h2>
                {showSingleFiles.map((file) => {
                    return <Box key={file._id}>
                        <p>{file.fileName}</p>
                        <br />
                    </Box>
                })}
            </Box>
            <Box>
                <h2>Albums</h2>

                {showMultipleFiles.map((album) => {
                    return <div>
                        <Box key={album._id}>
                            <h3>{album.albumTitle}</h3>

                            {album.files.map((file, index) => {
                                return <Box key={index}>
                                    <p>{file.fileName}</p>
                                </Box>
                            })}
                        </Box>
                        <br />
                    </div>
                })}
            </Box>
        </div>
    )
}