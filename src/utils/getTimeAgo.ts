export const getTimeAgo = (timestamp: string) => {
  const currentDate = new Date();
  const previousDate = new Date(timestamp);

  const timeDifference = currentDate.getTime() - previousDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return (seconds === 1 ? "1 second" : seconds + " seconds") + " ago";
  }
  if (minutes < 60) {
    return (minutes === 1 ? "1 minute" : minutes + " minutes") + " ago";
  }
  if (hours < 24) {
    return (hours === 1 ? "1 hour" : hours + " hours") + " ago";
  }
  if (days < 7) {
    return (days === 1 ? "1 day" : days + " days") + " ago";
  }
  if (weeks < 4) {
    return (weeks === 1 ? "1 week" : weeks + " weeks") + " ago";
  }
  if (months < 12) {
    return (months === 1 ? "1 month" : months + " months") + " ago";
  }

  return (years === 1 ? "1 year" : years + " years") + " ago";
};
