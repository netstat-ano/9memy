import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "../../firebase";
import SidebarElement from "../SidebarElement/SidebarElement";
import styles from "./Sidebar.module.scss";
let COUNTER = 0;
const Sidebar = (props) => {
    const [tags, setTags] = useState("");
    const [topTags, setTopTags] = useState([]);
    useEffect(() => {
        const fetchTags = async () => {
            const snapshot = await get(ref(database, `/posts/`));
            if (snapshot.exists()) {
                const response = snapshot.val();
                setTags(response);
            }
        };
        fetchTags();
    }, []);
    useEffect(() => {
        if (tags) {
            for (const tag in tags) {
                if (COUNTER === 0) {
                    setTopTags([
                        {
                            amount: Object.keys(tags[tag]).length,
                            tag: tag,
                        },
                    ]);
                    COUNTER++;
                } else {
                    if (COUNTER >= 20) {
                        for (const topTag in topTags) {
                            if (
                                topTags[topTag].amount <
                                Object.keys(tags[tag]).length
                            ) {
                                setTopTags((prevState) => {
                                    prevState[topTag] = {
                                        amount: Object.keys(tags[tag]).length,
                                        tag: tag,
                                    };
                                    return [...prevState];
                                });
                                break;
                            }
                        }
                    } else {
                        COUNTER++;
                        setTopTags((prevState) => {
                            return [
                                ...prevState,
                                {
                                    amount: Object.keys(tags[tag]).length,
                                    tag: tag,
                                },
                            ];
                        });
                    }
                }
            }
        }
    }, [tags]);
    return (
        <div className={styles.container}>
            <div>Popularne tagi:</div>
            {topTags.map((value) => {
                return <SidebarElement tag={value} />;
            })}
        </div>
    );
};
export default Sidebar;
