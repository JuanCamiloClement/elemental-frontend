import Cookies from "universal-cookie";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import styles from "./activate-account.module.css"

const AccountActivationPage = ({ user }) => {
  const cookies = new Cookies();

  useEffect(() => {
    cookies.set('token', user.token);
    cookies.set('firstName', user.profile.firstName);
    cookies.set('lastName', user.profile.lastName);
    cookies.set('userName', user.profile.userName);
    cookies.set('email', user.profile.email);
  }, []);

  return (
    <div>
      <Layout>
        <h3 className={styles.h3}>Your account has been activated</h3>
        <p className={styles.p}>You are also already logged in. Please enjoy the page!</p>
      </Layout>
    </div>
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