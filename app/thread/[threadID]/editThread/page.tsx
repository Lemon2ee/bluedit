import ThreadEdit from "@/app/thread/threadEditor";
import {getThread} from "@/app/thread/[threadID]/page";



export default async function UpdateThread({
                                               params,
                                           }: {
    params: {
        threadID: string;
    };
}) {
    const thread= await getThread(params.threadID);
    return (
        <>
            <ThreadEdit mode="edit" initialData={{title: thread.title, content: thread.content, isPublic:true, threadID: thread.id}}/>
        </>
    );
}
