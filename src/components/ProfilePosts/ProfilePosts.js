import { get } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref } from "firebase/database";
import styles from "./ProfilePosts.module.scss";
import Post from "../Post/Post";
const ProfilePosts = (props) => {
    const { uid } = props;
    const [posts, setPosts] = useState([]);
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
                                return [...prevState, post];
                            });
                        }
                    }
                }
            }
        };
        fetchProfilePosts();
    }, []);
    console.log(posts);
    return (
        <div>
            {posts.map((value) => {
                console.log(value.tags);
                return (
                    <div className={styles.container}>
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
