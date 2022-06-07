import styles from "./Avatar.module.scss";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { useSelector } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../assets/img/default-avatar.jpg";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Avatar = (props) => {
    const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
    const [inputValue, setInputValue] = useState("");
    const [isFetchingComplete, setIsFetchingComplete] = useState(false);
    const user = useSelector((state) => state.authentication.user);
    const onAddAvatarHandler = async (event) => {
        const storageRef = sRef(storage, `/avatar/${user.uid}`);
        await uploadBytes(storageRef, event.target.files[0]);
        setInputValue(event.target.files[0]);
    };
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const url = await getDownloadURL(
                    sRef(storage, `/avatar/${props.uid}`)
                );

                setAvatarUrl(url);
                setIsFetchingComplete(true);
            } catch {
                setAvatarUrl(defaultAvatar);
                setIsFetchingComplete(true);
            }
        };

        fetchAvatar();
    }, [inputValue]);
    console.log(isFetchingComplete);
    return (
        <div className={styles.avatar}>
            {!isFetchingComplete && (
                <FontAwesomeIcon
                    className={`fa-spin ${styles.spinner}`}
                    icon={faSpinner}
                />
            )}
            {isFetchingComplete && <img src={avatarUrl}></img>}
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
