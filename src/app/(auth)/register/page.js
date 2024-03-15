import RegisterForm from "@/components/register/RegisterForm";
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