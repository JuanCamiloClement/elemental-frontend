import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import profilePic from "@public/profile-pic.jpeg";
import styles from "./searchItem.module.css";

const SearchItem = ({ image, firstName, lastName, userName }) => {
  const cookies = new Cookies();
  return (
    <div className={styles.wholeContainer}>
      <Link className={styles.link} href={userName === cookies.get('userName') ? `/my-profile/${userName}` : `/profile/${userName}`}>
        <div className={styles.searchItemContainer}>
          <Image
            className={styles.image}
            src={image || profilePic}
            alt="Search result profile picture"
            width={50}
            height={50}
          />
          <p className={styles.name}>
            {firstName} {lastName}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default SearchItem;