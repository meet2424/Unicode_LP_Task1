import React from "react";
import { useHistory } from "react-router-dom";

export default function Logout() {

    const history = useHistory()

    const onLogout = () => {
        localStorage.removeItem("authToken")
        history.push('/')
    }


    return (
        <div>
            <button type="submit" className="logoutbtn" onClick={onLogout}>Logout</button>
        </div>
    )
}