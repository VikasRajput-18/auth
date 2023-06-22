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

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, signupInfo.email, signupInfo.password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: signupInfo.username,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/register");
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
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

        <p className={styles.noteText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </Box>
  );
};

export default Register;
