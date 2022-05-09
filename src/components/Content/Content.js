import Sidebar from "../Sidebar/Sidebar";
import PostCreator from "../PostCreator/PostCreator";
import styles from "./Content.module.scss";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";
import Posts from "../Posts/Posts";
const Content = (props) => {
    const user = useSelector((state) => state.authentication.user);
    if (!user) {
        return <Redirect to="/" />;
    }
    return (
        <div className={styles.container}>
            <Sidebar />
            <Route path="/create-post">
                <div>
                    <PostCreator />
                </div>
            </Route>
            <Route path="/tag/:tag">
                <Posts />
            </Route>
        </div>
    );
};
export default Content;
