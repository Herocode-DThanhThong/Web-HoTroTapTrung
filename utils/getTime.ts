export const getTime = () => {
  const timer = new Date();
  const hours = `${
    timer.getHours().toString().length === 1
      ? "0" + timer.getHours().toString()
      : timer.getHours()
  }`;
  const minutes = `${
    timer.getMinutes().toString().length === 1
      ? "0" + timer.getMinutes().toString()
      : timer.getMinutes()
  }`;
  const ampm = timer.getHours() >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${ampm}`;
};
