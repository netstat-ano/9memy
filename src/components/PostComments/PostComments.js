import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../firebase";
import CommentCreator from "../CommentCreator/CommentCreator";
import Comment from "../Comment/Comment";
import Sort from "../Sort/Sort";
const PostComments = (props) => {
    const { postInfo } = props;
    const [comments, setComments] = useState([]);
    useEffect(() => {
        setComments([]);
        for (const commentID in props.comments) {
            setComments((prevState) => {
                return [...prevState, props.comments[`${commentID}`]];
            });
        }
    }, [props.comments]);

    return (
        <div>
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
