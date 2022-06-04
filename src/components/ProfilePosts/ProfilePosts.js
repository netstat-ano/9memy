import { get } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref } from "firebase/database";
import styles from "./ProfilePosts.module.scss";
import Post from "../Post/Post";
const ProfilePosts = (props) => {
    const { uid } = props;
    const [posts, setPosts] = useState([]);
    console.log(posts);
    useEffect(() => {
        setPosts([]);
        const fetchProfilePosts = async () => {
            const snapshot = await get(ref(database, `/posts/`));
            if (snapshot.exists()) {
                const response = snapshot.val();
                console.log(response);
                for (const tag in response) {
                    for (const postID in response[tag]) {
                        const post = response[tag][postID];
                        if (post && post.user.uid === uid) {
                            post.tags = tag.replaceAll("TAG", "");
                            setPosts((prevState) => {
                                for (const index in prevState) {
                                    if (prevState[index].id === post.id) {
                                        return prevState;
                                    }
                                }
                                return [...prevState, post];
                            });
                        }
                    }
                }
            }
        };
        fetchProfilePosts();
    }, []);
    return (
        <div className={styles.container}>
            {posts.map((value) => {
                return (
                    <div className={styles["post-container"]}>
                        <Post
                            allPosts={posts}
                            setFetchedPosts={setPosts}
                            tag={value.tags}
                            postInfo={value}
                        />
                    </div>
                );
            })}
        </div>
    );
};
export default ProfilePosts;
