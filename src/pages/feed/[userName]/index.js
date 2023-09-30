import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '@/redux/store';
import { feedState, setFeed } from '@/redux/slices/feedSlice';
import { getUser, userState } from '@/redux/slices/userSlice';
import styles from './feed.module.css';

const FeedPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userState);
  const { feed } = useSelector(feedState);

  const { follows } = user;

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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  await store.dispatch(getUser(params.userName));
});