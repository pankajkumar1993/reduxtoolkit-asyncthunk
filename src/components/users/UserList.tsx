import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect } from "react";
import { fetchUsers, searchUsers, sortUsers } from "../../features/user/userActions";
import Spinner from "../common/Spinner";
import UserItem from "./UserItem";
import Error from "../common/Error";
import Placeholder from "../common/Placeholder";

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { users, loading, error } = useSelector((state: RootState) => state.user);


    useEffect(() => {
        dispatch(fetchUsers());
    }, []);



    let content;
    if (loading) {
        content = <Spinner className="w-12 h-12" />
    } else if (error) {
        content = <Error>{error}</Error>
    } else if (users.length) {
        content = <div className="grid grid-cols-4 gap-4">{users.map((user) => <UserItem key={user.id} {...user} showViewButton />)}</div>
    } else {
        content = <Placeholder>No Users founds</Placeholder>
    }

    // ************************** Handle Search **************************
    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const query = target.value;
        dispatch(searchUsers(query));
    };

    // ************************** Handle Sorting **************************
    const handleSorting = (e: React.FormEvent<HTMLSelectElement>) => {
        const target = e.target as HTMLSelectElement;
        const query = target.value;
        dispatch(sortUsers(query))
    }


    return (
        <div>
            <div className="card mb-4">
                <div className="flex gap-3">
                    <input type="search" placeholder="Search by name..." id="search" name="search" className="form-control flex-grow" onChange={handleSearch} />
                    <select className="form-control flex-shrink" onChange={handleSorting}>
                        <option value="0" disabled>Select Any</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
            </div>
            {content}
        </div>
    )
}

export default UserList