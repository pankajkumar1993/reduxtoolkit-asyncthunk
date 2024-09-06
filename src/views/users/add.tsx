import SectionHeading from "../../components/common/SectionHeading"
import UserForm from "../../components/users/UserForm"

const NewUser = () => {
    return (
        <div className="card w-1/2 mx-auto">
            <SectionHeading title="Add New User" marginb />
            <UserForm />
        </div>
    )
}

export default NewUser