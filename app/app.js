// const worldTimeAPI = 'http://worldtimeapi.org/api/timezone';
const ipBaseAPI =
  'https://api.ipbase.com/v2/info?apikey=n2PKHxJs6IOE6W6HmT39RT4SlmZeVd9xMDFxStiY';
let currLocation;
let time;
const testTime = document.querySelector('.test');
const getTimeZone = (call) => {
  // fetch(ipBaseAPI)
  //   .then((res) => res.json())
  //   .then((res) => (currLocation = res.data.timezone.id))
  //   .then(() => call());
  // currLocation = 'America/Chicago';
  currLocation = 'Europe/Warsaw';
  country = 'PL';
  call();
};

const showLocation = (call) => {
  console.log(currLocation);
  let worldTimeAPI = `http://worldtimeapi.org/api/timezone/${currLocation}`;
  // let worldTimeAPI = `http://worldtimeapi.org/api/timezone/America`;
  fetch(worldTimeAPI)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res.datetime);
      console.log(res);
      // console.log(res.datetime.slice(11, 19));
      time = res.datetime.slice(11, 19);
      console.log(time);
      console.log(country);
      console.log(res.abbreviation);
      // console.log(res.day_of_week);
      // console.log(res.day_of_year);
      // console.log(res.week_number);
      // console.log(res.datetime.slice(0, 10));
      call();
    });
};

const cloak = () => {
  let seconds = Number(time.slice(-2));
  let minutes = Number(time.slice(3, 5));
  let hours = Number(time.slice(0, 2));
  setInterval(() => {
    seconds += 1;
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
      if (minutes === 60) {
        hours += 1;
        minutes = 0;
        if (hours === 24) {
          hours = 0;
        }
      }
    }
    if (minutes < 10) {
      testTime.innerHTML = `${hours}:0${minutes}`;
      if (hours < 10) {
        testTime.innerHTML = `0${hours}:0${minutes}`;
      } else {
        testTime.innerHTML = `${hours}:0${minutes}`;
      }
    } else {
      testTime.innerHTML = `${hours}:${minutes}`;
      if (hours < 10) {
        testTime.innerHTML = `0${hours}:${minutes}`;
      } else {
        testTime.innerHTML = `${hours}:${minutes}`;
      }
    }
  }, 1000);
};

getTimeZone(() => {
  showLocation(() => {
    cloak();
  });
});
