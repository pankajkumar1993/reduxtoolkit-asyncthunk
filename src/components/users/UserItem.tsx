import React from 'react'
import { UserProps } from '../../types'
import { Link, useNavigate } from 'react-router-dom'
import Trash from '../icons/Trash'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../../features/user/userActions'
import { AppDispatch } from '../../store'
import Edit from '../icons/Edit'


interface UserItemProps extends UserProps {
    showViewButton?: boolean
}

const UserItem: React.FC<UserItemProps> = (user) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    const handleDelete = () => {
        dispatch(deleteUser(user.id));
        navigate("/users")
    }
    return (
        <div className="card text-center flex flex-col gap-3 relative" key={user.id}>
            <div className='absolute top-3 right-3 flex gap-3'>
                <button className='btn-danger btn-icon' onClick={handleDelete}><Trash /></button>
                <Link to={`/users/${user.id}/edit`} className='btn-dark btn-icon'><Edit /></Link>
            </div>
            <div>
                <img src={user.image} className="border w-10 h-10 rounded-full mx-auto mb-3" alt={user.username} />
                <h2 className="my-2 text-base text-green-500">@{user.username}</h2>
                <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
            </div>
            <ul className="text-gray-400">
                <li>{user.email}</li>
                <li>{user.phone}</li>
            </ul>
            {user.showViewButton &&
                <Link to={`/users/${user.id}/details`} className='btn btn-primary'>View</Link>}

            {!user.showViewButton &&
                <Link to={`/users`} className='btn btn-primary'>Back</Link>}
        </div>
    )
}

export default UserItem