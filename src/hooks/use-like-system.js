import { useDispatch, useSelector } from "react-redux";
import { update, ref, get } from "firebase/database";
import { database } from "../firebase";
import { updateUserData } from "../store/authentication-slice";
import { useState, useEffect } from "react";
let isInitial = true;
const useLikeSystem = (config) => {
    const [likes, setLikes] = useState(config.likes);
    const [dislikes, setDislikes] = useState(config.dislikes);
    const [likeStatus, setLikeStatus] = useState(null);
    const user = useSelector((state) => state.authentication.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isInitial) {
            const updates = {};
            if (config.tag === config.queryTag) {
                updates[`/posts/TAG${config.tag}/${config.url}`] = {
                    ...config.data,
                    likes,
                    dislikes,
                };
                update(ref(database), updates);
                return;
            }
            return;
        }
        isInitial = false;
    }, [likes, dislikes, config.id, config.tag]);
    useEffect(() => {
        const fetchLikes = async () => {
            const snapshot = await get(ref(database, `/${user.uid}`));
            if (snapshot.exists()) {
                const response = snapshot.val();
                if (response.liked) {
                    for (const id in response.liked) {
                        if (id === config.id) {
                            setLikeStatus("like");
                        }
                    }
                }
                if (response.disliked) {
                    for (const id in response.disliked) {
                        if (id === config.id) {
                            setLikeStatus("dislike");
                        }
                    }
                }
            }
        };
        fetchLikes();
    }, [config.id, user.uid]);
    const onLikeHandler = (event) => {
        console.log("onlike");
        if (!likeStatus) {
            setLikes((prevState) => prevState + 1);
            setLikeStatus("like");
            const data = {};
            data[`${config.id}`] = config.id;
            dispatch(updateUserData({ url: "liked/", data, id: config.id }));
        }
        if (likeStatus === "like") {
            setLikes((prevState) => prevState - 1);
            setLikeStatus(null);
            const data = {};
            data[`${config.id}`] = null;
            dispatch(updateUserData({ url: "liked/", data, id: config.id }));
        }
        if (likeStatus === "dislike") {
            setLikes((prevState) => prevState + 1);
            setDislikes((prevState) => prevState - 1);
            setLikeStatus("like");

            const dataDisliked = {};
            dataDisliked[`${config.id}`] = null;
            dispatch(
                updateUserData({
                    url: "disliked/",
                    data: dataDisliked,
                    id: config.id,
                })
            );

            const dataLiked = {};
            dataLiked[`${config.id}`] = config.id;
            dispatch(
                updateUserData({
                    url: "liked/",
                    data: dataLiked,
                    id: config.id,
                })
            );
        }
    };
    const onDislikeHandler = (event) => {
        console.log("ondislike");
        if (!likeStatus) {
            setDislikes((prevState) => prevState + 1);
            setLikeStatus("dislike");

            const data = {};
            data[`${config.id}`] = config.id;
            dispatch(updateUserData({ url: "disliked/", data, id: config.id }));
        }
        if (likeStatus === "dislike") {
            setDislikes((prevState) => prevState - 1);
            setLikeStatus(null);

            const data = {};
            data[`${config.id}`] = null;
            dispatch(updateUserData({ url: "disliked/", data, id: config.id }));
        }
        if (likeStatus === "like") {
            setLikes((prevState) => prevState - 1);
            setDislikes((prevState) => prevState + 1);
            setLikeStatus("dislike");
            const dataLiked = {};
            dataLiked[`${config.id}`] = null;
            dispatch(
                updateUserData({
                    url: "liked/",
                    data: dataLiked,
                    id: config.id,
                })
            );
            const dataDisliked = {};
            dataDisliked[`${config.id}`] = config.id;
            dispatch(
                updateUserData({
                    url: "disliked/",
                    data: dataDisliked,
                    id: config.id,
                })
            );
        }
    };
    return [
        { likes, dislikes },
        { onDislikeHandler, onLikeHandler },
    ];
};
export default useLikeSystem;
