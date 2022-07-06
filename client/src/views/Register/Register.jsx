import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./Register.module.css";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
const Register = () => {
  const [values, setValues] = useState();

  const handleRegister = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const { response, loading, error, operation } = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click");
    const userData = {
      email: values.email,
      password: values.password,
    };
    axios
      .post("http://localhost:5000/users", userData)
      .then((response) => {
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

  console.log(values);

  return (
    <div className={styles.box}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="email" variant="outlined" name="email" onChange={handleRegister} />
        <TextField id="outlined-basic" label="password" variant="outlined" name="password" onChange={handleRegister} />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
