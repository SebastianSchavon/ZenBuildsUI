import { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Home from "./components/pages/home"
import Global from "./components/pages/global"
import Leaderboard from "./components/pages/leaderboard"
import Profile from "./components/pages/profile"
import Login from "./components/auth/login"
import Register from "./components/auth/register"
import { PrivateRoute } from "./components/routing/privateRoute";
import "./main-page.css";
import Sidebar from "./components/layout/sidebar/sidebar";

function App() {
    const [visibillity, setVisibillity] = useState(false);
    
    return (
        <Router>
            <div className="container">
                <Fragment>
                    <Sidebar visibillity={visibillity} setVisibillity={setVisibillity} />
                    <Navbar visibillity={visibillity} setVisibillity={setVisibillity}/>
                    <Routes>
                        <Route exact path="/" element={<PrivateRoute />}>
                            <Route exact path="/home" element={<Home />} />
                            <Route exact path="/global" element={<Global />} />
                            <Route exact path="/leaderboard" element={<Leaderboard />} />
                            <Route exact path="/profile" element={<Profile />} />
                        </Route>
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </Fragment>
            </div>
        </Router>
    );
}

export default App;
