'use client'
import ThreadEdit from "@/app/thread/threadEditor";
import {useEffect, useState} from "react";

interface UpdateThreadProps {
    title: string;
    content: string;
    isPublic: boolean;
}

export default function LoadThread({threadID}: { threadID: string }) {
    const [threadData, setThreadData] = useState<UpdateThreadProps>();

    useEffect(() => {
        const storedData = sessionStorage.getItem('threadData');
        if (storedData) {
            setThreadData(JSON.parse(storedData));
            // Optionally clear the data from session storage
            sessionStorage.removeItem('threadData');
        }
    }, []);
    return (
        <>
            <ThreadEdit mode="edit"
                        initialData={{
                            title: threadData && threadData.title || '',
                            content: threadData && threadData.content || '',
                            isPublic: threadData && threadData.isPublic || true,
                            threadID: threadID
                        }}/>
        </>
    );
}
