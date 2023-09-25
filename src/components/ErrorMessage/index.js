import styles from "./errormessage.module.css"

const ErrorMessage = ({ children, buttonFunction }) => {
  return (
    <div className={styles.errorContainer}>
      <h4 className={styles.errorTitle}>An error has ocurred</h4>
      <p className={styles.errorMessage}>{children}</p>
      <button
        className={styles.okButton}
        onClick={buttonFunction}
      >
        OK
      </button>
    </div>
  );
}

export default ErrorMessage;