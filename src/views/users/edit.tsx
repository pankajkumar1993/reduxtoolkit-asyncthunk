import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchSingleUser } from '../../features/user/userActions';
import { useParams } from 'react-router-dom';
import SectionHeading from '../../components/common/SectionHeading';
import UserForm from '../../components/users/UserForm';

const EditUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedUser } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleUser(Number(id)));
        }
    }, [id, dispatch]);

    return (
        <div className="card w-1/2 mx-auto">
            <SectionHeading title="Update User" marginb />
            {selectedUser ? (
                <UserForm {...selectedUser} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditUser;
