import { useState, useEffect } from "react";
import styles from "../login/Login.module.css";
import { Box, Button } from "@mui/material";
import InputBox from "../../../components/InputBox";
import { AuthInfo } from "../../../type";
import { auth } from "../../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [emailInfo, setEmailInfo] = useState<AuthInfo>({
    email: "",
  });

  const navigate = useNavigate();

  const [err, setErr] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmailInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, emailInfo.email)
      .then((res) => {
        setErrMsg("");
        setErr(false);
      })
      .catch((error) => {
        setErrMsg(error.message);
        setErr(true);
      });
  };

  useEffect(() => {
    // Check if user is already authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/reset"); // If not authenticated, redirect to login page
      } else {
        navigate("/"); // If authenticated, redirect to home page
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the auth state changes
  }, [navigate]);

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Reset Password</h1>
        <Box className={styles.formInner}>
          <InputBox
            name={"email"}
            id={"email"}
            label="Email"
            type={"email"}
            inputStyle={styles.inputBox}
            onChange={handleChange}
            loginInfo={emailInfo}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 0px",
            }}
          >
            <Link to="/login">Login</Link>
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
          <Button type="submit" variant="contained">
            Reset Password
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ResetPassword;
