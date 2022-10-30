import { FormEventHandler, useState } from "react";
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

    const [published, setPublished] = useState(false);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const event = new FormData(e.target as HTMLFormElement);
        console.log({
            title: event.get("title"),
            description: event.get("description"),
            published: event.get("published"),
        });
    };

    return (
        <Modal show={modalOpen} setShow={setModalOpen} title="Create an Event">
            <form onSubmit={onSubmit}>
                <Label tw="mt-2">Title</Label>
                <Input name="title" type="text" tw="mt-1 w-full" required />

                <Label tw="mt-2">Description</Label>
                <Input
                    name="description"
                    type="text"
                    tw="mt-1 w-full"
                    required
                />

                <Label tw="mt-2">Privacy</Label>
                <div tw="mt-1 bg-gray-100 flex items-stretch rounded-md">
                    <Button
                        tw="flex-1"
                        variant={published ? "default" : "none"}
                        as="div"
                        onClick={() => setPublished(true)}
                    >
                        <BiAtom />
                        Published
                    </Button>
                    <Button
                        tw="flex-1"
                        as="div"
                        variant={!published ? "default" : "none"}
                        onClick={() => setPublished(false)}
                    >
                        <BiLockAlt />
                        Private
                    </Button>
                </div>
                <input
                    name="published"
                    type="hidden"
                    value={published.toString()}
                />
                <p tw="text-sm text-gray-500 mt-0.5">
                    Only you can see this event.
                </p>
                <Button tw="w-full mt-3" type="submit">
                    <BiPlus />
                    Create Event
                </Button>
            </form>
        </Modal>
    );
};

export default ModalEvent;
