import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "../../features/auth/authActions";
import { AppDispatch, RootState } from "../../store";
import Spinner from "../../components/common/Spinner";
import SectionHeading from "../../components/common/SectionHeading";
import Calender from "../../components/icons/Calender";
import Email from "../../components/icons/Email";
import Gender from "../../components/icons/Gender";
import Error from "../../components/common/Error";

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { userInfo, loading, error } = useSelector((state: RootState) => state.auth);


    //     useEffect(() => {
    //     // Check if userToken is available in state or localStorage before dispatching
    //     const token = localStorage.getItem('userToken');
    //     if (token) {
    //         dispatch(fetchUserProfile());
    //     }
    // }, [dispatch]);
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    console.log(userInfo, "userInfo");

    if (loading) return <Spinner className="w-10 h-10" />
    if (error) return <Error>{error}</Error>

    return (
        <div>
            {userInfo &&
                <>
                    <SectionHeading marginb title={`Hello, ${userInfo?.firstName}`} />
                    <div className="max-w-sm mx-auto bg-white  rounded-lg overflow-hidden shadow-lg">
                        <div className="border-b px-4 pb-6">
                            <div className="my-4">
                                <div className="text-center">
                                    <img className="h-32 w-32 rounded-full border-4 border-white -gray-800 mx-auto my-4"
                                        src={userInfo?.image} alt="" />
                                    <h2 className="font-semibold text-xl text-gray-800 mb-1">@{userInfo?.firstName}</h2>
                                    <h3 className="font-bold text-2xl text-gray-800 mb-1">{userInfo?.firstName} {userInfo?.maidenName} {userInfo?.lastName}</h3>
                                </div>
                                <div className="pt-3">
                                    <ul className="flex flex-col gap-2">
                                        <li className="flex items-center gap-2">
                                            <Calender size={32} className="fill-green-600" />
                                            <span className="text-lg">{userInfo.age} Years</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Email size={32} className="fill-green-600" />
                                            <span className="text-lg">{userInfo.email}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Gender size={32} className="fill-green-600" />
                                            <span className="text-lg capitalize">{userInfo.gender}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
export default Profile