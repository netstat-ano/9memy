import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../firebase";
import CommentCreator from "../CommentCreator/CommentCreator";
import Comment from "../Comment/Comment";
import Sort from "../Sort/Sort";
const PostComments = (props) => {
    const { postInfo } = props;
    const [comments, setComments] = useState([]);
    const [sortType, setSortType] = useState("Date (from the latest)");
    useEffect(() => {
        setComments([]);
        for (const commentID in props.comments) {
            setComments((prevState) => {
                return [...prevState, props.comments[`${commentID}`]];
            });
        }
    }, [props.comments]);
    useEffect(() => {
        if (comments.length > 1) {
            if (sortType === "Date (from the latest)") {
                setComments((prevState) => {
                    const newState = prevState.sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                    );

                    return [...newState];
                });
            } else if (sortType === "Date (from the oldest)") {
                setComments((prevState) => {
                    const newState = prevState.sort(
                        (a, b) => new Date(b.date) - new Date(a.date)
                    );

                    return [...newState];
                });
            } else if (sortType === "Likes (ascending)") {
                setComments((prevState) => {
                    return prevState.sort((a, b) => a.likes - b.likes);
                });
            } else if (sortType === "Likes (descending)") {
                setComments((prevState) => {
                    return prevState.sort((a, b) => b.likes - a.likes);
                });
            }
        }
    }, [sortType]);
    console.log(comments);
    return (
        <div>
            <Sort sortType={sortType} setSortType={setSortType} />
            <CommentCreator
                setComments={props.setComments}
                tag={props.tag}
                postInfo={props.postInfo}
            />
            {comments.map((commentInfo) => (
                <Comment
                    tag={props.tag}
                    postInfo={postInfo}
                    commentInfo={commentInfo}
                />
            ))}
        </div>
    );
};
export default PostComments;
