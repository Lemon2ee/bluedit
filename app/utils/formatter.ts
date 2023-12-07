export default function formatDate(raw_date: string) {
    const date = new Date(raw_date);
    const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate().toString().padStart(2, "0");
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

    return `${weekday} ${month} ${day} ${year}`;
}