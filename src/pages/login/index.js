import Image from "next/image";
import Link from "next/link";
import ErrorMessage from "@/components/ErrorMessage";
import { useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc"
import styles from "./login.module.css";

const LoginPage = () => {
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

      localStorage.setItem('token', loggedUser.token);
      localStorage.setItem('firstName', loggedUser.profile.firstName);
      localStorage.setItem('lastName', loggedUser.profile.lastName);
      localStorage.setItem('userName', loggedUser.profile.userName);
      localStorage.setItem('email', loggedUser.profile.email);

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
    </>
  );
}

export default LoginPage;