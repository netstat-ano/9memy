import styles from "./Avatar.module.scss";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { useSelector } from "react-redux";

import defaultAvatar from "../../assets/img/default-avatar.jpg";
import { useEffect, useState } from "react";

const Avatar = (props) => {
    const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
    const [inputValue, setInputValue] = useState("");
    const user = useSelector((state) => state.authentication.user);
    const onAddAvatarHandler = async (event) => {
        const storageRef = sRef(storage, `/avatar/${user.uid}`);
        await uploadBytes(storageRef, event.target.files[0]);
        setInputValue(event.target.files[0]);
    };
    useEffect(() => {
        const fetchAvatar = async () => {
            const url = await getDownloadURL(
                sRef(storage, `/avatar/${props.uid}`)
            );
            console.log(url);
            if (url) {
                setAvatarUrl(url);
                return;
            }
            setAvatarUrl(defaultAvatar);
        };

        fetchAvatar();
    }, [inputValue]);
    console.log(avatarUrl);
    return (
        <div className={styles.avatar}>
            <img src={avatarUrl}></img>
            <div className={styles.plus}>
                <input
                    accept="image/png, image/jpeg"
                    onChange={onAddAvatarHandler}
                    id="avatar"
                    type="file"
                    style={{ display: "none" }}
                ></input>
                <label htmlFor="avatar">+</label>
            </div>
        </div>
    );
};
export default Avatar;
