import styles from "./Header.module.scss";
import { ButtonGroup, Heading, Button, Stack } from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import Authentication from "../Authentication/Authentication";
import { uiSliceActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/authentication-slice";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const Header = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSearchingActive, setIsSearchingActive] = useState(false);
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

    const onSearchIconHandler = (event) => {
        setIsSearchingActive((state) => !state);
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
                    {isSearchingActive && (
                        <div>
                            <Input></Input>
                        </div>
                    )}
                    <div>
                        <SearchIcon onClick={onSearchIconHandler} />
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
