import Image from "next/image";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { useRouter } from "next/router";
import { AiOutlineEdit } from "react-icons/ai";
import profilePic from "@public/profile-pic.jpeg";
import styles from "./my-profile.module.css";

const MyProfilePage = ({ user }) => {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.wholeContainer}>
        <div className={styles.profileContainer}>
          <div className={styles.imageAndEditContainer}>
            <Image
              className={styles.profileImage}
              src={user.avatar ? user.avatar : profilePic}
              alt="Profile picture"
              width={200}
              height={200}
            />
            <button
              className={styles.editIconButton}
              type="button"
              onClick={() => router.push(`/edit-profile/${user.userName}`)}
            >
              <AiOutlineEdit />
            </button>
            <button
              className={styles.editTextButton}
              type="button"
              onClick={() => router.push(`/edit-profile/${user.userName}`)}
            >
              Edit
            </button>
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.fullName}>
              {user.firstName} {user.lastName}
            </p>
            <p className={styles.userName}>
              {user.userName}
            </p>
            {user.bio &&
              <p className={styles.bio}>
                {user.bio}
              </p>
            }
          </div>
          <div className={styles.followersAndPostsContainer}>
            <p className={styles.postsAmount}>
              <strong>Posts: </strong>{user.posts.length}
            </p>
            <p className={styles.followersAmount}>
              <strong>Followers: </strong>{user.followers.length}
            </p>
          </div>
        </div>
        <div className={styles.postsContainer}>
          {user.posts.length === 0 ?
            <h3>You have no posts yet!</h3>
            :
            user.posts.map((post) => {
              return (
                <Post
                  key={post._id}
                  id={post._id}
                  username={user.userName}
                  date={post.createdAt}
                  url={post.url}
                  likes={post.likes}
                  comments={post.comments}
                />
              )
            })}
        </div>
      </div>
    </Layout >
  );
}

export default MyProfilePage;

export const getServerSideProps = async ({ params }) => {
  const response = await fetch(`http://localhost:8080/api/users/single/${params.userName}`);
  const data = await response.json();

  return {
    props: {
      user: data.user,
    }
  }
};