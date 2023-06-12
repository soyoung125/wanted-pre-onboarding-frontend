import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomeLayout from './components/layouts/HomeLayout';
import TodoContainer from './container/todo/TodoContainer';
import SignUpContainer from './container/sign/SignUpContainer';
import SignInContainer from './container/sign/SignInContainer';

const isLogin = () => localStorage.getItem('data')

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <>home</>
      },
      {
        path: '/signin',
        element: !isLogin() ? <SignInContainer /> : <Navigate to="/todo" />
      },
      {
        path: '/signup',
        element: !isLogin() ? <SignUpContainer /> : <Navigate to="/todo" />
      },
      {
        path: '/todo',
        element: <TodoContainer />
      },
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
