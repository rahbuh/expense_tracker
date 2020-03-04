import React from "react";
import { Link } from "react-router-dom";

const NavbarLeft = props => {
  return (
    <div>
      <div id="home">
        <Link to="/">
          <i className="fas fa-home"></i>
        </Link>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default NavbarLeft;
