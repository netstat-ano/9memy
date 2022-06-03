import {
    FormControl,
    InputGroup,
    Input,
    InputLeftElement,
    FormErrorMessage,
    Button,
    ButtonGroup,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { signUp } from "../../store/authentication-slice";
import { useReducer, useRef } from "react";
import { useDispatch } from "react-redux";
const RegistrationForm = (props) => {
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const retypePasswordRef = useRef();
    const errorReducer = (state, action) => {
        if (action.type === "email") {
            if (
                !emailRef.current.value.includes("@") &&
                !emailRef.current.value.includes(".")
            ) {
                state.email = "Nieprawidłowy email";
            } else {
                state.email = null;
            }
        } else if (action.type === "username") {
            if (!(usernameRef.current.value.trim().length > 4)) {
                state.username = "Za krótka nazwa użytkownika";
            } else {
                state.username = null;
            }
        } else if (action.type === "password") {
            if (!(passwordRef.current.value.trim().length > 7)) {
                state.password = "Twoje hasło musi mieć conajmniej 8 znaków";
            } else {
                state.password = null;
            }
        } else if (action.type === "retypePassword") {
            if (
                !(retypePasswordRef.current.value === passwordRef.current.value)
            ) {
                state.retypePassword = "Hasła muszą być takie same";
            } else {
                state.retypePassword = null;
            }
        }
        return { ...state };
    };
    const [error, dispatchError] = useReducer(errorReducer, {
        email: true,
        username: true,
        password: true,
        retypePassword: true,
    });
    const dispatch = useDispatch();
    const onChangeHandler = (event) => {
        dispatchError({ type: event.target.id });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (
            !error.mail &&
            !error.username &&
            !error.password &&
            !error.retypePassword
        ) {
            dispatch(
                signUp({
                    password: passwordRef.current.value,
                    email: emailRef.current.value,
                    username: usernameRef.current.value,
                })
            );
            props.onClose();
        }
    };
    return (
        <form onSubmit={onSubmitHandler}>
            <FormControl isInvalid={error.email}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={
                            <div className="gray.300">
                                <FontAwesomeIcon icon={faAt} />
                            </div>
                        }
                    />
                    <Input
                        id="email"
                        onInput={onChangeHandler}
                        ref={emailRef}
                        placeholder="Adres e-mail"
                    />
                </InputGroup>
                {error.email && (
                    <FormErrorMessage>{error.email}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={error.username}>
                <InputGroup mt={3}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={
                            <div className="gray.300">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        }
                    />
                    <Input
                        onInput={onChangeHandler}
                        ref={usernameRef}
                        id="username"
                        type="text"
                        placeholder="Nazwa użytkownika"
                    />
                </InputGroup>
                {error.username && (
                    <FormErrorMessage>{error.username}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={error.password}>
                <InputGroup mt={3}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={
                            <div className="gray.300">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                        }
                    />
                    <Input
                        onInput={onChangeHandler}
                        id="password"
                        ref={passwordRef}
                        type="password"
                        placeholder="Hasło"
                    />
                </InputGroup>
                {error.password && (
                    <FormErrorMessage>{error.password}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={error.retypePassword}>
                <InputGroup mt={3}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={
                            <div className="gray.300">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                        }
                    />
                    <Input
                        onInput={onChangeHandler}
                        id="retypePassword"
                        ref={retypePasswordRef}
                        type="password"
                        placeholder="Powtórz hasło"
                    />
                </InputGroup>
                {error.retypePassword && (
                    <FormErrorMessage>{error.retypePassword}</FormErrorMessage>
                )}
            </FormControl>
            <ButtonGroup mt={4}>
                <Button type="submit" colorScheme="blue" mr={3}>
                    Zarejestruj
                </Button>
                <Button onClick={props.onClose} variant="ghost">
                    Zamknij
                </Button>
            </ButtonGroup>
        </form>
    );
};
export default RegistrationForm;
