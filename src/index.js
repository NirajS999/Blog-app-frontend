import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, ErrorPage, PostDetail, Register, Login, UserProfile, Authors, CreatePost, EditPosts,DeletePost, CategoryPosts, AuthorsPosts, Dashboard, Logout } from './pages';
import Layout from './components/Layout';
import { UserProvider } from './context/userContext';

const router = createBrowserRouter([
  {
    path:"/",
    element: <UserProvider><Layout /></UserProvider> ,
    errorElement: <ErrorPage />,
    children:[
      {index: true, element: <Home />},
      {path: "posts/:id",element: <PostDetail />},
      {path:"register",element: <Register />},
      {path:"login",element: <Login />},
      {path:"profile/:id",element: <UserProfile />},
      {path:"authors",element: <Authors />},
      {path:"create",element: <CreatePost />},
      {path:"posts/:id/edit",element: <EditPosts />},
      {path:"posts/:id/delete",element: <DeletePost />},
      {path:"posts/categories/:category",element: <CategoryPosts />},
      {path:"posts/users/:id",element: <AuthorsPosts />},
      {path:"myposts/:id",element: <Dashboard />},
      {path:"logout",element: <Logout />},

    ] 
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

