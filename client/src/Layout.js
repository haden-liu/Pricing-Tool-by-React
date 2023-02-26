import { Outlet, Link } from "react-router-dom";

import './App.css';

export default function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/list">List</Link>
                    </li>
                    <li>
                        <Link to="/calculation">Calculation</Link>
                    </li>
                    <li>
                        <Link to="/addRates">Calculation</Link>
                    </li>


                </ul>

            </nav>
            <div id = 'intro_div'>
                <p>It is a website to manage the freight costs</p>
            </div>

            <Outlet />
        </div>
    )

}