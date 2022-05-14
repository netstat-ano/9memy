import styles from "./Comment.module.scss";
import {
    faThumbsUp,
    faThumbsDown,
    faComment,
} from "@fortawesome/free-solid-svg-icons";
import useLikeSystem from "../../hooks/use-like-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Comment = (props) => {
    const { postInfo, commentInfo } = props;
    console.log(props.commentInfo);
    const [likes, setLikes] = useLikeSystem({
        likes: commentInfo.likes,
        dislikes: commentInfo.dislikes,
        url: `${postInfo.id}/comments/${commentInfo.id}`,
        id: commentInfo.id,
        tag: props.tag,
        data: commentInfo,
    });
    const onLikeHandler = (event) => {
        setLikes.onLikeHandler();
    };
    const onDislikeHandler = (event) => {
        setLikes.onDislikeHandler();
    };
    return (
        <div className={styles.container}>
            <div className={styles.username}>{commentInfo.displayName}</div>
            <div className={styles.content}>{commentInfo.content}</div>
            <div>
                <FontAwesomeIcon
                    onClick={onLikeHandler}
                    className={styles.like}
                    icon={faThumbsUp}
                />
                <div className={styles["quantity-label"]}>{likes.likes}</div>
                <FontAwesomeIcon
                    onClick={onDislikeHandler}
                    className={styles.dislike}
                    icon={faThumbsDown}
                />
                <div className={styles["quantity-label"]}>{likes.dislikes}</div>
                <FontAwesomeIcon className={styles.comment} icon={faComment} />
            </div>
        </div>
    );
};
export default Comment;
