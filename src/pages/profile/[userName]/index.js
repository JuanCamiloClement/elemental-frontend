import Image from "next/image";
import Cookies from "universal-cookie";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoggedUserContext } from "@/contextStore/LoggedUserContext";
import { AiOutlineEdit } from "react-icons/ai";
import profilePic from "@public/profile-pic.jpeg";
import styles from "./profile.module.css";

const ProfilePage = ({ user }) => {
  const cookies = new Cookies();

  const router = useRouter();

  const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);

  const [followedUsers, setFollowedUsers] = useState([]);
  const [profileUser, setProfileUser] = useState(user);

  useEffect(() => {
    const followedUsers = [];
    loggedUser.follows.map(({ user }) => {
      followedUsers.push(user.userName);
    })
    setFollowedUsers(followedUsers);
  }, [profileUser]);

  const handleFollow = async () => {
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify({ usernameToFollow: profileUser.userName }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.get('token')}`
      }
    }

    await fetch(`http://localhost:8080/api/follows/`, fetchConfig);

    const response = await fetch(`http://localhost:8080/api/users/single/${loggedUser.userName}`);
    const logged = await response.json();

    setLoggedUser({
      ...loggedUser,
      follows: logged.user.follows,
    });

    cookies.set('follows', logged.user.follows, { path: '/' });

    const profileUserResponse = await fetch(`http://localhost:8080/api/users/single/${profileUser.userName}`);
    const profileUserData = await profileUserResponse.json();
    setProfileUser(profileUserData.user);
  }

  const handleUnfollow = async () => {
    await fetch(
      `http://localhost:8080/api/follows?follower=${loggedUser.userName}&followedUser=${profileUser.userName}`,
      { method: 'DELETE' }
    );

    const response = await fetch(`http://localhost:8080/api/users/single/${loggedUser.userName}`);
    const logged = await response.json();

    setLoggedUser({
      ...loggedUser,
      follows: logged.user.follows,
    });

    cookies.set('follows', logged.user.follows, { path: '/' });

    const profileUserResponse = await fetch(`http://localhost:8080/api/users/single/${profileUser.userName}`);
    const profileUserData = await profileUserResponse.json();
    setProfileUser(profileUserData.user);
  }

  return (
    <Layout>
      <div className={styles.wholeContainer}>
        <div className={styles.profileContainer}>
          <div className={styles.imageAndEditContainer}>
            <Image
              className={styles.profileImage}
              src={profileUser.avatar ? profileUser.avatar : profilePic}
              alt="Profile picture"
              width={200}
              height={200}
            />
            {
              followedUsers.includes(profileUser.userName) ?
                (<button
                  className={styles.editTextButton}
                  type="button"
                  onClick={handleUnfollow}
                >
                  Unfollow
                </button>
                ) : (
                  <button
                    className={styles.editTextButton}
                    type="button"
                    onClick={handleFollow}
                  >
                    Follow
                  </button>)
            }
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.fullName}>
              {profileUser.firstName} {profileUser.lastName}
            </p>
            <p className={styles.userName}>
              {profileUser.userName}
            </p>
            {profileUser.bio &&
              <p className={styles.bio}>
                {profileUser.bio}
              </p>
            }
          </div>
          <div className={styles.followersAndPostsContainer}>
            <p className={styles.postsAmount}>
              <strong>Posts: </strong>{profileUser.posts.length}
            </p>
            <p className={styles.followersAmount}>
              <strong>Followers: </strong>{profileUser.followers.length}
            </p>
          </div>
        </div>
        <div className={styles.postsContainer}>
          {user.posts.length === 0 ?
            <h3>You have no posts yet!</h3>
            :
            profileUser.posts.map((post) => {
              return (
                <Post
                  key={post._id}
                  id={post._id}
                  username={profileUser.userName}
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

export default ProfilePage;

export const getServerSideProps = async ({ params }) => {
  const response = await fetch(`http://localhost:8080/api/users/single/${params.userName}`);
  const data = await response.json();

  return {
    props: {
      user: data.user,
    }
  }
};