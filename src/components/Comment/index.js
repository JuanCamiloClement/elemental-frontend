import { timeAgo } from "../../../utils/timeAgo";
import styles from "./comment.module.css";

const Comment = ({ userName, date, content }) => {
  const relativeTime = timeAgo(new Date(date));
  return (
    <div className={styles.wholeComment}>
      <div className={styles.userAndTimeContainer}>
        <p className={styles.username}><strong>{userName}</strong></p>
        <p className={styles.timeAgo}>{relativeTime}</p>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
}

export default Comment;