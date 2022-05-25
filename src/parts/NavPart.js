import React from 'react';
import {
    BsCalendar3,
    BsFileBarGraph,
    BsHouseDoor
} from "react-icons/all";
import logo from "../resourses/logo.png";

function NavPart() {

    return (
        <nav className="nav-menu">

            <input className="checkbox"
                   type="checkbox"/>

            <div className="hamburger-lines">
                <span className="line line1" />
                <span className="line line2" />
                <span className="line line3" />
            </div>

            <img src={logo}
                 alt="logo"/>

            <div className="menu-items">
                <div>
                    <a href='/'>
                        <BsHouseDoor className="icon-nav" />
                        Domovská stránka
                    </a>
                </div>

                <div>
                    <a href='/calendar'>
                        <BsCalendar3 className="icon-nav-calendar" />
                        Kalendář
                    </a>
                </div>

                <div>
                    <a href='/statistics'>
                        <BsFileBarGraph className="icon-nav" />
                        Statistika
                    </a>
                </div>

            </div>

            <div className="menu-phone">
                    <a href='/'>
                        <span>Domovská stránka</span>
                    </a>

                    <a href="/calendar">
                        <span>Kalendář</span>
                    </a>

                    <a href='/statistics'>
                        <span>Statistika</span>
                    </a>
            </div>
        </nav>
    )
}

export default NavPart;