import Cookies from "universal-cookie";
import Layout from "@/components/Layout";
import { useEffect, useContext } from "react";
import { LoggedUserContext } from "@/contextStore/LoggedUserContext";
import styles from "./activate-account.module.css"

const AccountActivationPage = ({ user }) => {
  const cookies = new Cookies();

  const { setLoggedUser } = useContext(LoggedUserContext);

  useEffect(() => {
    setLoggedUser({
      token: user.token,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      userName: user.profile.userName,
      email: user.profile.email,
    });
    cookies.set('token', user.token, { path: "/" });
    cookies.set('firstName', user.profile.firstName, { path: "/" });
    cookies.set('lastName', user.profile.lastName, { path: "/" });
    cookies.set('userName', user.profile.userName, { path: "/" });
    cookies.set('email', user.profile.email, { path: "/" });
  }, []);

  return (
    <Layout>
      <div className={styles.wholeContainer}>
        <h3 className={styles.h3}>Your account has been activated</h3>
        <p className={styles.p}>You are also already logged in. Please enjoy the page!</p>
      </div>
    </Layout>
  );
}

export default AccountActivationPage;

export const getServerSideProps = async ({ params }) => { // The complete object of params is context (context.params or context.query)
  const response = await fetch(`http://localhost:8080/auth/local/activate-account/${params.validateToken}`);
  const data = await response.json();

  return {
    props: {
      user: data,
    }
  }
}