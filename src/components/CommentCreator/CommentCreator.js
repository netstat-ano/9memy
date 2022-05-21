import { Button, Textarea } from "@chakra-ui/react";
import { ref, update } from "firebase/database";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebase";
import styles from "./CommentCreator.module.scss";
const CommentCreator = (props) => {
    const { postInfo } = props;
    const [textareaValue, setTextareaValue] = useState("");
    const user = useSelector((state) => state.authentication.user);
    const onInputHandler = (event) => {
        setTextareaValue(event.target.value);
    };
    const onAddCommentHandler = async (event) => {
        event.preventDefault();
        const updates = {};
        const id = "commentID" + Math.random().toString(16).slice(2);
        const comment = {
            displayName: user.displayName,
            userID: user.uid,
            content: textareaValue,
            id,
            likes: 0,
            dislikes: 0,
            date: new Date(),
        };
        updates[`posts/TAG${props.tag}/${postInfo.id}/comments/${id}`] =
            comment;
        await update(ref(database), updates);
        props.setComments((state) => {
            state[`comment${id}`] = comment;
            return { ...state };
        });
        setTextareaValue("");
    };
    return (
        <div>
            <form onSubmit={onAddCommentHandler}>
                <Textarea
                    onInput={onInputHandler}
                    value={textareaValue}
                    className={styles.textarea}
                    resize="none"
                />
                <div className={styles["button-container"]}>
                    <Button type="submit" mt={2} size="sm" colorScheme="green">
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default CommentCreator;
