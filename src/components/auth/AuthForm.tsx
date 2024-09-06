import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authActions";
import { AppDispatch } from "../../store";
import Spinner from "../common/Spinner";
import { useNavigate } from "react-router-dom";
import Error from "../common/Error";


const AuthForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, userInfo } = useSelector((state: any) => state.auth);

    const [inputValues, setInputValaues] = useState({
        username: 'emilys',
        password: 'emilyspass',
    });


    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])


    const handleForm = (event: React.FormEvent) => {
        event.preventDefault();

        let payLoad = {
            username: inputValues.username,
            password: inputValues.password,
            expiresInMins: 120
        } as any;

        if (!inputValues.username && !inputValues.password) {
            return alert("Please fill all details")
        }

        dispatch(loginUser(payLoad));


        setInputValaues({
            username: '',
            password: '',
        })


    }

    return (
        <form onSubmit={handleForm} className="flex flex-col gap-4">
            {error && <Error>{error}</Error>}
            <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the username"
                    name="username"
                    id="username"
                    value={inputValues.username}
                    onChange={(e) => setInputValaues((prev) => ({
                        ...prev, username: e.target.value
                    }))} />
            </div>
            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the password"
                    name="password"
                    id="password"
                    value={inputValues.password}
                    onChange={(e) => setInputValaues((prev) => ({
                        ...prev, password: e.target.value
                    }))} />
            </div>
            <div className="mt-3">
                <button type="submit" className="btn btn-primary w-full">{loading ? <Spinner /> : "Login"}</button>
            </div>
        </form>
    )
}

export default AuthForm