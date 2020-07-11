export const getTime = (sec) => {
  let minutes = Math.floor(sec / 60);
  let seconds = sec - minutes * 60;
  let displaySeconds = seconds === 0 ? "00" : seconds;
  const time = minutes + ":" + displaySeconds;
  return time;
};
