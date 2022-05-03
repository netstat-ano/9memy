import { useSelector } from "react-redux";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import styles from "./AuthenticationForm.module.scss";
const AuthenticationForm = (props) => {
    const status = useSelector((state) => state.ui.authentication.status);
    return (
        <div className={styles.container}>
            {status === "login" && (
                <LoginForm onClose={props.onClose} isOpen={props.isOpen} />
            )}
            {status === "signup" && (
                <RegistrationForm
                    onClose={props.onClose}
                    isOpen={props.isOpen}
                />
            )}
        </div>
    );
};
export default AuthenticationForm;
