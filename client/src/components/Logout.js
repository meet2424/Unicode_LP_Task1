import React from "react";
import { useHistory } from "react-router-dom";

export default function Logout() {

    const history = useHistory()

    const logout = (event) => {
        localStorage.removeItem("authToken")
        history.push('/')
    }


    return (
        <div>
            <button type="submit" className="logoutbtn" onClick={logout}>Logout</button>
        </div>
    )
}