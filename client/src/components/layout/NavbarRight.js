import React from "react";
import { Link } from "react-router-dom";

const NavbarRight = props => {
  return (
    <div>
      <ul>
        <li>
          <Link to={props.link1.path}>{props.link1.text}</Link>
        </li>
        <li>
          <Link to={props.link2.path} onClick={props.logout}>
            {props.link2.text}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavbarRight;
