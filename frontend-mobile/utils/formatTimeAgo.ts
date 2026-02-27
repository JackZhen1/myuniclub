const formatTimeAgo = (date: string) => {
    const now = new Date();
    const updateTime = new Date(date);
    const diff = now.getTime() - updateTime.getTime();

    if (diff < 60000) {
        return 'Just Now';
    };

    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) {
        return `${minutes} mins ago`;
    };

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hours ago`;
    };

    const days = Math.floor(hours / 24);
    return `${days} days ago`;
};

export default formatTimeAgo;