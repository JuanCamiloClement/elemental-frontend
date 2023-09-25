import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import styles from './feed.module.css';

const FeedPage = ({ loggedUser }) => {

  const [postsToMap, setPostsToMap] = useState([]);

  useEffect(() => {
    const postsToRender = [];
    loggedUser.follows.map(({ user }) => {
      user.posts.map((post) => {
        postsToRender.push({
          url: post.url,
          user,
          likes: post.likes,
          comments: post.comments,
          createdAt: post.createdAt,
        });
      });;
    });
    setPostsToMap(postsToRender);
  }, []);

  return (
    <>
      <Layout>
        <div className={styles.wholeContainer}>
          <h3 className={styles.h3}>What's new?</h3>
          <div className={styles.postsContainer}>
            {postsToMap.length === 0 ?
              <h3>The people you follow haven't posted yet!</h3>
              :
              postsToMap.map((post) => {
                return (
                  <Post
                    username={post.user.userName}
                    date={post.createdAt}
                    url={post.url}
                    likes={post.likes.length}
                    comments={post.comments.length}
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
  const response = await fetch(`http://localhost:8080/api/users/logged/${params.userName}`);
  const fetchedUser = await response.json();

  return {
    props: {
      loggedUser: fetchedUser.user,
    }
  }
}