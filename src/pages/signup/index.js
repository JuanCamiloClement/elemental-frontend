import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc"
import styles from "./signup.module.css";

const SignUpPage = () => {
  return (
    <>
      <header className={styles.header}>
        <Image
          className={styles.logo}
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
          alt="Elemental logo"
          width={450}
          height={375}
        />
        <form className={styles.form}>
          <h2>Sign up</h2>
          <label htmlFor="firstName">First name</label>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            id="firstName"
          />
          <label htmlFor="lastName">Last name</label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            id="lastName"
          />
          <label htmlFor="userName">Username</label>
          <input
            className={styles.input}
            type="text"
            name="userName"
            id="userName"
          />
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
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
          <p>Already have an account? <Link href="/login">Log in</Link></p>
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