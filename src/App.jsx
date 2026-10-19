import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
// import { Toaster } from "sonner";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";

const router = createBrowserRouter(
  [
    {
      path:'/',
      element: 
      <div>
         <Navbar />
         <Home />
      </div>
    },
     {
      path:'/pastes',
      element: 
      <div>
        <Navbar />
        <Paste />
      </div> 
    },
     {
      path:'/pastes/:id',
      element: 
      <div>
         <Navbar />
         <ViewPaste />
      </div>
    },
  ]
)

function App(){
  return(
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
