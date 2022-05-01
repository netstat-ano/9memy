import styles from "./Header.module.scss";
import { ButtonGroup, Heading, Button, Stack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import Authentication from "../Authentication/Authentication";
import { uiSliceActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
const Header = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
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
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <Authentication isOpen={isOpen} onClose={onClose} />
        </header>
    );
};
export default Header;
