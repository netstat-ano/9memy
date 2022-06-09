import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Subcomment.module.scss";
import useLikeSystem from "../../hooks/use-like-system";
import Delete from "../Delete/Delete";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
    const user = useSelector((state) => state.authentication.user);
    const onLikeHandler = (event) => {
        setLikes.onLikeHandler();
    };
    const onDislikeHandler = (event) => {
        setLikes.onDislikeHandler();
    };
    console.log(props.subcommentInfo);
    return (
        <div className={styles.container}>
            <div className={styles.username}>
                <NavLink to={`/profile/${props.subcommentInfo.userID}`}>
                    {props.subcommentInfo.displayName}
                </NavLink>
            </div>
            <div>{props.subcommentInfo.content}</div>
            {user.uid === props.subcommentInfo.userID && (
                <Delete
                    setContent={props.setSubcomments}
                    content={props.subcomments}
                    url={`posts/TAG${props.tag}/${postInfo.id}/comments/${commentInfo.id}/comments/${props.subcommentInfo.id}`}
                />
            )}
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
