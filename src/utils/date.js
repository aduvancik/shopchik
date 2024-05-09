export const formatDate = (timestamp) => {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const today = new Date();
    const padZero = (num) => (num < 10 ? '0' : '') + num;

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      const formattedTime = padZero(date.getHours()) + ':' + padZero(date.getMinutes());
      return 'сьогодні о ' + formattedTime;
    } else {
      const formattedDate =
        date.getDate() +
        ' ' +
        ['січ', 'лют', 'бер', 'квіт', 'трав', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'груд'][date.getMonth()] +
        ' ' +
        date.getFullYear();
      return formattedDate;
    }
  };