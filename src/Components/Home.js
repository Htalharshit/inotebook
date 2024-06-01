import React from 'react'
import Notes from './Notes'
import Alert from './Alert'


export default function Home() {


    return (
        <div className='container my-3'>
            <Alert />
            <Notes />
        </div>
    )
}
