import Image from "next/image";
import Cookies from "universal-cookie";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import profilePic from "@public/profile-pic.jpeg";
import styles from "./profile.module.css";

const ProfilePage = ({ userOfProfile }) => {
  const cookies = new Cookies();

  const [postsToMap, setPostsToMap] = useState([]);

  useEffect(() => {
    const postsToRender = []
    if (userOfProfile.posts.length > 0) {
      userOfProfile.posts[0].user.posts.map(({ url, likes, comments, createdAt }) => {
        postsToRender.push({
          url,
          user: userOfProfile.userName,
          likes,
          comments,
          createdAt
        })
      });
      setPostsToMap(postsToRender);
    }
  }, []);

  return (
    <Layout>
      <div className={styles.wholeContainer}>
        <div className={styles.profileContainer}>
          <div className={styles.imageAndEditContainer}>
            <Image
              className={styles.profileImage}
              src={profilePic}
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
            {userOfProfile.userName === cookies.get('userName') ?
              <button
                className={styles.editTextButton}
                type="button"
              >
                Edit
              </button>
              :
              <button
                className={styles.editTextButton}
                type="button"
              >
                Follow
              </button>
            }
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.fullName}>
              {userOfProfile.firstName} {userOfProfile.lastName}
            </p>
            <p className={styles.userName}>
              {userOfProfile.userName}
            </p>
            {userOfProfile.bio &&
              <p className={styles.bio}>
                {user.bio}
              </p>
            }
          </div>
          <div className={styles.followersAndPostsContainer}>
            <p className={styles.postsAmount}>
              <strong>Posts: </strong>{userOfProfile.posts.length}
            </p>
            <p className={styles.followersAmount}>
              <strong>Followers: </strong>{userOfProfile.followers.length}
            </p>
          </div>
        </div>
        <div className={styles.postsContainer}>
          {postsToMap.length === 0 ?
            <h3>You have no posts yet!</h3>
            :
            postsToMap.map((post) => {
              return (
                <Post
                  key={post.url}
                  username={post.user}
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

export const getServerSideProps = async ({ params }) => {
  const response = await fetch(`http://localhost:8080/api/users/logged/${params.userName}`);
  const fetchedUser = await response.json();

  return {
    props: {
      userOfProfile: fetchedUser.user,
    }
  }
}