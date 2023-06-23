import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import useFetch from "../../hooks/useFetch";
import { UserData } from "../../type";

import styles from "./home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const [dataLength, setDataLength] = useState<number>(20);
  const { data, isLoading } = useFetch(dataLength);

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/register"); // If not authenticated, redirect to register page
      } else {
        navigate("/"); // If authenticated, redirect to home page
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the auth state changes
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth); // Sign out the user
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setDataLength((prev) => prev + 10); // Increase data length when reaching the bottom of the page
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup function to remove the scroll event listener
    };
  }, []);

  return (
    <div className={styles.container}>
      <button onClick={handleSignOut} className={styles.signout}>
        Sign Out
      </button>
      <div className={styles.innerContainer}>
        {data &&
          data.map((item: UserData) => {
            return (
              <div key={item._id} className={styles.card}>
                <h1>{item.name}</h1>
                {item?.airline.map((airline) => {
                  return (
                    <div key={airline._id}>
                      <h1>{airline.name}</h1>
                      <h1>{airline.slogan}</h1>
                      {airline?.logo && <img src={airline?.logo} alt="logo" />}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      {isLoading && <h1 className={styles.loading}>Loading....</h1>}
    </div>
  );
};

export default Home;
