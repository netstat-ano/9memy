import { useEffect, useState } from "react";
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { database, storage } from "../../firebase";
import styles from "./Post.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThumbsUp,
    faThumbsDown,
    faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Heading, Text } from "@chakra-ui/react";
import { update, ref, get } from "firebase/database";
import { updateUserData } from "../../store/authentication-slice";
import { useDispatch, useSelector } from "react-redux";
import PostComments from "../PostComments/PostComments";
let isInitial = true;
const Post = (props) => {
    const [fetchedMeme, setFetchedMeme] = useState(null);
    const [isCommentSectionActive, setIsCommentSectionActive] = useState(false);
    const { postInfo } = props;
    const user = useSelector((state) => state.authentication.user);
    const [likes, setLikes] = useState(postInfo.likes);
    const [dislikes, setDislikes] = useState(postInfo.dislikes);
    const [likeStatus, setLikeStatus] = useState(null);
    const userData = useSelector((state) => state.authentication.userData);
    console.log(likeStatus);
    const dispatch = useDispatch();
    const onCommentsClickHandler = () => {
        setIsCommentSectionActive((state) => !state);
    };
    useEffect(() => {
        getDownloadURL(sRef(storage, `memes/${postInfo.id}`)).then((url) => {
            setFetchedMeme(url);
        });
    }, []);
    useEffect(() => {
        const fetchLikes = async () => {
            const snapshot = await get(ref(database, `/${user.uid}`));
            if (snapshot.exists()) {
                const response = snapshot.val();
                if (response.liked) {
                    for (const id in response.liked) {
                        if (id === postInfo.id) {
                            setLikeStatus("like");
                        }
                    }
                }
                if (response.disliked) {
                    for (const id in response.disliked) {
                        if (id === postInfo.id) {
                            setLikeStatus("dislike");
                        }
                    }
                }
            }
        };
        fetchLikes();
    }, []);
    useEffect(() => {
        if (!isInitial) {
            const updates = {};
            updates[`/posts/TAG${props.tag}/${postInfo.id}`] = {
                ...postInfo,
                likes,
                dislikes,
            };
            update(ref(database), updates);
            return;
        }
        isInitial = false;
    }, [likes, dislikes]);
    const onLikeHandler = (event) => {
        if (!likeStatus) {
            setLikes((prevState) => prevState + 1);
            setLikeStatus("like");
            const data = {};
            data[`${postInfo.id}`] = postInfo.id;
            dispatch(updateUserData({ url: "liked/", data }));
        }
        if (likeStatus === "like") {
            setLikes((prevState) => prevState - 1);
            setLikeStatus(null);
            const data = {};
            data[`${postInfo.id}`] = null;
            dispatch(updateUserData({ url: "liked/", data }));
        }
        if (likeStatus === "dislike") {
            setLikes((prevState) => prevState + 1);
            setDislikes((prevState) => prevState - 1);
            setLikeStatus("like");

            const dataLiked = {};
            dataLiked[`${postInfo.id}`] = postInfo.id;
            dispatch(updateUserData({ url: "liked/", data: dataLiked }));
            const dataDisliked = {};
            dataDisliked[`${postInfo.id}`] = null;
            dispatch(updateUserData({ url: "disliked/", data: dataDisliked }));
        }
    };
    const onDislikeHandler = (event) => {
        if (!likeStatus) {
            setDislikes((prevState) => prevState + 1);
            setLikeStatus("dislike");

            const data = {};
            data[`${postInfo.id}`] = postInfo.id;
            dispatch(updateUserData({ url: "disliked/", data }));
        }
        if (likeStatus === "dislike") {
            setDislikes((prevState) => prevState - 1);
            setLikeStatus(null);

            const data = {};
            data[`${postInfo.id}`] = null;
            dispatch(updateUserData({ url: "disliked/", data }));
        }
        if (likeStatus === "like") {
            setLikes((prevState) => prevState - 1);
            setDislikes((prevState) => prevState + 1);
            setLikeStatus("dislike");
            const dataLiked = {};
            dataLiked[`${postInfo.id}`] = null;
            dispatch(updateUserData({ url: "liked/", data: dataLiked }));
            const dataDisliked = {};
            dataDisliked[`${postInfo.id}`] = postInfo.id;
            dispatch(updateUserData({ url: "disliked/", data: dataDisliked }));
        }
    };
    return (
        <div>
            <div className={styles.container}>
                <div>
                    <Heading mb={2} fontSize="xl">
                        {postInfo.title}
                    </Heading>
                    <Text>{postInfo.user.displayName}</Text>
                    <img className={styles.meme} src={fetchedMeme}></img>
                    <div className={styles["actions-container"]}>
                        <div className={styles["likes-label"]}>{likes}</div>
                        <div className={styles["dislikes-label"]}>
                            {dislikes}
                        </div>
                        <div className={styles["comments-label"]}>
                            {postInfo.comments}
                        </div>
                        <div>
                            <FontAwesomeIcon
                                onClick={onLikeHandler}
                                className={`${styles.padding} ${styles.action}`}
                                icon={faThumbsUp}
                            />
                            <FontAwesomeIcon
                                onClick={onDislikeHandler}
                                className={styles.action}
                                icon={faThumbsDown}
                            />
                        </div>
                        <div className={styles["comment-icon"]}>
                            <FontAwesomeIcon
                                onClick={onCommentsClickHandler}
                                className={styles.action}
                                icon={faComment}
                            />
                        </div>
                    </div>
                </div>
                {isCommentSectionActive && <PostComments />}
            </div>
        </div>
    );
};
export default Post;
