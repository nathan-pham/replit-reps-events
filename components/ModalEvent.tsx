import { FormEventHandler, useState } from "react";
import { Button, Input, Label } from "components/utils/atoms";
import { BiAtom, BiLockAlt, BiPlus } from "react-icons/bi";
import Modal from "components/Modal";
import useEventStore from "hooks/useEventStore";
import { useMutation } from "urql";
import CreateEvent from "components/graphql/CreateEvent.graphql";
import useToastStore from "hooks/useToastStore";
import { useRouter } from "next/router";

const ModalEvent = () => {
    const [modalOpen, setModalOpen] = useEventStore((s) => [
        s.modalOpen,
        s.setModalOpen,
    ]);

    const addToast = useToastStore((s) => s.addToast);
    const router = useRouter();
    const [published, setPublished] = useState(false);
    const [_, publishEvent] = useMutation(CreateEvent);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const event = new FormData(e.target as HTMLFormElement);

        const result = await publishEvent({
            title: event.get("title"),
            tagline: event.get("description"),
            published: event.get("published") === "true", // convert string "true" into boolean true
        });

        if (result.error) {
            return addToast(
                "Try that again.",
                "We couldn't create that event!"
            );
        }

        // redirect to dashboard
        router.push("/~");
    };

    return (
        <Modal show={modalOpen} setShow={setModalOpen} title="Create an Event">
            <form onSubmit={onSubmit}>
                <Label tw="mt-2">Title</Label>
                <Input name="title" type="text" tw="mt-1 w-full" required />

                <Label tw="mt-2">Tagline</Label>
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
                    {published
                        ? "Everyone will be able to see this event in the explore tab."
                        : "Only you can see find event, but you can still share the link."}
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
