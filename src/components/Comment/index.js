import styles from "./comment.module.css";

const Comment = ({ userName, timeAgo, content }) => {
  return (
    <div className={styles.wholeComment}>
      <div className={styles.userAndTimeContainer}>
        <p className={styles.username}><strong>{userName}</strong></p>
        <p className={styles.timeAgo}>{timeAgo}</p>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
}

export default Comment;