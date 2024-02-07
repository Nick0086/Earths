import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from "./store/store";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRoutes } from './components/index';
import { AddPostPage, AllPostPage, EditPostPage, FullPostCardPage, HomePage, LoginPage, SignUpPage, DashBordPage } from "./pages/index";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/signup',
        element: (
          <PrivateRoutes isLoggedIn={false}>
            <SignUpPage />
          </PrivateRoutes>
        )
      },
      {
        path: '/login',
        element: (
          <PrivateRoutes isLoggedIn={false}>
            <LoginPage />
          </PrivateRoutes>
        )
      },
      {
        path: '/createblog',
        element: (
          <PrivateRoutes isLoggedIn={true}>
            <AddPostPage />
          </PrivateRoutes>
        )
      },
      {
        path: '/AllPosts',
        element: (
          <PrivateRoutes isLoggedIn={true}>
            <AllPostPage />
          </PrivateRoutes>
        ),
        children: [
          {
            path: ':category', // Define the category parameter
            element: (
              <PrivateRoutes isLoggedIn={true}>
                <AllPostPage />
              </PrivateRoutes>
            )
          }
        ]
      },

      {
        path: '/editpost/:postid',
        element: (
          <PrivateRoutes isLoggedIn={true}>
            <EditPostPage />
          </PrivateRoutes>
        )
      },
      {
        path: '/post/:postid',
        element: (
          <PrivateRoutes isLoggedIn={true}>
            <FullPostCardPage />
          </PrivateRoutes>
        )
      },
    ]
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes isLoggedIn={true}>
        <DashBordPage />
      </PrivateRoutes>
    ),
  },
  {
    path: '/category/:category',
    element: (
      <PrivateRoutes isLoggedIn={true}>
        <DashBordPage />
      </PrivateRoutes>
    ),
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
