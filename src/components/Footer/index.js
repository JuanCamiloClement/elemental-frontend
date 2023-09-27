import Image from "next/image";
import { AiOutlineCopyright } from "react-icons/ai";
import logo from "@public/elemental-transparent.png";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.toRow}>
        <Image
          className={styles.logo}
          src={logo}
          alt="Elemental logo"
          width={150}
          height={40}
        />
        <div className={styles.linksContainer}>
          <p className={styles.p}>About</p>
          <p className={styles.p}>Sign up</p>
          <p className={styles.p}>Log in</p>
        </div>
      </div>
      <p className={styles.p}>Elemental <AiOutlineCopyright /> 2023</p>
    </footer>
  );
}

export default Footer;