function countDow(
  idEDays,
  IdEHour,
  IdEMinutes,
  IdESecond,
  timeStart = "2023-11-26"
) {
  const eDay = document.getElementById(idEDays);
  const eHour = document.getElementById(IdEHour);
  const eMinutes = document.getElementById(IdEMinutes);
  const eSecond = document.getElementById(IdESecond);
  if (!eDay) {
    return;
  }

  let countDownDay = new Date(timeStart).getTime();
  let start = setInterval(() => {
    let now = new Date().getTime();
    let distance = countDownDay - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    eDay.innerText = days;
    eHour.innerText = hours;
    eMinutes.innerText = minutes;
    eSecond.innerText = seconds;

    if (distance < 0) {
      clearInterval(x);
      eDay.innerText = 0;
      eHour.innerText = 0;
      eMinutes.innerText = 0;
      eSecond.innerText = 0;
    }
  }, 1000);
}
export default countDow;
