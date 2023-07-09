import { useAuth } from "@/context/AuthContext";
import React from "react";
export default function UserDashboard() {
    const {currentUser} = useAuth()
    console.log(currentUser)
    return (
        <div>User Dashboard</div>
        
    )
}