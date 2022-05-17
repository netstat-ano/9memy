import { Textarea, Button } from "@chakra-ui/react";
import { ref, update } from "firebase/database";
import { useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebase";
import styles from "./SubcommentCreator.module.scss";
const SubcommentCreator = (props) => {
    const { postInfo, commentInfo } = props;
    const [textareaValue, setTextareaValue] = useState("");

    const user = useSelector((state) => state.authentication.user);
    const onInputHandler = (event) => {
        setTextareaValue(event.target.value);
    };
    const onAddSubcommentHandler = (event) => {
        event.preventDefault();
        const updates = {};
        const id = `subcommentID${Math.random().toString(16).slice(2)}`;
        const subcomment = {
            id,
            content: textareaValue,
            likes: 0,
            dislikes: 0,
            displayName: user.displayName,
            userID: user.uid,
        };
        const newSubcomment = {};
        newSubcomment[`${id}`] = subcomment;
        props.setSubcomments((prevState) => [...prevState, newSubcomment]);
        updates[
            `posts/TAG${props.tag}/${postInfo.id}/comments/${commentInfo.id}/comments/${id}`
        ] = subcomment;
        update(ref(database), updates);
    };
    return (
        <div>
            <form onSubmit={onAddSubcommentHandler}>
                <Textarea
                    rows={2}
                    onInput={onInputHandler}
                    value={textareaValue}
                    resize="none"
                />
                <div>
                    <Button type="submit" mt={2} size="sm" colorScheme="green">
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default SubcommentCreator;
