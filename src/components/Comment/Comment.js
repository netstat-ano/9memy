import styles from "./Comment.module.scss";
import {
    faThumbsUp,
    faThumbsDown,
    faComment,
} from "@fortawesome/free-solid-svg-icons";
import Subcomments from "../Subcomments/Subcomments";
import useLikeSystem from "../../hooks/use-like-system";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Delete from "../Delete/Delete";
import { useSelector } from "react-redux";
const Comment = (props) => {
    const { postInfo, commentInfo } = props;
    const [isCommentActive, setIsCommentActive] = useState(false);
    const [likes, setLikes] = useLikeSystem({
        likes: commentInfo.likes,
        dislikes: commentInfo.dislikes,
        url: `${postInfo.id}/comments/${commentInfo.id}`,
        id: commentInfo.id,
        tag: props.tag,
        data: commentInfo,
    });
    const user = useSelector((state) => state.authentication.user);
    const onLikeHandler = (event) => {
        setLikes.onLikeHandler();
    };
    const onDislikeHandler = (event) => {
        setLikes.onDislikeHandler();
    };
    const onCommentClickHandler = (event) => {
        setIsCommentActive((state) => !state);
    };
    const date = new Date(commentInfo.date);
    return (
        <div className={styles.container}>
            <div className={styles.username}>{commentInfo.displayName}</div>
            <div className={styles.date}>
                {`${date.getDate()}.${
                    date.getMonth() + 1
                }.${date.getFullYear()}`}
            </div>
            <div className={styles.content}>{commentInfo.content}</div>
            {user.uid === commentInfo.userID && (
                <Delete
                    setContent={props.setComments}
                    content={props.comments}
                    url={`posts/TAG${props.tag}/${postInfo.id}/comments/${commentInfo.id}`}
                />
            )}
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
                <FontAwesomeIcon
                    onClick={onCommentClickHandler}
                    className={styles.comment}
                    icon={faComment}
                />
                <div className={styles["quantity-label"]}>
                    {commentInfo.comments
                        ? Object.keys(commentInfo.comments).length
                        : 0}
                </div>
            </div>
            {isCommentActive && (
                <Subcomments
                    tag={props.tag}
                    postInfo={postInfo}
                    commentInfo={commentInfo}
                />
            )}
        </div>
    );
};
export default Comment;
