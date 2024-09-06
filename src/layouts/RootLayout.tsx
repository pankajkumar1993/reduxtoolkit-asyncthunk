import { Outlet } from "react-router-dom"
import TheHeader from "../components/common/TheHeader"

const RootLayout = () => {
    return (
        <>
            <TheHeader />
            <section className="py-10">
                <div className="container">
                    <Outlet />
                </div>
            </section>
        </>
    )
}

export default RootLayout