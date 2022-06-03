import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../firebase";
import CommentCreator from "../CommentCreator/CommentCreator";
import Comment from "../Comment/Comment";
import Sort from "../Sort/Sort";
const PostComments = (props) => {
    const { postInfo } = props;
    return (
        <div>
            <CommentCreator
                setComments={props.setComments}
                tag={props.tag}
                postInfo={props.postInfo}
            />
            {props.comments.map((commentInfo) => (
                <Comment
                    setComments={props.setComments}
                    comments={props.comments}
                    tag={props.tag}
                    postInfo={postInfo}
                    commentInfo={commentInfo}
                />
            ))}
        </div>
    );
};
export default PostComments;
