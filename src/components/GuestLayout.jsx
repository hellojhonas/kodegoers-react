import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../css/guest.css'

export default function GuestLayout() {
    const {token} =useStateContext()

    if (token) {
        return <Navigate to="/"/>
    }
    return (
        <div>
            <Outlet/>
        </div>
    )
}