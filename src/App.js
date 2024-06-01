import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Signup from './Components/Signup';
import Login from './Components/Login';

import AlertState from './context/alert/AlertState';
function App() { 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><AlertState><NoteState><Navbar/><Home/></NoteState></AlertState></>,
    },{
    path: "/about",
      element: <><AlertState><NoteState><Navbar/><About/></NoteState></AlertState></>,
    },{
    path: "/login",
      element: <><AlertState><NoteState><Navbar/><Login/></NoteState></AlertState></>,
    },{
    path: "/signup",
      element: <><AlertState><NoteState><Navbar/><Signup/></NoteState></AlertState></>,
    }
  ]);
  return (
    <><RouterProvider router={router} /></>
  );
}

export default App;
