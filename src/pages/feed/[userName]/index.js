import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { useEffect, useState } from 'react';
import styles from './feed.module.css';
import { organizeFeed } from '../../../../utils/organizeFeed';

const FeedPage = ({ user }) => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const postsToRender = organizeFeed(user.follows);
    setFeed(postsToRender)
  }, []);

  return (
    <>
      <Layout>
        <div className={styles.wholeContainer}>
          <h3 className={styles.h3}>What's new?</h3>
          <div className={styles.postsContainer}>
            {feed.length === 0 ?
              <h3>The people you follow haven't posted yet!</h3>
              :
              feed.map((post) => {
                return (
                  <Post
                    key={post._id}
                    id={post._id}
                    username={post.user.userName}
                    date={post.createdAt}
                    url={post.url}
                    likes={post.likes}
                    comments={post.comments}
                  />
                )
              })}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default FeedPage;

export const getServerSideProps = async ({ params }) => {
  const response = await fetch(`http://localhost:8080/api/users/single/${params.userName}`);
  const data = await response.json();

  return {
    props: {
      user: data.user,
    }
  }
};