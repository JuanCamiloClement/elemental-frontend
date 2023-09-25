import Layout from "@/components/Layout";
import { useEffect } from "react";
import styles from "./activate-account.module.css"

const AccountActivationPage = ({ user }) => {
  useEffect(() => {
    localStorage.setItem('token', user.token);
    localStorage.setItem('firstName', user.profile.firstName);
    localStorage.setItem('lastName', user.profile.lastName);
    localStorage.setItem('userName', user.profile.userName);
    localStorage.setItem('email', user.profile.email);
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