import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";
import { useDisclosure } from "@chakra-ui/react";
import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";
import { useSelector } from "react-redux";
const Authentication = (props) => {
    const status = useSelector((state) => state.ui.authentication.status);
    let title = null;
    let action = { mainAction: null, secondaryAction: "Zamknij" };
    if (status === "signup") {
        title = "Rejestracja";
        action.mainAction = "Zarejestruj się";
    } else if (status === "login") {
        title = "Logowanie";
        action.mainAction = "Zaloguj się";
    }
    return (
        <ModalWrapper
            mainAction={action.mainAction}
            secondaryAction={action.secondaryAction}
            modalTitle={title}
            modalBody={<AuthenticationForm />}
            isOpen={props.isOpen}
            onClose={props.onClose}
        />
    );
};
export default Authentication;
