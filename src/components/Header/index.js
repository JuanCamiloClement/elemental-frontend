import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import { CgFeed } from "react-icons/cg";
import { IoPersonOutline } from "react-icons/io5";
import { GrUpload } from "react-icons/gr";
import styles from "./Header.module.css";

const Header = () => {
  const router = useRouter();

  const userName = localStorage.getItem('userName');

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <Link className={styles.link} href={`/feed/${userName}`}>
          <Image
            className={styles.logo}
            src="/elemental-transparent.png"
            alt="Elemental logo"
            width={150}
            height={40}
          />
        </Link>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.profileButton}
            type="button"
            onClick={() => router.push(`/profile/${userName}`)}
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
            onClick={() => router.push(`/profile/${userName}`)}
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
            onClick={() => router.push(`/feed/${userName}`)}
          >
            <CgFeed />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;