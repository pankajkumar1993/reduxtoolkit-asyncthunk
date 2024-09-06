import UserItem from '../../components/users/UserItem';
import SectionHeading from '../../components/common/SectionHeading';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchSingleUser } from '../../features/user/userActions';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import Error from '../../components/common/Error';
import Placeholder from '../../components/common/Placeholder';

const UserDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedUser, loading, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleUser(Number(id)));
        }
    }, [id, dispatch]);

    let content;
    if (loading) {
        content = <Spinner className='w-10 h-10' />;
    } else if (error) {
        content = <Error>{error}</Error>;
    } else if (selectedUser) {
        content = <UserItem {...selectedUser} />;
    } else {
        content = <Placeholder>No User Found!!!</Placeholder>;
    }

    return (
        <>
            <SectionHeading title="User Detail" marginb />
            <div className='w-2/5 mx-auto'>
                {content}
            </div>
        </>
    );
}

export default UserDetail;
