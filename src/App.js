import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Header from "./components/header/Header";
import Library from "./components/library/Library";
import BookDetails from "./components/library/BookDetails";
import { useSelector } from "react-redux";

function App() {
    const user = useSelector((state) => state.auth.loggedIn);
    console.log(user);
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    {user ? (
                        <Route path="/" element={<Library />} />
                    ) : (
                        <Route path="login" element={<Login />} />
                    )}
                    <Route path="register" element={<Register />} />
                    <Route path="book/:id" element={<BookDetails />} />
                </Routes>
                <></>
            </Router>
        </div>
    );
}

export default App;
