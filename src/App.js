import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Header from "./components/header/Header";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route index path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
                <>
                    <Header />
                </>
            </Router>
        </div>
    );
}

export default App;
