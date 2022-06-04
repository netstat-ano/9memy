import { getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { ref } from "firebase/storage";
import defaultAvatar from "../../assets/img/default-avatar.jpg";
import styles from "./AvatarThumbnail.module.scss";
import { storage } from "../../firebase";
const AvatarThumbnail = (props) => {
    const { uid } = props;
    const [avatar, setAvatar] = useState(defaultAvatar);
    useEffect(() => {
        const fetchAvatar = async () => {
            const url = await getDownloadURL(ref(storage, `avatar/${uid}`));
            setAvatar(url);
        };
        fetchAvatar();
    }, []);
    return <img className={styles.avatar} src={avatar}></img>;
};
export default AvatarThumbnail;
