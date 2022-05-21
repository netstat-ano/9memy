import { Select, Stack } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./Sort.module.scss";
const Sort = (props) => {
    const onChangeHandler = (event) => {
        props.setSortType(event.target.value);
    };
    return (
        <div>
            <div>Sort by: </div>
            <Select
                onChange={onChangeHandler}
                size="sm"
                className={styles.select}
            >
                <option>Date (from the latest)</option>
                <option>Date (from the oldest)</option>
                <option>Likes (ascending)</option>
                <option>Likes (descending)</option>
            </Select>
        </div>
    );
};
export default Sort;
