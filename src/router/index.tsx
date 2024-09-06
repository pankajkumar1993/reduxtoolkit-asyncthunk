import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layouts/RootLayout"
import LoginView from "../views/login"
import Profile from "../views/profile"
import Products from "../views/products"
import ProductDetail from "../views/products/view"
import UsersList from "../views/users"
import UserDetail from "../views/users/detail"
import NewUser from "../views/users/add"
import EditUser from "../views/users/edit"
import { Home } from "../views/home"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true, element: <Home />
            },
            {
                path: '/login', element: <LoginView />
            },
            {
                path: "/profile", element: <Profile />
            },
            {
                path: "/products", element: <Products />
            },
            {
                path: "/products/:id/view", element: <ProductDetail />
            },
            {
                path: "/users", element: <UsersList />
            },
            {
                path: "/users/:id/details", element: <UserDetail />
            },
            {
                path: "/users/add", element: <NewUser />
            },
            {
                path: "/users/:id/edit", element: <EditUser />
            },
        ]
    }
])