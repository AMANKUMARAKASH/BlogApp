import RegisterForm from "@/components/register/RegisterForm.js";
import styles from "./register.module.css";


const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegisterForm/>
      </div>
    </div>
  );
};

export default RegisterPage;