import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import Comment from "@components/Comment"
import { AiOutlineHeart, AiFillHeart, AiOutlineSend } from "react-icons/ai";
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
  const [showComments, setShowComments] = useState(false);
  const [likesToRender, setLikesToRender] = useState(likes.length);
  const [commentsToRender, setCommentsToRender] = useState(comments);
  const [contentToSend, setContentToSend] = useState({
    content: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:8080/api/posts/${id}`);
      const { post } = await response.json();
      setCommentsToRender(post.comments);
    }
    fetchPost();
  }, []);

  useEffect(() => {
    const likesArray = [];
    loggedUser.likes.map(({ post }) => likesArray.push(post));
    setLoggedUserLikes(likesArray);
  }, [loggedUser]);

  const handleShowComments = () => {
    setShowComments(!showComments)
  }

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

    const postResponse = await fetch(`http://localhost:8080/api/posts/${id}`);
    const { post } = await postResponse.json();

    setLikesToRender(post.likes.length);

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

    const postResponse = await fetch(`http://localhost:8080/api/posts/${id}`);
    const { post } = await postResponse.json();

    setLikesToRender(post.likes.length);

    cookies.set('likes', user.user.follows, { path: '/' });
  }

  const handleCommentCreation = (e) => {
    const { name, value } = e.target;
    setContentToSend({
      ...contentToSend,
      [name]: value,
    });
  }

  const handleSubmitComment = async () => {
    try {
      const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(contentToSend),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('token')}`
        }
      }

      await fetch(`http://localhost:8080/api/comments/${id}`, fetchConfig);

      const response = await fetch(`http://localhost:8080/api/posts/${id}`);
      const { post } = await response.json();
      setCommentsToRender(post.comments);

      setContentToSend({ content: '' });
    } catch (error) {
      // handle error
    }
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
        <p className={styles.paragraph}>{likesToRender} likes</p>
        <button
          className={styles.showCommentsButton}
          onClick={handleShowComments}
        >
          {commentsToRender.length} comments
        </button>
      </div>
      <div className={styles.commentsAndInput}>
        {showComments &&
          commentsToRender.length > 0 &&
          commentsToRender.map((comment) => {
            return (
              <Comment
                userName={comment.user.userName}
                timeAgo={comment.createdAt}
                content={comment.content}
              />
            )
          })
        }
        <div className={styles.inputContainer}>
          <textarea
            className={styles.text}
            name="content"
            value={contentToSend.content}
            onChange={handleCommentCreation}
          />
          <button
            className={styles.sendButton}
            onClick={handleSubmitComment}
          >
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;