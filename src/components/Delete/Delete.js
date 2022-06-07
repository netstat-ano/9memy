import { Button } from "@chakra-ui/react";
import { ref, update } from "firebase/database";
import { useSelector } from "react-redux";
import { database } from "../../firebase";
const Delete = (props) => {
    const user = useSelector((state) => state.authentication.user);
    const onDeleteHandler = (event) => {
        props.onClick();
        const updates = {};
        updates[`${props.url}`] = null;
        updates[`${user.uid}/liked/${props.content[0]["id"]}`] = null;
        update(ref(database), updates);
        console.log(props.content);
        props.setContent((prevState) => {
            return prevState.filter((element) => {
                return element.id !== props.content[0]["id"];
            });
        });
    };
    return (
        <div>
            <Button
                colorScheme="red"
                variant="outline"
                onClick={onDeleteHandler}
                size="xs"
            >
                Usuń
            </Button>
        </div>
    );
};
export default Delete;
