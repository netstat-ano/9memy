import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import styles from "./Searching.module.scss";
import { useHistory } from "react-router-dom";
const Searching = (props) => {
    const [isSearchingActive, setIsSearchingActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const history = useHistory();
    const onSearchIconHandler = (event) => {
        setIsSearchingActive((state) => !state);
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const searchingTag = inputValue.replace("#", "");
        history.push(`/tag/${searchingTag}`);
    };
    const onInputHandler = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <>
            {isSearchingActive && (
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <Input
                            onInput={onInputHandler}
                            value={inputValue}
                            size="sm"
                        ></Input>
                    </div>
                    <button className={styles.submit} type="submit"></button>
                </form>
            )}
            <div>
                <SearchIcon onClick={onSearchIconHandler} />
            </div>
        </>
    );
};
export default Searching;
