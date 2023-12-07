import LoadThread from "@/app/thread/[threadID]/editThread/loadThread";
import Navbar from "@/app/home/NavBar/navbar";

export default function UpdateThread({params}: {
    params: {
        threadID: string
    }
}) {

    return (
        <>
            <Navbar/>
            <LoadThread threadID={params.threadID}/>
        </>
    );
}
