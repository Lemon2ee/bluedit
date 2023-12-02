type PageSelectorProps = {
    pageSize: number;
    setPageSize: (size: number) => void;
    pageNumber: number,
    setPageNumber: (pageNumber: number) => void;
    keyword: string;
};

export default async function PageSelector({pageSize, setPageSize, pageNumber, setPageNumber, keyword}: PageSelectorProps) {
    const res = await fetch(`/api/search/threads/count?keyword=${encodeURIComponent(keyword)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(keyword),
    });
    const body = await res.json()
    console.log(`Count Threads Response: ${body}`)

    const totalItems = body["count"]

    const totalPages = Math.ceil(totalItems / pageSize)

    return (
        <>
        </>
    )
}