import Navbar from "@/app/home/NavBar/navbar";
import SearchAndPagination from "@/app/search/resultAndPage";

const SearchResult = () => {

    return (
        <div className={"flex justify-center flex-col"}>
            <div className="row"><Navbar/></div>
            <div className="row"><SearchAndPagination/></div>
        </div>
    );
}

export default SearchResult;
