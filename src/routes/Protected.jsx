import { Navigate, Outlet } from "react-router"
import { useName } from "../hooks/useName"

function Protected() {
    const [state] = useName()

    if (!state.name) return <Navigate to="/" />

    return <Outlet />
}

export default Protected