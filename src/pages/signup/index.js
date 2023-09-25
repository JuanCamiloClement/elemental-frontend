import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc"
import styles from "./signup.module.css";

const SignUpPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await fetch('http://localhost:8080/api/users/', fetchConfig);

    router.push('/verify-email');
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
          <h2>Sign up</h2>
          <label htmlFor="firstName">First name</label>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            id="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last name</label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            id="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          <label htmlFor="userName">Username</label>
          <input
            className={styles.input}
            type="text"
            name="userName"
            id="userName"
            value={user.userName}
            onChange={handleChange}
          />
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
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
          <button
            className={styles.signupButton}
            type="submit"
          >
            Sign up
          </button>
          <p>
            Already have an account? <Link href="/login">Log in</Link>
          </p>
          <button
            className={styles.googleButton}
            type="button"
          >
            <FcGoogle />
            Sign up with Google
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUpPage;