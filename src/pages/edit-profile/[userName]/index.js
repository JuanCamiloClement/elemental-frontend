import Image from "next/image";
import Layout from "@/components/Layout";
import { useState } from "react";
import profilePic from "@public/profile-pic.jpeg";
import styles from "./edit-profile.module.css";

const EditProfilePage = () => {
  const [profileImageSection, setProfileImageSection] = useState(true);
  const [editPersonalInformationSection, setEditPersonalInformationSection] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const handleShowProfileImageSection = () => {
    setProfileImageSection(true);
    setEditPersonalInformationSection(false);
    setChangePassword(false);
  }

  const handleShowEditPersonalInformationSection = () => {
    setEditPersonalInformationSection(true);
    setProfileImageSection(false);
    setChangePassword(false);
  }

  const handleShowChangePassword = () => {
    setChangePassword(true);
    setEditPersonalInformationSection(false);
    setProfileImageSection(false);
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
                  src={profilePic}
                  alt="Profile picture"
                  width={200}
                  height={200}
                />
                <div className={styles.buttonsContainer}>
                  <button
                    className={styles.uploadButton}
                    type="button"
                  >
                    Upload
                  </button>
                  <button
                    className={styles.removeButton}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            }
            {
              editPersonalInformationSection &&
              <div className={styles.editPersonalInformationSection}>
                <form
                  className={styles.editPersonalInformationForm}
                >
                  <h3 className={styles.h3}>Edit your personal information</h3>
                  <label htmlFor="firstName">First name</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="firstName"
                    id="firstName"
                  />
                  <label htmlFor="lastName">Last name</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="lastName"
                    id="lastName"
                  />
                  <label htmlFor="userName">Username</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="userName"
                    id="userName"
                    disabled
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    id="email"
                    disabled
                  />
                  <label htmlFor="bio">Bio:</label>
                  <textarea
                    className={styles.textarea}
                    name="bio"
                    id="bio"
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
              changePassword &&
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

// export const getServerSideProps = async ({ params }) => {
//   const response = await fetch()
// }