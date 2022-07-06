import React, { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./Login.module.css";
import axios from "axios";
import { AuthContext } from "../../utils/userContext";
const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);
  const [values, setValues] = useState();

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: values.email,
      password: values.password,
    };
    axios
      .post("http://localhost:5000/users/login", userData)
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };
  return (
    <div className={styles.box}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="email" variant="outlined" name="email" onChange={handleLogin} />
        <TextField id="outlined-basic" label="password" variant="outlined" name="password" onChange={handleLogin} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
