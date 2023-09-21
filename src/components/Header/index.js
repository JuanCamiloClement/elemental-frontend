import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { CgFeed } from "react-icons/cg";
import { IoPersonOutline } from "react-icons/io5";
import { GrUpload } from "react-icons/gr";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/elemental-transparent.png"
          alt="Elemental logo"
          width={150}
          height={40}
        />
        <div className={styles.buttonsContainer}>
          <button
            className={styles.profileButton}
            type="button"
          >
            Profile
          </button>
          <div className={styles.searchContainer}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search..."
            />
            <button
              className={styles.searchButton}
              type="button"
            >
              <AiOutlineSearch />
            </button>
          </div>
          <button
            className={styles.searchIconButton}
            type="button"
          >
            <AiOutlineSearch />
          </button>
          <button
            className={styles.profileIconButton}
            type="button"
          >
            <IoPersonOutline />
          </button>
          <button
            className={styles.button}
            type="button"
          >
            <GrUpload />
          </button>
          <button
            className={styles.button}
            type="button"
          >
            <CgFeed />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;