import React, { useState } from "react";
import axios from "axios";

export default function Home(props) {
    const { showPrivate, token } = props

    const [privateMsg, setPrivateMsg] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        let headersList = {
            "Content-Type": "application/json",
            "Authorization": token,
        }

        let reqOptions = {
            url: "http://localhost:5000/api/private",
            method: "GET",
            headers: headersList,
        }

        const response = await axios.request(reqOptions)
        const { success, data } = response.data
        console.log(success);
        console.log(data);
        if (success) {
            setPrivateMsg(data)
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                {showPrivate && <button type="submit">Private</button>}
            </form>
            <h1>{privateMsg}</h1>
        </div>
    )
}