import styles from "./comment.module.css";

const Comment = () => {
  return (
    <div className={styles.wholeComment}>
      <div className={styles.userAndTimeContainer}>
        <p className={styles.username}><strong>randomuser</strong></p>
        <p className={styles.timeAgo}>time ago</p>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.content}>Actual comment content</p>
      </div>
    </div>
  );
}

export default Comment;