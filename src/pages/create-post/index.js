import Image from "next/image";
import Layout from "@/components/Layout";
import newPostImage from "@public/new-post.jpeg"
import styles from "./create-post.module.css"

const CreatePostPage = () => {
  return (
    <Layout>
      <div className={styles.wholeContainer}>
        <Image
          className={styles.image}
          src={newPostImage}
          alt="New post"
          width={200}
          height={200}
        />
        <div className={styles.buttonsContainer}>
          <button
            className={styles.cancelButton}
            type="button"
          >
            Cancel
          </button>
          <button
            className={styles.postButton}
            type="button"
          >
            Post
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default CreatePostPage;