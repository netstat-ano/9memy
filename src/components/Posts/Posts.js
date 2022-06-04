import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../firebase";
import styles from "./Posts.module.scss";
import Post from "../Post/Post";
const Posts = (props) => {
    const params = useParams();
    const [fetchedPosts, setFetchedPosts] = useState([]);
    useEffect(() => {
        get(ref(database), `posts/TAG${params.tag}`).then((snapshot) => {
            for (const id in snapshot.val().posts[`TAG${params.tag}`]) {
                setFetchedPosts((prevState) => [
                    ...prevState,
                    snapshot.val().posts[`TAG${params.tag}`][id],
                ]);
            }
        });
    }, [props.tag]);
    console.log(fetchedPosts);
    return (
        <div className={styles.container}>
            {fetchedPosts.map((postInfo) => {
                return (
                    <Post
                        setFetchedPosts={setFetchedPosts}
                        allPosts={fetchedPosts}
                        tag={params.tag}
                        key={postInfo.id}
                        postInfo={postInfo}
                    />
                );
            })}
        </div>
    );
};
export default Posts;
