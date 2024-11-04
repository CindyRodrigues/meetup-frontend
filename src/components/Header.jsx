import { NavLink } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hooks/useFetch";

const Header = () => {
  return (
    <header>
      <nav className="navbar bg-body-tertiary pb-4">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <img
              src="https://cdn.worldvectorlogo.com/logos/meetup-2.svg"
              alt="Meetup"
              className="img-fluid"
              height="40"
              width="100"
            />
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
