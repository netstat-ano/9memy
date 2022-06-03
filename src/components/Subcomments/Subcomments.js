import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../firebase";
import Subcomment from "../Subcomment/Subcomment";
import SubcommentCreator from "../SubcommentCreator/SubcommentCreator";
const Subcomments = (props) => {
    const [subcomments, setSubcomments] = useState([]);
    const { postInfo, commentInfo } = props;
    useEffect(() => {
        const fetchSubcomments = async () => {
            const snapshot = await get(
                ref(
                    database,
                    `posts/TAG${props.tag}/${postInfo.id}/comments/${commentInfo.id}/comments`
                )
            );
            if (snapshot.exists()) {
                const response = snapshot.val();
                console.log(response);
                for (const id in response) {
                    console.log(response);
                    setSubcomments((prevState) => [...prevState, response[id]]);
                }
            }
        };
        fetchSubcomments();
    }, []);
    console.log(subcomments);
    return (
        <div>
            <SubcommentCreator
                setSubcomments={setSubcomments}
                postInfo={postInfo}
                tag={props.tag}
                commentInfo={commentInfo}
            />
            {subcomments.length > 0 &&
                subcomments.map((value) => {
                    return (
                        <Subcomment
                            subcomments={subcomments}
                            setSubcomments={setSubcomments}
                            tag={props.tag}
                            commentInfo={commentInfo}
                            postInfo={postInfo}
                            subcommentInfo={value}
                        />
                    );
                })}
        </div>
    );
};
export default Subcomments;
