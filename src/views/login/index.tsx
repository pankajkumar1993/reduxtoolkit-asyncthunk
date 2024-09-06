import AuthForm from "../../components/auth/AuthForm"

const LoginView = () => {
    return (
        <div className="card mx-auto w-2/5">
            <h1 className="mb-5 text-2xl uppercase text-center font-bold">Login</h1>
            <AuthForm />
        </div>
    )
}

export default LoginView