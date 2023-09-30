import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import ErrorMessage from "@/components/ErrorMessage";
import Footer from "@/components/Footer";
import { useContext, useState } from "react";
import { LoggedUserContext } from "@/contextStore/LoggedUserContext";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc"
import styles from "./login.module.css";

const LoginPage = () => {
  const cookies = new Cookies();

  const { setLoggedUser } = useContext(LoggedUserContext);

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageExists, setErrorMessageExists] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch('http://localhost:8080/auth/local/login', fetchConfig);
      const loggedUser = await response.json();

      setErrorMessage(loggedUser.message);

      setLoggedUser({
        token: loggedUser.token,
        firstName: loggedUser.profile.firstName,
        lastName: loggedUser.profile.lastName,
        userName: loggedUser.profile.userName,
        email: loggedUser.profile.email,
        follows: loggedUser.profile.follows,
        followers: loggedUser.profile.followers,
        likes: loggedUser.profile.likes,
      });

      cookies.set('token', loggedUser.token, { path: "/" });
      cookies.set('firstName', loggedUser.profile.firstName, { path: "/" });
      cookies.set('lastName', loggedUser.profile.lastName, { path: "/" });
      cookies.set('userName', loggedUser.profile.userName, { path: "/" });
      cookies.set('email', loggedUser.profile.email, { path: "/" });
      cookies.set('follows', loggedUser.profile.follows, { path: "/" });
      cookies.set('followers', loggedUser.profile.followers, { path: "/" });
      cookies.set('likes', loggedUser.profile.likes, { path: "/" });

      router.push(`/feed/${loggedUser.profile.userName}`);
    } catch (error) {
      setErrorMessageExists(true);
    }
  }

  if (errorMessageExists) {
    return (
      <>
        <header className={styles.header}>
          <Image
            src="/elemental-transparent.png"
            alt="Elemental logo"
            width={150}
            height={40}
          />
        </header>
        <ErrorMessage
          buttonFunction={() => setErrorMessageExists(false)}
        >
          {errorMessage}
        </ErrorMessage>
      </>
    )
  }

  return (
    <>
      <header className={styles.header}>
        <Image
          src="/elemental-transparent.png"
          alt="Elemental logo"
          width={150}
          height={40}
        />
      </header>
      <div className={styles.formContainer}>
        <Image
          className={styles.brains}
          src="/elemental-brains.webp"
          alt="Elemental brains background"
          width={450}
          height={375}
        />
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
          <button
            className={styles.loginButton}
            type="submit"
          >
            Login
          </button>
          <p>
            Don't have an account yet? <Link href="/signup">Register</Link>
          </p>
          <button
            className={styles.googleButton}
            type="button"
          >
            <FcGoogle />
            Log in with Google
          </button>
        </form>
      </div >
      <Footer />
    </>
  );
}

export default LoginPage;