export const calculateDateTime = (date1, date2) => {
  const diff = Math.floor(date1.getTime() - date2.getTime());
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60 * 60;
  const second = 1000 * 60;

  const seconds = Math.floor(diff / second);
  const minutes = Math.floor(diff / minute);
  const hours = Math.floor(diff / hour);
  const days = Math.floor(diff / day);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);
  let message = "";
  if (years > 0) message = `${years} year${years > 1 ? `s` : ``} ago`;
  else if (months > 0) message = `${months} month${months > 1 ? `s` : ``} ago`;
  else if (days > 0) message = `${days} day${days > 1 ? `s` : ``} ago`;
  else if (hours > 0) message = `${hours} hour${hours > 1 ? `s` : ``} ago`;
  else if (minutes > 0) message = `${minutes} minute${minutes > 1 ? `s` : ``} ago`;
  else message = `${seconds} second${seconds > 1 ? `s` : ``} ago`;

  return message;
};

export const randomTime = () => {
  const date = new Date(+new Date() - Math.floor(Math.random() * 10000000000));
  return date.getTime();
};
