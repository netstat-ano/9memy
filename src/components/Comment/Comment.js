import styles from "./Comment.module.scss";
import {
    faThumbsUp,
    faThumbsDown,
    faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Comment = (props) => {
    console.log(props.commentInfo);
    const onLikeHandler = (event) => {};
    const onDislikeHandler = (event) => {};
    return (
        <div className={styles.container}>
            <div className={styles.username}>
                {props.commentInfo.displayName}
            </div>
            <div className={styles.content}>{props.commentInfo.content}</div>
            <div>
                <FontAwesomeIcon
                    onClick={onLikeHandler}
                    className={styles.like}
                    icon={faThumbsUp}
                />
                <FontAwesomeIcon
                    onClick={onDislikeHandler}
                    className={styles.dislike}
                    icon={faThumbsDown}
                />
                <FontAwesomeIcon className={styles.comment} icon={faComment} />
            </div>
        </div>
    );
};
export default Comment;
