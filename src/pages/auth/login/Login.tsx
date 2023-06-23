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

  const [err, setErr] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password!)
      .then(async (res) => {
        setErrMsg("");
        setErr(false);
        navigate("/");
      })
      .catch((err) => {
        setErrMsg(err.message);
        setErr(true);
      });
  };

  useEffect(() => {
    // Check if user is already authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login"); // If not authenticated, redirect to login page
      } else {
        navigate("/"); // If authenticated, redirect to home page
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the auth state changes
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px 0px",
          }}
        >
          <Link to="/reset">Forget Password ?</Link>
        </div>
        {err && (
          <p
            style={{
              color: "red",
              margin: "10px 0px",
              fontWeight: 600,
            }}
          >
            {errMsg}
          </p>
        )}
        <p className={styles.noteText}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </Box>
  );
};

export default Login;
