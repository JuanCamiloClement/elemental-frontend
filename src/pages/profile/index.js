import Image from "next/image";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import profilePic from "@public/profile-pic.jpeg";
import { AiOutlineEdit } from "react-icons/ai";
import styles from "./profile.module.css";

const ProfilePage = () => {
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
            <button
              className={styles.editTextButton}
              type="button"
            >
              Edit
            </button>
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.fullName}>
              Juan Camilo Clement
            </p>
            <p className={styles.userName}>
              juancamilo.clement
            </p>
            <p className={styles.bio}>
              Physician and developer
            </p>
          </div>
          <div className={styles.followersAndPostsContainer}>
            <p className={styles.postsAmount}>
              <strong>Posts: </strong>10
            </p>
            <p className={styles.followersAmount}>
              <strong>Followers: </strong>10
            </p>
          </div>
        </div>
        <div className={styles.postsContainer}>
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;