import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import GuestLayout from "@/layouts/GuestLayout";
import NotFound from "@/views/NotFound";
import Main from "@/views/Main";
import Login from "@/views/Login";
import Landing from "@/views/Landing";
import Signup from "@/views/Signup";
import CreateOffer from "@/views/CreateOffer";
import Offer from "@/views/Offer";
import Profile from "@/views/Profile";
import User from "@/views/User";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/main"/>
      },
      {
        path: '/main',
        element: <Main/>
      },
      {
        path: '/create',
        element: <CreateOffer/>
      },
      {
        path: '/offers/:number',
        element: <Offer key="offer"/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/user/:number',
        element: <User key="user"/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,

    children: [
      {
        path: '/',
        element: <Navigate to="/welcome"/>
      },
      {
        path: '/welcome',
        element: <Landing/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);

export default router;