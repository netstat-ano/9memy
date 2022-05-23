import { useEffect, useState } from "react";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { storage } from "../../firebase";
import styles from "./Post.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThumbsUp,
    faThumbsDown,
    faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Heading, Text } from "@chakra-ui/react";
import PostComments from "../PostComments/PostComments";
import useLikeSystem from "../../hooks/use-like-system";
import Delete from "../Delete/Delete";
import { useSelector } from "react-redux";
const Post = (props) => {
    const [fetchedMeme, setFetchedMeme] = useState(null);
    const [isCommentSectionActive, setIsCommentSectionActive] = useState(false);
    const user = useSelector((state) => state.authentication.user);
    const { postInfo } = props;

    const [likes, setLikes] = useLikeSystem({
        url: postInfo.id,
        id: postInfo.id,
        likes: postInfo.likes,
        dislikes: postInfo.dislikes,
        tag: props.tag,
        data: postInfo,
    });
    const [comments, setComments] = useState({ ...postInfo.comments });
    const onLikeHandler = () => {
        setLikes.onLikeHandler();
    };
    console.log(postInfo);
    const onDislikeHandler = () => {
        setLikes.onDislikeHandler();
    };
    const onCommentsClickHandler = () => {
        setIsCommentSectionActive((state) => !state);
    };
    useEffect(() => {
        getDownloadURL(sRef(storage, `memes/${postInfo.id}`)).then((url) => {
            setFetchedMeme(url);
        });
    }, [postInfo.id]);
    const date = new Date(postInfo.date);
    return (
        <div className={styles.container}>
            <div>
                <Heading mb={2} fontSize="xl">
                    {postInfo.title}
                </Heading>
                <Text>{postInfo.user.displayName}</Text>
                <div className={styles.date}>{`${date.getDate()}.${
                    date.getMonth() + 1
                }.${date.getFullYear()}`}</div>
                <img className={styles.meme} src={fetchedMeme}></img>
                {user.uid === postInfo.user.uid && (
                    <Delete
                        setContent={props.setFetchedPosts}
                        content={props.allPosts}
                        url={`posts/TAG${props.tag}/${postInfo.id}`}
                    />
                )}
                <div className={styles["actions-container"]}>
                    <div>
                        <FontAwesomeIcon
                            onClick={onLikeHandler}
                            className={styles.action}
                            icon={faThumbsUp}
                        />
                        <div className={styles.label}>{likes.likes}</div>
                        <FontAwesomeIcon
                            onClick={onDislikeHandler}
                            className={styles.action}
                            icon={faThumbsDown}
                        />
                        <div className={styles.label}>{likes.dislikes}</div>
                    </div>
                    <div className={styles["comment-icon"]}>
                        <FontAwesomeIcon
                            onClick={onCommentsClickHandler}
                            className={styles.action}
                            icon={faComment}
                        />
                        <div className={styles.label}>
                            {postInfo.comments !== 0
                                ? Object.keys(comments).length
                                : 0}
                        </div>
                    </div>
                </div>
                {isCommentSectionActive && (
                    <PostComments
                        setComments={setComments}
                        comments={comments}
                        tag={props.tag}
                        postInfo={postInfo}
                    />
                )}
            </div>
        </div>
    );
};
export default Post;
