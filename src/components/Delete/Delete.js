import { Button } from "@chakra-ui/react";
import { ref, update } from "firebase/database";
import { database } from "../../firebase";
const Delete = (props) => {
    const onDeleteHandler = (event) => {
        const updates = {};
        updates[`${props.url}`] = null;
        update(ref(database), updates);

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
                Delete
            </Button>
        </div>
    );
};
export default Delete;
