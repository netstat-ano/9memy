import styles from "./Header.module.scss";
import { ButtonGroup, Heading, Button, Stack } from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import Authentication from "../Authentication/Authentication";
import { uiSliceActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/authentication-slice";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Searching from "../Searching/Searching";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                    <Heading size={"lg"}>
                        <NavLink to="/">9memy</NavLink>
                    </Heading>
                </div>
                <div className={styles["right-header"]}>
                    <Searching />
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
                                <div className={styles.profile}>
                                    <NavLink to={`/profile/${user.uid}`}>
                                        <FontAwesomeIcon icon={faUser} />
                                    </NavLink>
                                </div>
                            )}
                            {user && (
                                <NavLink to="/create-post">
                                    <Button colorScheme="blue">
                                        <AddIcon mr={2} />
                                        Stwórz wpis
                                    </Button>
                                </NavLink>
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
