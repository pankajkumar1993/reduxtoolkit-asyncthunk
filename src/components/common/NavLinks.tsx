import { Link, NavLink, useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { RootState } from '../../store'

const Links = [
    //     {
    //         id: nanoid(),
    //         label: "Todos",
    //         url: "/todos"
    //     },
    //     {
    //         id: nanoid(),
    //         label: "Posts",
    //         url: "/posts"
    //     },
    //     {
    //         id: nanoid(),
    //         label: "Rockets",
    //         url: "/rockets"
    //     },
    {
        id: nanoid(),
        label: "Products",
        url: "/products"
    },
    {
        id: nanoid(),
        label: "Users",
        url: "/users"
    }
]



const NavLinks = () => {
    const { isAuthenticated, userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token")
        alert("Logout successfully");
        navigate('/')
    }

    return (
        <nav>
            <ul className='flex gap-3 items-center'>
                {isAuthenticated &&
                    <>
                        {
                            Links.map((link) => {
                                return (
                                    <li key={link.id}>
                                        <NavLink className={({ isActive }) => isActive ? "text-green-500" : ''} to={link.url}>{link.label}</NavLink>
                                    </li>
                                )
                            })
                        }
                        <li className='ml-5'>
                            <Link to="/profile" className='w-10 h-10 rounded-full uppercase font-bold flex justify-center items-center bg-green-500 border-2 border-black'>{userInfo?.firstName?.charAt(0)}</Link>
                        </li>
                        <li>
                            <button type='button' onClick={handleLogout} className='btn btn-danger'>Logout</button>
                        </li>
                    </>
                }

                {!isAuthenticated &&
                    <li>
                        <Link to="/login" className='btn btn-primary'>Login</Link>
                    </li>}
            </ul>
        </nav>
    )
}

export default NavLinks