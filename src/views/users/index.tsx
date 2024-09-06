import { Link } from "react-router-dom"
import SectionHeading from "../../components/common/SectionHeading"
import UserList from "../../components/users/UserList"


const UsersList = () => {


    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <SectionHeading title="User List" marginb />
                <div className="flex gap-3">
                    <Link className="btn btn-primary" to="/users/add">Add</Link>
                </div>
            </div>
            <UserList />
        </>
    )
}

export default UsersList