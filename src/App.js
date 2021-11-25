import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Outlet, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Header from "./components/header/Header";
import Library from "./components/library/Library";
import BookDetails from "./components/library/BookDetails";
import Settings from "./components/settings/Settings";

function PrivateOutlet() {
    const isLoggedIn = localStorage.getItem("token");
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
    const location = useLocation();
    return (
        <div className="App">
            {location.pathname !== "/login" &&
            location.pathname !== "/register" ? (
                <Header />
            ) : null}
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="/" element={<Library />}></Route>
                <Route path="/settings" element={<Settings />} />
                <Route path="book/:id" element={<BookDetails />} />
            </Routes>
        </div>
    );
}

export default App;
