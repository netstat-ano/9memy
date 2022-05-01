import {
    FormControl,
    InputGroup,
    Input,
    InputLeftElement,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
const LoginForm = (props) => {
    return (
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
                <Input placeholder="Adres e-mail" />
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
                <Input type="password" placeholder="Hasło" />
            </InputGroup>
        </FormControl>
    );
};
export default LoginForm;
