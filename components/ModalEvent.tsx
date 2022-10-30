import { useState } from "react";
import { Button, Input, Label } from "components/utils/atoms";
import { BiAtom, BiLockAlt, BiPlus } from "react-icons/bi";
import Modal from "components/Modal";
import useStore from "hooks/useToastStore";
import useEventStore from "hooks/useEventStore";

const ModalEvent = () => {
    const [modalOpen, setModalOpen] = useEventStore((s) => [
        s.modalOpen,
        s.setModalOpen,
    ]);

    return (
        <Modal show={modalOpen} setShow={setModalOpen} title="Create an Event">
            <Label tw="mt-2">Title</Label>
            <Input type="text" tw="mt-1 w-full" />

            <Label tw="mt-2">Privacy</Label>
            <div tw="mt-1 bg-gray-100 flex items-stretch rounded-md">
                <Button tw="flex-1" variant="none">
                    <BiAtom />
                    Published
                </Button>
                <Button tw="flex-1">
                    <BiLockAlt />
                    Private
                </Button>
            </div>
            <p tw="text-sm text-gray-500 mt-0.5">
                Only you can see this event.
            </p>
            <Button tw="w-full mt-3">
                <BiPlus />
                Create Event
            </Button>
        </Modal>
    );
};

export default ModalEvent;
