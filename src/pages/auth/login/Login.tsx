import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Box, Button } from "@mui/material";
import InputBox from "../../../components/InputBox";
import { AuthInfo } from "../../../type";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<AuthInfo>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
      .then(async (res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        // navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>
        <Box className={styles.formInner}>
          <InputBox
            name={"email"}
            id={"email"}
            label="Email"
            type={"email"}
            inputStyle={styles.inputBox}
            onChange={handleChange}
            loginInfo={loginInfo}
          />
          <InputBox
            name={"password"}
            id={"password"}
            type={"password"}
            label="Password"
            inputStyle={styles.inputBox}
            onChange={handleChange}
            loginInfo={loginInfo}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
        <p className={styles.noteText}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </Box>
  );
};

export default Login;
