import Image from "next/image";
import sloth from "@public/sloth-with-coffe.jpeg";
import styles from "./post.module.css";

const Post = () => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <p>juancamiloclement</p>
        <p>10 hours ago</p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          className={styles.postImage}
          src={sloth}
          alt="Post"
          width={200}
          height={200}
        />
      </div>
      <div className={styles.likesAndComments}>
        <p>10 likes</p>
        <p>10 comments</p>
      </div>
    </div>
  );
}

export default Post;