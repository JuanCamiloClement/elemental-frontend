import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc"
import styles from "./login.module.css";

const LoginPage = () => {
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
        <form className={styles.form}>
          <h2>Login</h2>
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
      </div>
    </>
  );
}

export default LoginPage;