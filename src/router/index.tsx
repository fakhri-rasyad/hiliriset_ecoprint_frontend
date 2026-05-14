import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Sessions from "../pages/Sessions";
import SessionHistory from "../pages/SessionHistory";
import SessionLive from "../pages/SessionLive";

function PrivateRoute({children} : {children: React.ReactNode}) {
    const token = useAuthStore((state) => state.token)
    return token ? <>{children}</> : <Navigate to="login" replace/>
} 

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
                <Route path="/sessions" element={<PrivateRoute><Sessions/></PrivateRoute>}/>
                <Route path="/sessions/:id/live" element={<PrivateRoute><SessionLive /></PrivateRoute>}/>
                <Route path="/sessions/:id/history" element={<PrivateRoute><SessionHistory/></PrivateRoute>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}
