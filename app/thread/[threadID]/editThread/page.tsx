import ThreadEdit from "@/app/thread/threadEditor";

interface ThreadUpdateProps {
    title: string;
    content: string;
    isPublic: boolean;
}

export default function UpdateThread({
                                         params,
                                     }: {
    params: {
        threadID: string;
    };
}, {title, content, isPublic}: ThreadUpdateProps) {
    const threadID = params.threadID;
    return (
        <>
            <ThreadEdit mode="edit" initialData={{title, content, isPublic, threadID}}/>
        </>
    );
}
