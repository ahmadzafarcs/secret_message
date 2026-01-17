import { Outlet } from "react-router-dom"

export default function GlobalLayout() {
    return <main style={{margin: "auto", maxWidth: "600px"}}>
        <Outlet />
    </main> 
}