import React, { useEffect } from 'react'

export default function Home() {
    useEffect(() => {
        console.log('o');
    }, [])
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}