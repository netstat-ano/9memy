import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";
import styles from "./ModalWrapper.module.scss";
const ModalWrapper = (props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent className={styles.container}>
                <ModalHeader>{props.modalTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{props.modalBody}</ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                        {props.mainAction}
                    </Button>
                    <Button onClick={props.onClose} variant="ghost">
                        {props.secondaryAction}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default ModalWrapper;
