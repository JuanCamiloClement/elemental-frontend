import Layout from '@/components/Layout';
import Post from '@/components/Post';
import styles from './feed.module.css';

const FeedPage = () => {
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