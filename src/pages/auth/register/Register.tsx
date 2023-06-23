import { useState, useEffect } from "react";
import styles from "../login/Login.module.css";
import { Box, Button } from "@mui/material";
import InputBox from "../../../components/InputBox";
import { AuthInfo } from "../../../type";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [signupInfo, setSignupInfo] = useState<AuthInfo>({
    email: "",
    password: "",
    username: "",
  });

  const [err, setErr] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, signupInfo.email, signupInfo.password!)
      .then(async (res) => {
        const user = res.user;
        // Update user profile with username
        await updateProfile(user, {
          displayName: signupInfo.username,
        });
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
        navigate("/register"); // If not authenticated, redirect to register page
      } else {
        navigate("/"); // If authenticated, redirect to home page
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the auth state changes
  }, [navigate]);

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Create your account</h1>
        <Box className={styles.formInner}>
          <InputBox
            name={"username"}
            id={"username"}
            label="Username"
            type={"text"}
            inputStyle={styles.inputBox}
            onChange={handleChange}
            loginInfo={signupInfo}
          />
          <InputBox
            name={"email"}
            id={"email"}
            label="Email"
            type={"email"}
            inputStyle={styles.inputBox}
            onChange={handleChange}
            loginInfo={signupInfo}
          />
          <InputBox
            name={"password"}
            id={"password"}
            type={"password"}
            label="Password"
            inputStyle={styles.inputBox}
            onChange={handleChange}
            loginInfo={signupInfo}
          />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>

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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </Box>
  );
};

export default Register;
