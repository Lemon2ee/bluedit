import ThreadEdit from "@/app/thread/threadEditor";
import Navbar from "@/app/home/NavBar/navbar";

export default function CreateThread() {

    return (
        <>
            <Navbar/>
            <ThreadEdit mode={"create"}/>
        </>
    );
}
