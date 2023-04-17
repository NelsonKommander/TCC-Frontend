import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import VehiclesPage from "../pages/vehicles/VehiclesPage";
import PageElement from "../components/page-element/PageElement";
import VehiclePage from "../pages/vehicle/VehiclePage";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/my-vehicles" element={<PageElement component={VehiclesPage} />} />
            <Route path="/my-vehicle" element={<PageElement component={VehiclePage} />} /> 
        </Routes>
    )
}