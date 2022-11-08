import type {
    NextPage,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from "next";
import { BiUpload, BiMove, BiPencil, BiCog } from "react-icons/bi";

import Header from "components/Header";
import PageRoot from "components/PageRoot";
import PageWrapper from "components/PageWrapper";
import { serverGetUser } from "utils/serverGetProfile";
import UserModel from "schema/User/UserModel";
import EventModel from "schema/Event/EventModel";
import { separateSlug } from "utils/manageSlug";
import { Button } from "components/utils/atoms";
import { ClickableIcon, Editable, EditableSet } from "components/utils/styles";
import Block from "components/Block";
import { useState } from "react";
import useEditorStore from "hooks/useEditorStore";
import {
    DndContext,
    DragEndEvent,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from "@dnd-kit/sortable";

import ModalSlide from "components/ModalSlide";

const Event: NextPage = ({
    user,
    event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [blocks, setBlocks] = useEditorStore((s) => [s.blocks, s.setBlocks]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // TODO: slid in modal

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex((b) => b.id === active.id);
            const newIndex = blocks.findIndex((b) => b.id === over.id);
            setBlocks(arrayMove(blocks, oldIndex, newIndex));
        }
    };

    const [heroOpen, setHeroOpen] = useState(false);

    return (
        <PageRoot>
            <PageWrapper>
                <Header user={user} />
                <div tw="w-full h-72 relative" className="group">
                    <img
                        src="/defaultEvent.jpg"
                        tw="w-full h-full rounded-xl border object-cover object-top"
                    />
                    <div tw="absolute right-3 bottom-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button onClick={() => setHeroOpen(true)}>
                            <BiUpload />
                            Change
                        </Button>
                        <Button variant="hollow">
                            <BiMove />
                            Reposition
                        </Button>
                    </div>
                </div>

                <ModalSlide
                    title="Change Hero Image"
                    show={heroOpen}
                    setShow={setHeroOpen}
                >
                    <img
                        tw="w-full max-h-36 object-cover object-top mt-6 rounded-lg"
                        src="/defaultEvent.jpg"
                    />
                    <p tw="mt-4">Hello</p>
                </ModalSlide>

                <Editable className="group mt-4">
                    <EditableSet>
                        <ClickableIcon>
                            <BiPencil />
                        </ClickableIcon>
                        <ClickableIcon>
                            <BiCog />
                        </ClickableIcon>
                    </EditableSet>

                    <h1 tw="text-4xl font-bold">{event.title}</h1>
                </Editable>
                <p tw="mt-2">{event.description}</p>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={blocks}
                        strategy={rectSortingStrategy}
                    >
                        {blocks.map((b) => (
                            <Block key={b.id} {...b} />
                        ))}
                    </SortableContext>
                </DndContext>
            </PageWrapper>
        </PageRoot>
    );
};

export default Event;

export const getServerSideProps: GetServerSideProps = async ({
    req,
    res,
    query,
}) => {
    const { eventSlug, eventId } = separateSlug(query.eventSlug as string);
    const ownerUsername = query.username as string;
    let owner, event;

    // no event id
    if (!(eventSlug && eventId)) {
        return {
            notFound: true,
        };
    }

    try {
        owner = await UserModel.findByUsername(ownerUsername);
        event = await EventModel.findEventById(eventId);

        const slug = event.title.split(" ").join("-").toLowerCase();
        if (slug !== eventSlug) {
            throw new Error("Invalid slug");
        }
    } catch (e) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            user: await serverGetUser(req, res).catch(() => null),
            owner,
            event,
        },
    };
};
