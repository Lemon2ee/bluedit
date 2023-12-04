/**
 * Provide a paginated threads based on keyword search.
 * @param req request contains keyword, pageSize, pageRequested. pageRequested starts from 0.
 */
export async function GET(req: Request) {
    const url = new URL(req.url)
    const keyword = url.searchParams.get('keyword') as string;

    try {
        const encoded_key = encodeURIComponent(process.env.GOOGLE_SEARCH_KEY as string);
        const encoded_engine_id = encodeURIComponent(process.env.GOOGLE_SEARCH_ENGINE_ID as string);
        const encoded_query = encodeURIComponent(keyword);

        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${encoded_key}&cx=${encoded_engine_id}&q=${encoded_query}`);

        const data = await response.json();

        // Pass data to the page via props
        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Failed to fetch data' });
    }
}