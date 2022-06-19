import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import styles from "./Searching.module.scss";
import { useHistory } from "react-router-dom";
import { get, ref } from "firebase/database";
import { database } from "../../firebase";
const Searching = (props) => {
    const [isSearchingActive, setIsSearchingActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const history = useHistory();
    const onSearchIconHandler = (event) => {
        setIsSearchingActive((state) => !state);
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (inputValue.includes("#")) {
            const searchingTag = inputValue.replace("#", "");
            history.push(`/tag/${searchingTag}`);
        }
        if (inputValue.includes("@")) {
            const fetchID = async () => {
                const searchingUser = inputValue.replace("@", "");
                const snapshot = await get(ref(database, `/`));
                if (snapshot.exists()) {
                    const response = snapshot.val();
                    for (const id in response) {
                        if (id !== "posts") {
                            if (response[id].displayName === searchingUser) {
                                history.push(`/profile/${id}`);
                            }
                        }
                    }
                }
            };
            fetchID();
        }
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
