import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    const [alert, setAlert] = useState({msg:"", type:""});
    const showAlert =async (msg, type) => {
        setAlert({
            msg: msg,
            type: type
        })
        setTimeout(() => {
            setAlert({msg:"", type:""});
        }, 2000)
    }
    return (
        <AlertContext.Provider value={{alert, showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;