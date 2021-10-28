import React, { useState } from 'react'
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom'

export default function Artist() {

    const history = useHistory()

    const [singleFile, setSingleFile] = useState('')
    const [uploadMsg, setUploadMsg] = useState('')

    const singleFileChange = (event) => {
        setSingleFile(event.target.files[0]);
    }

    const uploadFiles = async (e) => {
        e.preventDefault()
        const { artist, songTitle } = e.target
        console.log(artist.value);
        console.log(songTitle.value);
        console.log(singleFile);

        const formData = new FormData();
        formData.append("file", singleFile);
        formData.append("songTitle", songTitle.value);
        formData.append("artist", artist.value);

        const url = "http://localhost:5000/api/singleFileUpload"
        // let reqOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     data: formdata,
        // }

        // axios.request(reqOptions).then(function (response) {
        //     console.log(response.data);
        // })
        try {
            const response = await axios.post(url, formData)
            console.log(response);
            setUploadMsg(response.data)
            // history.push('/')

        } catch (error) {
            history.push('/signup')
            // setInvalidMsg(error.response.data.message)
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
                <form onSubmit={uploadFiles}>

                    <h1> Tell us more about your track! </h1>

                    <TextField label="Track Title" variant="outlined" name="songTitle" margin="dense" fullWidth required />
                    <TextField label="Artist Name" variant="outlined" name="artist" margin="dense" fullWidth required />

                    <label>Select a file: </label>
                    <input type="file" name="file" accept="audio/mp3,audio/aac,audio/wav,audio/mpeg" onChange={singleFileChange} />

                    <Button type="submit" variant="contained" fullWidth  >
                        Upload!
                    </Button>

                </form>
            </Box>
        </div>
    )
}