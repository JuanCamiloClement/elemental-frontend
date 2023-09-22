import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { CgFeed } from "react-icons/cg";
import { IoPersonOutline } from "react-icons/io5";
import { GrUpload } from "react-icons/gr";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <Link className={styles.link} href="/feed">
          <Image
            className={styles.logo}
            src="/elemental-transparent.png"
            alt="Elemental logo"
            width={150}
            height={40}
          />
        </Link>
        <div className={styles.buttonsContainer}>
          <Link className={styles.link} href="/profile">
            <button
              className={styles.profileButton}
              type="button"
            >
              Profile
            </button>
          </Link>
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
          <Link className={styles.link} href="/profile">
            <button
              className={styles.profileIconButton}
              type="button"
            >
              <IoPersonOutline />
            </button>
          </Link>
          <button
            className={styles.button}
            type="button"
          >
            <GrUpload />
          </button>
          <Link className={styles.link} href="/feed">
            <button
              className={styles.button}
              type="button"
            >
              <CgFeed />
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;