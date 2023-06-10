// const worldTimeAPI = 'http://worldtimeapi.org/api/timezone';
const ipBaseAPI =
  'https://api.ipbase.com/v2/info?apikey=n2PKHxJs6IOE6W6HmT39RT4SlmZeVd9xMDFxStiY';
let currLocation;
let time;
const testTime = document.querySelector('.test');
const getTimeZone = (call) => {
  fetch(ipBaseAPI)
    .then((res) => res.json())
    .then((res) => {
      currLocation = res.data.timezone.id;
      return res;
    })
    .then((res) => {
      call();
      return res;
    })
    .then((res) => renderPage2(res));
  // currLocation = 'America/Chicago';
  // currLocation = 'Europe/Warsaw';
  // country = 'PL';
  // call();
};

const renderPage = (res) => {
  const zone = document.querySelector('.cloak__cloak-zone');
  console.log(res);

  zone.innerHTML = res.abbreviation;
  // place.innerHTML = res.time.slice();
};

const renderPage2 = (res) => {
  console.log(res);
  const place = document.querySelector('.cloak__container-place');
  place.innerHTML = `in ${res.data.location.city.name}, ${res.data.location.country.alpha2}`;
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
      // console.log(time);
      // console.log(country);
      console.log(res.abbreviation);
      // console.log(res.day_of_week);
      // console.log(res.day_of_year);
      // console.log(res.week_number);
      // console.log(res.datetime.slice(0, 10));
      call();
      return res;
    })
    .then((res) => {
      renderPage(res);
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
    // console.log(seconds);
    testTime.innerHTML = `${hours}:${minutes}`;
    if (minutes < 10) {
      testTime.innerHTML = `${hours}:0${minutes}`;
      if (hours < 10) {
        testTime.innerHTML = `0${hours}:0${minutes}`;
      }
    }
    if (hours < 10) {
      testTime.innerHTML = `0${hours}:${minutes}`;
      if (minutes < 10) {
        testTime.innerHTML = `0${hours}:0${minutes}`;
      }
    }
  }, 1000);

  // setInterval(() => {
  //   seconds += 1;
  //   if (seconds === 60) {
  //     seconds = 0;
  //     minutes += 1;
  //     if (minutes === 60) {
  //       hours += 1;
  //       minutes = 0;
  //       if (hours === 24) {
  //         hours = 0;
  //       }
  //     }
  //   }
  //   if (minutes < 10) {
  //     testTime.innerHTML = `${hours}:0${minutes}`;
  //     if (hours < 10) {
  //       testTime.innerHTML = `0${hours}:0${minutes}`;
  //     } else {
  //       testTime.innerHTML = `${hours}:0${minutes}`;
  //     }
  //   } else {
  //     testTime.innerHTML = `${hours}:${minutes}`;
  //     if (hours < 10) {
  //       testTime.innerHTML = `0${hours}:${minutes}`;
  //     } else {
  //       testTime.innerHTML = `${hours}:${minutes}`;
  //     }
  //   }
  // }, 1000);
};

// setInterval(() => {
//   showLocation();
// }, 60000);

getTimeZone(() => {
  showLocation(() => {
    cloak();
  });
});
