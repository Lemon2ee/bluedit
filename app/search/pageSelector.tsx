import {useEffect, useState} from "react";

type PageSelectorProps = {
    pageSize: number;
    pageNumber: number,
    setPageNumber: (pageNumber: number) => void;
    keyword: string;
};

export default function PageSelector({pageSize, pageNumber, setPageNumber, keyword}: PageSelectorProps) {
    const [totalPages, setTotalPages] = useState(0);
    const handlePreviousClick = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextClick = () => {
        if (pageNumber + 1 < totalPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    useEffect(() => {
        fetch(`/api/search/threads/count?keyword=${encodeURIComponent(keyword)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response failed');
                }
                return response.json();
            })
            .then(data => {
                setTotalPages(Math.ceil(data.count / pageSize));
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Handle the error appropriately
            });
    }, [keyword, pageSize]); // Dependencies: keyword and pageSize


    return (
        <div className="flex items-center justify-center space-x-4">

            <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={handlePreviousClick}
            >
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M7.05 10.707l-.707-.707L11.757 5l.707.707L8.464 10l3.293 3.293-.707.707L7.05 10.707z"/>
                </svg>
            </button>

            <p>{totalPages == 0 ? 0: pageNumber + 1} / {totalPages}</p>

            <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={handleNextClick}
            >
                <svg className="fill-current w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M12.95 10.707l.707-.707L7.343 5.05l-.707.707L11.757 10l-5.121 5.121.707.707L12.95 10.707z"/>
                </svg>
            </button>
        </div>
    )
}