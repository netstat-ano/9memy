import { FormControl, FormHelperText, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import styles from "./PostCreator.module.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer, useRef, useState } from "react";
import { ref, update } from "firebase/database";
import { uploadBytes, ref as sRef } from "firebase/storage";
import { database, storage } from "../../firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const tagsReducer = (state, action) => {
    const { value, event } = action;
    console.log(event);
    const splittedValue = value.split(" ");
    const newState = splittedValue.map((tag) => {
        if (!tag.includes("#") && tag.length > 0) {
            tag = "#".concat(tag);
        }
        return tag;
    });
    return newState.join(" ");
};
const PostCreator = (props) => {
    const [memeUploaded, setMemeUploaded] = useState(null);
    const [titleValue, setTitleValue] = useState("");
    const [tagsValue, dispatchTagsValue] = useReducer(tagsReducer, `#`);
    const history = useHistory();
    const user = useSelector((state) => state.authentication.user);
    const inputFileRef = useRef();
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const uniqID = "id" + Math.random().toString(16).slice(2);
        const updates = {};
        let clearTag;
        const tagsArray = tagsValue.split(" ");
        for (const tagIndex in tagsArray) {
            const writetableTag = tagsArray[tagIndex].replace("#", "TAG");
            clearTag = tagsArray[tagIndex].replace("#", "");
            const post = {
                title: titleValue,
                tags: tagsValue,
                user: {
                    displayName: user.displayName,
                    uid: user.uid,
                },
                id: uniqID,
                likes: 0,
                comments: 0,
                dislikes: 0,
                date: new Date(),
            };
            updates[`posts/${writetableTag}/${uniqID}`] = post;
            updates[`${user.uid}/posts/${uniqID}`] = uniqID;
        }
        await update(ref(database), updates);
        const storageRef = sRef(storage, `/memes/${uniqID}`);
        await uploadBytes(storageRef, inputFileRef.current.files[0]);
        history.push(`/post/${clearTag}/${uniqID}`);
    };
    const onTitleInputHandler = (event) => {
        setTitleValue(event.target.value);
    };
    const onTagsInputHandler = (event) => {
        dispatchTagsValue({ value: event.target.value, event: { event } });
    };
    const onFileChangeHandler = (event) => {
        setMemeUploaded(window.URL.createObjectURL(event.target.files[0]));
    };
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <FormControl className={styles.container}>
                    <div>
                        <div className={styles.input}>
                            <Input
                                onInput={onTitleInputHandler}
                                value={titleValue}
                                placeholder="Tytuł"
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="meme">
                                <div
                                    style={{
                                        backgroundImage: `url(${memeUploaded})`,
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                    }}
                                    className={styles["upload-wrapper"]}
                                >
                                    <div className={styles.icon}>
                                        <FontAwesomeIcon icon={faImage} />
                                    </div>
                                    <div>
                                        <Button
                                            mt={4}
                                            size="sm"
                                            colorScheme="blue"
                                            variant="outline"
                                            className={
                                                styles["add-meme-button"]
                                            }
                                        >
                                            Dodaj śmiesznego mema
                                        </Button>
                                    </div>
                                </div>
                            </label>
                            <input
                                onChange={onFileChangeHandler}
                                ref={inputFileRef}
                                accept="image/png, image/jpeg"
                                id="meme"
                                name="meme"
                                className={styles.file}
                                type="file"
                            />
                        </div>
                        <div className={styles.input}>
                            <Input
                                onInput={onTagsInputHandler}
                                value={tagsValue}
                                mt={4}
                                placeholder="Tagi"
                                type="text"
                            />
                            <FormHelperText>
                                Poszczególne tagi oddziel spacją (np. #memy
                                #2137 itd.)
                            </FormHelperText>
                        </div>
                        <div className={styles.submit}>
                            <Button mt={4} type="submit" colorScheme="green">
                                Wyślij
                            </Button>
                        </div>
                    </div>
                </FormControl>
            </form>
        </div>
    );
};
export default PostCreator;
