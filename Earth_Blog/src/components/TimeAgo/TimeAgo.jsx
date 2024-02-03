import moment from 'moment';
import 'moment-timezone';
import { useMemo } from 'react';
function TimeAgo({ date }) {
    const timeAgo = useMemo(() => {
        // Function to calculate time ago
        const postDate = moment(date,"DD-MM-YYYY HH:mm:ss [GMT]Z (z)");
        const now = moment();
        const diff = now.diff(postDate, 'minutes');

        if (diff < 60) {
            return diff + 'm';
        } else if (diff < 24 * 60) {
            const hours = Math.floor(diff / 60);
            return hours === 1 ? '1h' : hours + 'h';
        } else {
            const days = Math.floor(diff / (24 * 60));
            return days === 1 ? 'Yesterday' : days + 'd';
        }
    }, [date]); // Memoize based on the 'date' prop

    return <span>{timeAgo}</span>;
}

export default TimeAgo;