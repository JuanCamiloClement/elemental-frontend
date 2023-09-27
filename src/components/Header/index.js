import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useContext } from "react";
import { LoggedUserContext } from "@/contextStore/LoggedUserContext";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import { CgFeed } from "react-icons/cg";
import { IoPersonOutline } from "react-icons/io5";
import { GrUpload } from "react-icons/gr";
import styles from "./Header.module.css";

const Header = () => {
  const cookies = new Cookies();
  const router = useRouter();

  const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);

  const handleLogout = () => {
    setLoggedUser({
      token: '',
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
    });
    cookies.remove('token', { path: "/" });
    cookies.remove('firstName', { path: "/" });
    cookies.remove('lastName', { path: "/" });
    cookies.remove('userName', { path: "/" });
    cookies.remove('email', { path: "/" });
    router.push('/login');
  }

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <Link className={styles.link} href={`/feed/${loggedUser.userName}`}>
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
            onClick={() => router.push(`/profile/${loggedUser.userName}`)}
          >
            Profile
          </button>
          <button
            className={styles.profileButton}
            type="button"
            onClick={handleLogout}
          >
            Sign out
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
            onClick={() => router.push(`/profile/${loggedUser.userName}`)}
          >
            <IoPersonOutline />
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={() => router.push('/create-post')}
          >
            <GrUpload />
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={() => router.push(`/feed/${loggedUser.userName}`)}
          >
            <CgFeed />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;