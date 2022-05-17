import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Subcomment.module.scss";
import useLikeSystem from "../../hooks/use-like-system";
const Subcomment = (props) => {
    const { postInfo, commentInfo } = props;
    let subcommentInfo = null;
    for (const element in props.subcommentInfo) {
        subcommentInfo = props.subcommentInfo[`${element}`];
    }
    console.log(subcommentInfo);
    const [likes, setLikes] = useLikeSystem({
        likes: subcommentInfo.likes,
        dislikes: subcommentInfo.dislikes,
        url: `${postInfo.id}/comments/${commentInfo.id}/comments/${subcommentInfo.id}`,
        id: subcommentInfo.id,
        tag: props.tag,
        data: subcommentInfo,
    });
    const onLikeHandler = (event) => {
        setLikes.onLikeHandler();
    };
    const onDislikeHandler = (event) => {
        setLikes.onDislikeHandler();
    };
    return (
        <div className={styles.container}>
            <div>{subcommentInfo.displayName}</div>
            <div>{subcommentInfo.content}</div>
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
