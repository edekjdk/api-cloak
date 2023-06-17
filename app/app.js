// const worldTimeAPI = 'http://worldtimeapi.org/api/timezone';
const ipBaseAPI =
  'https://api.ipbase.com/v2/info?apikey=n2PKHxJs6IOE6W6HmT39RT4SlmZeVd9xMDFxStiY';
let currLocation;
const randonQuoteAPI = 'https://api.quotable.io/random';
const quoute = document.querySelector('.quoute');
const cloakCon = document.querySelector('.cloak');
const showMoreButton = document.querySelector('.show-more-button');
const quouteText = document.querySelector('.quoute__text');
const quouteAuthor = document.querySelector('.quoute__author');
const quouteRefresh = document.querySelector('.quoute__refresh');
const moreInformation = document.querySelector('.more-information');
let time;
let city;
let country;
const testTime = document.querySelector('.test');
const getTimeZone = (call) => {
  // fetch(ipBaseAPI)
  // .then((res) => res.json())
  // .then((res) => {
  //   currLocation = res.data.timezone.id;
  //   return res;
  // })
  // .then((res) => {
  //   call();
  //   return res;
  // })
  // .then((res) => renderPage2(res));
  // currLocation = 'America/Chicago';
  currLocation = 'Europe/Warsaw';
  city = 'Warsaw';
  country = 'PL';
  renderPage2(city, country);
  // country = 'PL';
  call();
};

const renderPage = (res) => {
  const zone = document.querySelector('.cloak__cloak-zone');
  console.log(res);

  zone.innerHTML = res.abbreviation;
  document.querySelector('.more-information__container-data-zone').innerHTML =
    res.timezone;
  document.querySelector(
    '.more-information__container-data-day-of-year'
  ).innerHTML = res.day_of_year;
  document.querySelector(
    '.more-information__container-data-day-of-week'
  ).innerHTML = res.day_of_week;
  document.querySelector(
    '.more-information__container-data-week-number'
  ).innerHTML = res.week_number;
  // place.innerHTML = res.time.slice();
};

const renderPage2 = (res, res2) => {
  // console.log(res);
  const place = document.querySelector('.cloak__container-place');
  // place.innerHTML = `in ${res.data.location.city.name}, ${res.data.location.country.alpha2}`;
  place.innerHTML = `in ${res}, ${res2}`;
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

const newQuoute = () => {
  fetch(randonQuoteAPI)
    .then((res) => res.json())
    // .then((res) => console.log(res))
    .then((res) => {
      quouteText.textContent = res.content;
      quouteAuthor.textContent = res.author;
    });
};

quouteRefresh.addEventListener('click', newQuoute);
window.addEventListener('load', newQuoute);

const showMore = () => {
  // console.log('jebac patricka cwela');
  quoute.classList.toggle('quoute--active');
  cloakCon.classList.toggle('cloak--active');
  moreInformation.classList.toggle('more-information--active');
  if (cloakCon.classList.contains('cloak--active')) {
    showMoreButton.innerHTML =
      '<h6>less</h6><div class="show-more-button__circle"><i class="fa-solid fa-angle-up" style="color: #ffffff;"></i></div>';
  } else {
    showMoreButton.innerHTML =
      '<h6>more</h6><div class="show-more-button__circle"><i class="fa-solid fa-angle-down" style="color: #ffffff;"></i></div>';
    // '<h6>more</h6><div class="show-more-button__circle"><img src="assets/desktop/icon-arrow-down.svg" alt="arrowdown"></div>';
  }
};

showMoreButton.addEventListener('click', showMore);
