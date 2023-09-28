import Image from "next/image";
import Cookies from "universal-cookie";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useSelector } from 'react-redux';
import { wrapper } from '@/redux/store';
import { getUser, userState } from '@/redux/slices/userSlice';
import { LoggedUserContext } from "@/contextStore/LoggedUserContext";
import { AiOutlineEdit } from "react-icons/ai";
import profilePic from "@public/profile-pic.jpeg";
import styles from "./profile.module.css";

const ProfilePage = () => {
  const cookies = new Cookies();

  const { user } = useSelector(userState);

  const router = useRouter();

  const { loggedUser } = useContext(LoggedUserContext);

  const {
    firstName,
    lastName,
    userName,
    posts,
    followers,
  } = user;

  return (
    <Layout>
      <div className={styles.wholeContainer}>
        <div className={styles.profileContainer}>
          <div className={styles.imageAndEditContainer}>
            <Image
              className={styles.profileImage}
              src={user.avatar /* !== (undefined || null) */ ? user.avatar : profilePic}
              alt="Profile picture"
              width={200}
              height={200}
            />
            <button
              className={styles.editIconButton}
              type="button"
            >
              <AiOutlineEdit />
            </button>
            {
              userName === (loggedUser.userName || cookies.get('userName')) ?
                (<button
                  className={styles.editTextButton}
                  type="button"
                  onClick={() => router.push(`/edit-profile/${user.userName}`)}
                >
                  Edit
                </button>
                ) : (
                  <button
                    className={styles.editTextButton}
                    type="button"
                  >
                    Follow
                  </button>)
            }
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.fullName}>
              {firstName} {lastName}
            </p>
            <p className={styles.userName}>
              {userName}
            </p>
            {user.bio &&
              <p className={styles.bio}>
                {user.bio}
              </p>
            }
          </div>
          <div className={styles.followersAndPostsContainer}>
            <p className={styles.postsAmount}>
              <strong>Posts: </strong>{posts.length}
            </p>
            <p className={styles.followersAmount}>
              <strong>Followers: </strong>{followers.length}
            </p>
          </div>
        </div>
        <div className={styles.postsContainer}>
          {posts.length === 0 ?
            <h3>You have no posts yet!</h3>
            :
            posts.map((post) => {
              return (
                <Post
                  key={post._id}
                  username={userName}
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
  );
}

export default ProfilePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  await store.dispatch(getUser(params.userName));
});