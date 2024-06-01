import React, { useContext } from 'react'
import AlertContext from '../context/alert/alertContext'

export default function Alert() {

    const context= useContext(AlertContext);
    const {alert}= context;

    return (
        <div>
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} style={{visibility:alert.type===""?"hidden":""}}  role="alert">
               <strong> {alert.type}: {alert.msg}</strong>
            </div>
        </div>
    )
}
