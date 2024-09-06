import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/common/Spinner';
import Error from '../../components/common/Error';
import { AppDispatch, RootState } from '../../store';
import { nanoid } from '@reduxjs/toolkit';
import { addUser, updateUser } from '../../features/user/userActions';
import { Link, useNavigate } from 'react-router-dom';

interface UserFormProps {
    id?: number;
    firstName?: string;
    lastName?: string;
    maidenName?: string;
    age?: number;
    gender?: string;
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    birthDate?: string;
    image?: string;
    bloodGroup?: string;
    height?: number;
    weight?: number;
    eyeColor?: string;
}


const initialState = {
    firstName: '',
    lastName: '',
    maidenName: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birthDate: '',
    image: '',
    bloodGroup: '',
    height: 0,
    weight: 0,
    eyeColor: ''
}

const UserForm: React.FC<UserFormProps> = (user) => {
    const [inputValues, setInputValues] = useState(user ? user : initialState);
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let payload = {} as any;

        if (user.id) {
            payload = { id: user.id, ...inputValues };
            dispatch(updateUser(payload));
        } else {
            payload = { ...inputValues, id: nanoid() };
            dispatch(addUser(payload));
        }
        navigate("/users")
    };

    return (
        <>
            {error && <Error>{error}</Error>}
            <form onSubmit={handleForm} className="grid grid-cols-2 gap-4">

                <div>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the first name"
                        name="firstName"
                        id="firstName"
                        value={inputValues.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the last name"
                        name="lastName"
                        id="lastName"
                        value={inputValues.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="maidenName" className="form-label">Maiden Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the maiden name"
                        name="maidenName"
                        id="maidenName"
                        value={inputValues.maidenName}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter the age"
                        name="age"
                        id="age"
                        value={inputValues.age}
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                        className="form-control"
                        name="gender"
                        id="gender"
                        value={inputValues.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value={"select"} disabled>Please Select Gender</option>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter the email"
                        name="email"
                        id="email"
                        value={inputValues.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the phone number"
                        name="phone"
                        id="phone"
                        value={inputValues.phone}
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the username"
                        name="username"
                        id="username"
                        value={inputValues.username}
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter the password"
                        name="password"
                        id="password"
                        value={inputValues.password}
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label htmlFor="birthDate" className="form-label">Birth Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="birthDate"
                        id="birthDate"
                        value={inputValues.birthDate}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="image" className="form-label">Image URL</label>
                    <input
                        type="url"
                        className="form-control"
                        placeholder="Enter the image URL"
                        name="image"
                        id="image"
                        value={inputValues.image}
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the blood group"
                        name="bloodGroup"
                        id="bloodGroup"
                        value={inputValues.bloodGroup}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="height" className="form-label">Height (cm)</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter the height"
                        name="height"
                        id="height"
                        value={inputValues.height}
                        onChange={handleChange}
                        required />
                </div>
                <div>
                    <label htmlFor="weight" className="form-label">Weight (kg)</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter the weight"
                        name="weight"
                        id="weight"
                        value={inputValues.weight}
                        onChange={handleChange}
                        required />
                </div>
                <div className='col-span-2'>
                    <label htmlFor="eyeColor" className="form-label">Eye Color</label>
                    <input
                        type="color"
                        style={{ padding: 0 }}
                        className="form-control p-0"
                        placeholder="Enter the eye color"
                        name="eyeColor"
                        id="eyeColor"
                        value={inputValues.eyeColor}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mt-3">
                    <Link to="/users" className="btn btn-danger w-full">
                        Back
                    </Link>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary w-full">
                        {loading ? <Spinner /> : "Save"}
                    </button>
                </div>
            </form>
        </>
    );
}

export default UserForm;



