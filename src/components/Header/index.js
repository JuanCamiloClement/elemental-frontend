import Image from "next/image";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import { CgFeed } from "react-icons/cg";
import { IoPersonOutline } from "react-icons/io5";
import { GrUpload } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi"
import styles from "./Header.module.css";
import { useState } from "react";

const Header = () => {
  const cookies = new Cookies();
  const router = useRouter();

  const [search, setSearch] = useState('');

  const handleLogout = () => {
    cookies.remove('token', { path: "/" });
    cookies.remove('firstName', { path: "/" });
    cookies.remove('lastName', { path: "/" });
    cookies.remove('userName', { path: "/" });
    cookies.remove('email', { path: "/" });
    cookies.remove('follows', { path: "/" });
    cookies.remove('followers', { path: "/" });
    cookies.remove('likes', { path: "/" });

    router.push('/login');
  }

  const handleNavigationToProfile = () => {
    router.push(`/profile/${cookies.get('userName')}`)
  }

  const handleNavigationToFeed = () => {
    router.push(`/feed/${cookies.get('userName')}`)
  }

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/elemental-transparent.png"
          alt="Elemental logo"
          width={150}
          height={40}
          onClick={handleNavigationToFeed}
        />
        <div className={styles.buttonsContainer}>
          <button
            className={styles.profileButton}
            type="button"
            onClick={handleNavigationToProfile}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className={styles.searchButton}
              type="button"
              onClick={() => router.push({
                pathname: '/search-results',
                query: { searched: search }
              })}
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
            onClick={handleNavigationToProfile}
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
            onClick={handleNavigationToFeed}
          >
            <CgFeed />
          </button>
          <button
            className={styles.logoutIconButton}
            type="button"
            onClick={handleLogout}
          >
            <FiLogOut />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;