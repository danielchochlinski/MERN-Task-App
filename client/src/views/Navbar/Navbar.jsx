import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/userContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.nav}>
      <div>
        <Link to="/">Home</Link>;
      </div>

      {user ? (
        <></>
      ) : (
        <div>
          <Link to="/login">Login</Link>;
        </div>
      )}
      {user ? (
        <></>
      ) : (
        <div>
          <Link to="/register">Register</Link>;
        </div>
      )}
      <div>
        <Link to="/logout">Logout</Link>;
      </div>
    </div>
  );
};

export default Navbar;
