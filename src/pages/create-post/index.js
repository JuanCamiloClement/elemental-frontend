import Image from "next/image";
import Layout from "@/components/Layout";
import Cookies from "universal-cookie";
import { useState, useContext, useRef } from "react";
import { LoggedUserContext } from "@/contextStore/LoggedUserContext";
import { useRouter } from "next/router";
import newPostImage from "@public/new-post.jpeg"
import styles from "./create-post.module.css"

const CreatePostPage = () => {
  const cookies = new Cookies();
  const router = useRouter();

  const { loggedUser } = useContext(LoggedUserContext);

  const imageRef = useRef(null);

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const cancelUpload = () => {
    setFile(null);
    setImage(null);
  }

  const readFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file)
  }

  const handleImageUpload = () => {
    imageRef.current?.click()
  }

  const handleChange = (e) => {
    readFile(e.target.files[0])
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('url', file, file.name);

    const fetchConfig = {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': `Bearer ${loggedUser.token || cookies.get('token')}`,
      }
    }

    await fetch('http://localhost:8080/api/posts', fetchConfig);

    router.push(`/my-profile/${loggedUser.userName || cookies.get('userName')}`);
  }

  return (
    <Layout>
      <div className={styles.wholeContainer}>
        <Image
          className={styles.image}
          src={image || newPostImage}
          alt="New post"
          width={200}
          height={200}
          onClick={handleImageUpload}
        />
        <input
          className={styles.fileInput}
          type="file"
          name="file"
          id="file"
          ref={imageRef}
          onChange={handleChange}
        />
        <div className={styles.buttonsContainer}>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={cancelUpload}
          >
            Cancel
          </button>
          <button
            className={styles.postButton}
            type="button"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default CreatePostPage;