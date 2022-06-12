import { NavLink, useHistory } from "react-router-dom";
import styles from "./SidebarElement.module.scss";
const SidebarElement = (props) => {
    const urlTAG = props.tag.tag.replace("TAG", "");
    const visibleTAG = props.tag.tag.replace("TAG", "#");
    return (
        <div className={styles.link}>
            <NavLink to={`/tag/${urlTAG}`}>{visibleTAG}</NavLink>
        </div>
    );
};
export default SidebarElement;
