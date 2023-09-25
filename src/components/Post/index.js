import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import styles from "./post.module.css";

const Post = ({
  username,
  date,
  url,
  likes,
  comments,
}) => {
  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <Link className={styles.link} href="/profile">
          <p className={styles.paragraph}><strong>{username}</strong></p>
        </Link>
        <p className={styles.paragraph}>{date}</p>
      </div>
      <Image
        className={styles.postImage}
        src={url}
        alt="Post"
        width={800}
        height={600}
      />
      <div className={styles.likesAndComments}>
        <button className={styles.heartButton}><AiOutlineHeart /></button>
        <p className={styles.paragraph}>{likes} likes</p>
        <p className={styles.paragraph}>{comments} comments</p>
      </div>
    </div>
  );
}

export default Post;