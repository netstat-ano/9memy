import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Subcomment.module.scss";
import useLikeSystem from "../../hooks/use-like-system";
const Subcomment = (props) => {
    const { postInfo, commentInfo } = props;
    const [likes, setLikes] = useLikeSystem({
        likes: props.subcommentInfo.likes,
        dislikes: props.subcommentInfo.dislikes,
        url: `${postInfo.id}/comments/${commentInfo.id}/comments/${props.subcommentInfo.id}`,
        id: props.subcommentInfo.id,
        tag: props.tag,
        data: props.subcommentInfo,
    });
    const onLikeHandler = (event) => {
        setLikes.onLikeHandler();
    };
    const onDislikeHandler = (event) => {
        setLikes.onDislikeHandler();
    };
    return (
        <div className={styles.container}>
            <div>{props.subcommentInfo.displayName}</div>
            <div>{props.subcommentInfo.content}</div>
            <div>
                <FontAwesomeIcon
                    onClick={onLikeHandler}
                    className={styles.action}
                    icon={faThumbsUp}
                />
                <div className={styles["quantity-label"]}>{likes.likes}</div>
                <FontAwesomeIcon
                    onClick={onDislikeHandler}
                    className={styles.action}
                    icon={faThumbsDown}
                />
                <div className={styles["quantity-label"]}>{likes.dislikes}</div>
            </div>
        </div>
    );
};
export default Subcomment;
