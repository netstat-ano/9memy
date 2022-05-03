import styles from "./Header.module.scss";
import { ButtonGroup, Heading, Button, Stack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import Authentication from "../Authentication/Authentication";
import { uiSliceActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/authentication-slice";
const Header = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useSelector((state) => state.authentication.user);
    const dispatch = useDispatch();
    const onLogoutHandler = (event) => {
        dispatch(logOut());
    };
    const onLoginHandler = () => {
        onOpen();
        dispatch(uiSliceActions.changeStatus("login"));
    };
    const onSignUpHandler = () => {
        onOpen();
        dispatch(uiSliceActions.changeStatus("signup"));
    };
    return (
        <header>
            <div className={styles.header}>
                <div>
                    <Heading size={"lg"}>9memy</Heading>
                </div>
                <div className={styles["right-header"]}>
                    <div>
                        <SearchIcon />
                    </div>
                    <div>
                        <ButtonGroup
                            className={styles["button-container"]}
                            size="sm"
                            spacing={4}
                        >
                            {!user && (
                                <>
                                    <Button
                                        onClick={onLoginHandler}
                                        colorScheme="green"
                                    >
                                        Zaloguj się
                                    </Button>
                                    <Button
                                        onClick={onSignUpHandler}
                                        colorScheme="blue"
                                    >
                                        Zarejestruj się
                                    </Button>
                                </>
                            )}
                            {user && (
                                <Button
                                    onClick={onLogoutHandler}
                                    colorScheme="red"
                                >
                                    Wyloguj się
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <Authentication isOpen={isOpen} onClose={onClose} />
        </header>
    );
};
export default Header;
