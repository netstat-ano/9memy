import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, ref } from "firebase/database";
import { database } from "../../firebase";
import Avatar from "../Avatar/Avatar";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import styles from "./Profile.module.scss";
import ProfilePosts from "../ProfilePosts/ProfilePosts";
import LikedPosts from "../LikedPosts/LikedPosts";
const Profile = (props) => {
    const { uid } = useParams();
    const [userData, setUserData] = useState("");
    useEffect(() => {
        const fetchUserData = async () => {
            const snapshot = await get(ref(database, `/${uid}`));
            if (snapshot.exists()) {
                const response = snapshot.val();
                setUserData(response);
            }
        };
        fetchUserData();
    }, []);
    const creationDate = new Date(userData.creationTime);
    return (
        <div>
            <div>
                <Avatar uid={uid} />
            </div>
            <div>{userData.displayName}</div>
            <div>
                Dołączył {creationDate.getDate()}.{creationDate.getMonth() + 1}.
                {creationDate.getFullYear()}
            </div>
            <div>
                <div className={styles.actions}>
                    <div>
                        <NavLink
                            activeClassName={styles.active}
                            className={styles["action-link"]}
                            to={`/profile/${uid}/posts`}
                        >
                            Wpisy
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            activeClassName={styles.active}
                            className={styles["action-link"]}
                            to={`/profile/${uid}/liked-posts`}
                        >
                            Polubione wpisy
                        </NavLink>
                    </div>
                </div>
                <Route path={`/profile/:userID/liked-posts`}>
                    <LikedPosts />
                </Route>
                <Route path={`/profile/:userID/posts`}>
                    <ProfilePosts uid={uid} />
                </Route>
            </div>
        </div>
    );
};
export default Profile;
