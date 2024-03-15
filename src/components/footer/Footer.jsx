import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Blog-IT!</div>
      <div className={styles.text}>
         Created and Maintained By Aman © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;