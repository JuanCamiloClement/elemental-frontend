import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import sloth from "@public/sloth-with-coffe.jpeg";
import styles from "./post.module.css";

const Post = () => {
  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <Link className={styles.link} href="/profile">
          <p className={styles.paragraph}><strong>juancamiloclement</strong></p>
        </Link>
        <p className={styles.paragraph}>10 hours ago</p>
      </div>
      <Image
        className={styles.postImage}
        src={sloth}
        alt="Post"
        width={800}
        height={600}
      />
      <div className={styles.likesAndComments}>
        <button className={styles.heartButton}><AiOutlineHeart /></button>
        <p className={styles.paragraph}>10 likes</p>
        <p className={styles.paragraph}>10 comments</p>
      </div>
    </div>
  );
}

export default Post;