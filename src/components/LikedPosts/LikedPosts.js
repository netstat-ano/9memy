import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebase";
import Post from "../Post/Post";
const LikedPosts = (props) => {
    const [likedPosts, setLikedPosts] = useState([]);
    const user = useSelector((state) => state.authentication.user);
    useEffect(() => {
        const fetchPosts = async () => {
            const liked = await get(ref(database, `${user.uid}/liked`));

            if (liked.exists()) {
                const responseLiked = liked.val();
                const posts = [];
                for (const responseLikedId in responseLiked) {
                    const posts = await get(ref(database, `posts/`));
                    if (posts.exists()) {
                        const responsePosts = posts.val();
                        for (const tag in responsePosts) {
                            for (const responsePostsId in responsePosts[tag]) {
                                if (responsePostsId === responseLikedId) {
                                    setLikedPosts((prevState) => {
                                        return [
                                            ...prevState,
                                            responsePosts[tag][responsePostsId],
                                        ];
                                    });
                                }
                            }
                        }
                    }
                }
            }
        };
        fetchPosts();
    }, []);
    return (
        <div>
            {likedPosts.map((value) => {
                return (
                    <Post
                        allPosts={likedPosts}
                        setFetchedPosts={setLikedPosts}
                        tag={value.tags}
                        postInfo={value}
                    />
                );
            })}
        </div>
    );
};
export default LikedPosts;
