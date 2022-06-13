import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
    useHistory,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { database } from "../../firebase";
import Post from "../Post/Post";

const PostDetail = (props) => {
    const params = useParams();
    const { tag, postID } = params;
    const history = useHistory();
    const [post, setPost] = useState([]);
    const onDeleteHandler = () => {
        history.push("/");
    };
    useEffect(() => {
        const fetchProfile = async () => {
            const urlTag = `TAG${tag}`;
            const snapshot = await get(
                ref(database, `/posts/${urlTag}/${postID}`)
            );
            if (snapshot.exists()) {
                const response = snapshot.val();
                setPost([response]);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div>
            {post.map((details) => {
                return (
                    <Post
                        setFetchedPosts={setPost}
                        allPosts={post}
                        tag={tag}
                        key={details.id}
                        postInfo={details}
                        onDelete={onDeleteHandler}
                    />
                );
            })}
        </div>
    );
};
export default PostDetail;
