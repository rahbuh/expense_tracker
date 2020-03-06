import React, { Fragment, useContext } from "react";
import NavbarLeft from "./NavbarLeft";
import NavbarRight from "./NavbarRight";
import AuthContext from "../../context/auth";

const Navbar = () => {
  const { user, handleLogOut } = useContext(AuthContext);

  return (
    <nav className="navbar">
      {user.isLoggedIn ? (
        <Fragment>
          <NavbarLeft message={`Welcome, ${user.username}!`} />
          <NavbarRight
            link1={{ path: "/user/expenses", text: "My Expenses" }}
            link2={{ path: "/login", text: "Log Out" }}
            logout={handleLogOut}
          />
        </Fragment>
      ) : (
        <Fragment>
          <NavbarLeft />
          <NavbarRight
            link1={{ path: "/register", text: "Register" }}
            link2={{ path: "/login", text: "Log In" }}
          />
        </Fragment>
      )}
    </nav>
  );
};

export default Navbar;
