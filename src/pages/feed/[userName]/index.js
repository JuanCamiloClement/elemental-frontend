import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { feedState, setFeed } from '@/redux/slices/feedSlice';
import styles from './feed.module.css';

const FeedPage = ({ loggedUser }) => {
  const dispatch = useDispatch();
  const { feed } = useSelector(feedState);

  const { follows } = loggedUser;

  useEffect(() => {
    dispatch(setFeed(follows));
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
                    key={post.url}
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