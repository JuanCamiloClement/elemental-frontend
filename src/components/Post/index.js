import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useEffect, useContext, useState } from "react";
import { LoggedUserContext } from "@/contextStore/LoggedUserContext";
import { timeAgo } from "../../../utils/timeAgo";
import styles from "./post.module.css";

const Post = ({
  id,
  username,
  date,
  url,
  likes,
  comments,
}) => {
  const relativeTime = timeAgo(new Date(date));
  const cookies = new Cookies();
  const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
  const [loggedUserLikes, setLoggedUserLikes] = useState([]);

  useEffect(() => {
    const likesArray = [];
    loggedUser.likes.map(({ post }) => likesArray.push(post));
    setLoggedUserLikes(likesArray);
  }, [loggedUser]);

  const handleLike = async () => {
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify({ postId: id }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.get('token')}`
      }
    }

    await fetch('http://localhost:8080/api/likes', fetchConfig);

    const response = await fetch(`http://localhost:8080/api/users/single/${loggedUser.userName}`);
    const user = await response.json();

    setLoggedUser({
      ...loggedUser,
      likes: user.user.likes,
    });

    cookies.set('likes', user.user.follows, { path: '/' });
  }

  const handleRemoveLike = async () => {
    const fetchConfig = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${cookies.get('token')}`
      }
    }

    await fetch(`http://localhost:8080/api/likes?postId=${id}`, fetchConfig);

    const response = await fetch(`http://localhost:8080/api/users/single/${loggedUser.userName}`);
    const user = await response.json();

    setLoggedUser({
      ...loggedUser,
      likes: user.user.likes,
    });

    cookies.set('likes', user.user.follows, { path: '/' });
  }

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <Link className={styles.link} href={`/profile/${username}`}>
          <p className={styles.paragraph}><strong>{username}</strong></p>
        </Link>
        <p className={styles.paragraph}>{relativeTime}</p>
      </div>
      <Image
        className={styles.postImage}
        src={url}
        alt="Post"
        width={800}
        height={600}
      />
      <div className={styles.likesAndComments}>
        {loggedUserLikes.includes(id) ?
          (<button
            className={styles.heartButton}
            onClick={handleRemoveLike}
          >
            <AiFillHeart />
          </button>
          ) : (
            <button
              className={styles.heartButton}
              onClick={handleLike}
            >
              <AiOutlineHeart />
            </button>)
        }
        <p className={styles.paragraph}>{likes} likes</p>
        <p className={styles.paragraph}>{comments} comments</p>
      </div>
    </div>
  );
}

export default Post;