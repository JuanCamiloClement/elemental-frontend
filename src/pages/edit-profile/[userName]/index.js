import Image from "next/image";
import Layout from "@/components/Layout";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { wrapper } from "@/redux/store";
import { getUser, userState } from '@/redux/slices/userSlice';
import { useDispatch, useSelector } from "react-redux";
import profilePic from "@public/profile-pic.jpeg";
import styles from "./edit-profile.module.css";
import {
  editProfileState,
  showChangePasswordSection,
  showPersonalInformationSection,
  showProfileImageSection
} from "@/redux/slices/editProfileSlice";

const EditProfilePage = () => {
  const cookies = new Cookies();
  const router = useRouter();
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector(userState);
  const {
    profileImageSection,
    personalInformationSection,
    changePasswordSection,
  } = useSelector(editProfileState);

  const [file, setFile] = useState(null);
  const [userToEdit, setUserToEdit] = useState({
    ...user,
    bio: user.bio ? user.bio : '',
    avatar: user.avatar /* !== (null || undefined) */ ? user.avatar : profilePic,
  });
  const [imageToRender, setImageToRender] = useState(userToEdit.avatar);

  const handleImageRef = () => {
    imageRef.current?.click();
  }

  const readFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => setImageToRender(e.target.result);
    reader.readAsDataURL(file)
  }

  const handleFile = (e) => {
    readFile(e.target.files[0])
    setFile(e.target.files[0])
  }

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('avatar', file, file.name);

    const fetchConfig = {
      method: 'PUT',
      body: data,
      headers: {
        'Authorization': `Bearer ${cookies.get('token')}`,
      }
    }

    await fetch('http://localhost:8080/api/users/avatar', fetchConfig);

    router.push(`/profile/${cookies.get('userName')}`);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserToEdit({
      ...user,
      [name]: value,
    });
  }

  const handleInfoUpdate = async (e) => {
    e.preventDefault();
    try {
      const fetchConfig = {
        method: 'PUT',
        body: JSON.stringify(userToEdit),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('token')}`
        }
      }

      await fetch('http://localhost:8080/api/users/info', fetchConfig);

      router.push(`/profile/${user.userName}`);
    } catch (error) {
      // console.log(error.message);
    }
  }

  const handleAvatarRemove = async () => {
    try {
      const fetchConfig = {
        method: 'PUT',
        body: JSON.stringify({ avatar: null }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.get('token')}`
        }
      }

      await fetch('http://localhost:8080/api/users/remove-avatar', fetchConfig);

      router.push(`/profile/${user.userName}`);

      setImageToRender(profilePic);
      setFile(null);
    } catch (error) {
      // handle error
    }
  }


  const handleShowProfileImageSection = () => {
    dispatch(showProfileImageSection());
  }

  const handleShowEditPersonalInformationSection = () => {
    dispatch(showPersonalInformationSection());
  }

  const handleShowChangePassword = () => {
    dispatch(showChangePasswordSection());
  }

  return (
    <Layout>
      <div className={styles.wholeContainer}>
        <div className={styles.editProfileContainer}>
          <div className={styles.editMenu}>
            <h3 className={styles.h3}>
              What would you like to edit?
            </h3>
            <button
              className={styles.button}
              type="button"
              onClick={handleShowProfileImageSection}
            >
              Profile picture
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={handleShowEditPersonalInformationSection}
            >
              Personal information
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={handleShowChangePassword}
            >
              Password
            </button>
          </div>
          <div className={styles.sectionToEdit}>
            {
              profileImageSection &&
              <div className={styles.profileImageSection}>
                <h3 className={styles.h3}>
                  Profile picture
                </h3>
                <Image
                  className={styles.profileImage}
                  src={imageToRender}
                  alt="Profile picture"
                  width={200}
                  height={200}
                  onClick={handleImageRef}
                />
                <input
                  className={styles.fileInput}
                  type="file"
                  name="file"
                  id="file"
                  ref={imageRef}
                  onChange={handleFile}
                />
                <div className={styles.buttonsContainer}>
                  <button
                    className={styles.uploadButton}
                    type="button"
                    onClick={handleImageUpload}
                  >
                    Upload
                  </button>
                  <button
                    className={styles.removeButton}
                    type="button"
                    onClick={handleAvatarRemove}
                  >
                    Remove
                  </button>
                </div>
              </div>
            }
            {
              personalInformationSection &&
              <div className={styles.editPersonalInformationSection}>
                <form
                  className={styles.editPersonalInformationForm}
                  onSubmit={handleInfoUpdate}
                >
                  <h3 className={styles.h3}>Edit your personal information</h3>
                  <label htmlFor="firstName">First name</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={userToEdit.firstName}
                    onChange={handleChange}
                  />
                  <label htmlFor="lastName">Last name</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={userToEdit.lastName}
                    onChange={handleChange}
                  />
                  <label htmlFor="userName">Username</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="userName"
                    id="userName"
                    value={userToEdit.userName}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    id="email"
                    value={userToEdit.email}
                    onChange={handleChange}
                    disabled
                  />
                  <label htmlFor="bio">Bio:</label>
                  <textarea
                    className={styles.textarea}
                    name="bio"
                    id="bio"
                    value={userToEdit.bio}
                    onChange={handleChange}
                  />
                  <button
                    className={styles.saveButton}
                    type="submit"
                  >
                    Save
                  </button>
                </form>
              </div>
            }
            {
              changePasswordSection &&
              <div className={styles.changePasswordSection}>
                <form
                  className={styles.changePasswordForm}
                >
                  <h3 className={styles.h3}>Change password</h3>
                  <label htmlFor="currentPassword">Current password</label>
                  <input
                    className={styles.input}
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                  />
                  <label htmlFor="newPassword">New password</label>
                  <input
                    className={styles.input}
                    type="password"
                    name="newPassword"
                    id="newPassword"
                  />
                  <label htmlFor="confirmNewPassword">Confirm new password</label>
                  <input
                    className={styles.input}
                    type="password"
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                  />
                  <button
                    className={styles.saveButton}
                    type="submit"
                  >
                    Save
                  </button>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EditProfilePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  await store.dispatch(getUser(params.userName));
});