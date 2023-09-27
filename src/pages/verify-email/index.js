import Image from "next/image";
import Footer from "@/components/Footer";
import styles from "./verify-email.module.css"

const VerifyEmailPage = () => {
  return (
    <>
      <header className={styles.header}>
        <Image
          src="/elemental-transparent.png"
          alt="Elemental logo"
          width={150}
          height={40}
        />
      </header>
      <div className={styles.wholeContainer}>
        <h3 className={styles.h3}>Your account has been created</h3>
        <p className={styles.p}>Please press the button in the email we just sent you to verify your account</p>
      </div>
      <Footer />
    </>
  );
}

export default VerifyEmailPage;