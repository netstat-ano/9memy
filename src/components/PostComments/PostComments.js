import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../firebase";
import CommentCreator from "../CommentCreator/CommentCreator";
import Comment from "../Comment/Comment";
const PostComments = (props) => {
    const { postInfo } = props;
    const comments = [];
    for (const commentID in props.comments) {
        comments.push(props.comments[`${commentID}`]);
    }
    // useEffect(() => {
    //     const fetchComments = async () => {
    //         const snapshot = await get(
    //             ref(database, `/posts/TAG${props.tag}/${postInfo.id}/comments`)
    //         );
    //         const response = snapshot.val();
    //         console.log(response);
    //     };
    // }, []);
    return (
        <div>
            <CommentCreator
                setComments={props.setComments}
                tag={props.tag}
                postInfo={props.postInfo}
            />
            {comments.map((commentInfo) => (
                <Comment commentInfo={commentInfo} />
            ))}
        </div>
    );
};
export default PostComments;
