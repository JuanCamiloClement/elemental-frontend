import { useEffect } from 'react';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import styles from './feed.module.css';

const FeedPage = ({ user }) => {
  // useEffect(() => {
  //   localStorage.setItem()
  // }, []);
  return (
    <>
      <Layout>
        <div className={styles.wholeContainer}>
          <h3 className={styles.h3}>What's new?</h3>
          <div className={styles.postsContainer}>
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default FeedPage;

export const getServerSideProps = async ({ params }) => {
  const response = await fetch(`http://localhost:8080/api/users/logged/${params.userName}`);
  const user = await response.json();

  return {
    props: {
      user
    }
  }
}