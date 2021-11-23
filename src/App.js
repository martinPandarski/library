import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Outlet, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Header from "./components/header/Header";
import Library from "./components/library/Library";
import BookDetails from "./components/library/BookDetails";
import { useSelector } from "react-redux";

function PrivateOutlet() {
    const isLoggedIn = localStorage.getItem("token");
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="/" element={<Library />}>
                        {/* <Route element={<Library />} /> */}
                    </Route>
                    <Route path="book/:id" element={<BookDetails />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
