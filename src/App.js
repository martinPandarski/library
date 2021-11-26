import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Header from "./components/header/Header";
import Library from "./components/library/Library";
import BookDetails from "./components/library/BookDetails";
import Settings from "./components/settings/Settings";
import PrivateRoute from "./PrivateRoute";

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

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Library />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="/settings"
                    element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="book/:id"
                    element={
                        <PrivateRoute>
                            <BookDetails />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
