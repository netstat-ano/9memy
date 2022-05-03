import {
    FormControl,
    InputGroup,
    Input,
    InputLeftElement,
    Button,
    ButtonGroup,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/authentication-slice";
import { useRef } from "react";
const LoginForm = (props) => {
    const dispatch = useDispatch();
    const emailRef = useRef();
    const passwordRef = useRef();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(
            logIn({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            })
        );
        props.onClose();
    };
    return (
        <form onSubmit={onSubmitHandler}>
            <FormControl>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={
                            <div className="gray.300">
                                <FontAwesomeIcon icon={faAt} />
                            </div>
                        }
                    />
                    <Input ref={emailRef} placeholder="Adres e-mail" />
                </InputGroup>
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
                        ref={passwordRef}
                        type="password"
                        placeholder="Hasło"
                    />
                </InputGroup>
            </FormControl>
            <ButtonGroup mt={4}>
                <Button type="submit" colorScheme="blue" mr={3}>
                    Zaloguj
                </Button>
                <Button onClick={props.onClose} variant="ghost">
                    Zamknij
                </Button>
            </ButtonGroup>
        </form>
    );
};
export default LoginForm;
