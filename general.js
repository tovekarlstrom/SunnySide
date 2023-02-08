///Källa clock 24 hours
// https://flexiple.com/javascript/javascript-clock/

function clock() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;

  const time = hh + ":" + mm;

  document.getElementById("time").innerText = time;
  let t = setTimeout(function () {
    clock();
  }, 1000);
}

clock();
