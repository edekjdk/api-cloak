const ipBaseAPI =
  'https://api.ipbase.com/v2/info?apikey=n2PKHxJs6IOE6W6HmT39RT4SlmZeVd9xMDFxStiY';
const randonQuoteAPI = 'https://api.quotable.io/random';
const quoute = document.querySelector('.quoute');
const cloakCon = document.querySelector('.cloak');
const showMoreButton = document.querySelector('.show-more-button');
const quouteText = document.querySelector('.quoute__text');
const quouteAuthor = document.querySelector('.quoute__author');
const quouteRefresh = document.querySelector('.quoute__refresh');
const moreInformation = document.querySelector('.more-information');
const testTime = document.querySelector('.test');
const zone = document.querySelector('.cloak__cloak-zone');
const place = document.querySelector('.cloak__container-place');
const cloakHeaderImage = document.querySelector('.cloak__header-image');
const cloakHeaderHeading = document.querySelector('.cloak__header-heading');
const background1 = document.querySelector('.b1');
const background2 = document.querySelector('.b2');
const background3 = document.querySelector('.b3');
const moreInformationZone = document.querySelector(
  '.more-information__container-data-zone'
);
const moreInformationDayOfYear = document.querySelector(
  '.more-information__container-data-day-of-year'
);
const moreInformationDayOfWeek = document.querySelector(
  '.more-information__container-data-day-of-week'
);
const moreInformationWeekNumber = document.querySelector(
  '.more-information__container-data-week-number'
);
let time;
let city;
let country;
let currLocation;

const getTimeZone = (call) => {
  // fetch(ipBaseAPI)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     // console.log(res);
  //     currLocation = res.data.timezone.id;
  //     return res;
  //   })
  //   .then((res) => {
  //     call();
  //     return res;
  //   })
  //   .then((res) => renderPage2(res));
  //test
  // currLocation = 'America/Chicago';
  currLocation = 'Europe/Warsaw';
  city = 'Warsaw';
  country = 'PL';
  renderPage2(city, country);
  call();
};

const renderPage = (res) => {
  zone.innerHTML = res.abbreviation;
  moreInformationZone.innerHTML = res.timezone;
  moreInformationDayOfYear.innerHTML = res.day_of_year;
  moreInformationDayOfWeek.innerHTML = res.day_of_week;
  moreInformationWeekNumber.innerHTML = res.week_number;
};

const changeTheme = (hours) => {
  if (hours >= 8 && hours < 20) {
    moreInformation.classList.remove('more-information--dark');
    cloakHeaderImage.setAttribute('src', 'assets/desktop/icon-sun.svg');
    cloakHeaderHeading.innerText = `good morning, it's currently`;
    background1.setAttribute('src', 'assets/mobile/bg-image-daytime.jpg');
    background2.setAttribute('src', 'assets/tablet/bg-image-daytime.jpg');
    background3.setAttribute('src', 'assets/desktop/bg-image-daytime.jpg');
  } else {
    cloakHeaderImage.setAttribute('src', 'assets/desktop/icon-moon.svg');
    cloakHeaderHeading.innerText = `good evening, it's currently`;
    moreInformation.classList.add('more-information--dark');
    background1.setAttribute('src', 'assets/mobile/bg-image-nighttime.jpg');
    background2.setAttribute('src', 'assets/tablet/bg-image-nighttime.jpg');
    background3.setAttribute('src', 'assets/desktop/bg-image-nighttime.jpg');
  }
};

const renderPage2 = (res, res2) => {
  // place.innerHTML = `in ${res.data.location.city.name}, ${res.data.location.country.alpha2}`;
  place.innerHTML = `in ${res}, ${res2}`;
};

const showLocation = (call) => {
  console.log(currLocation);
  let worldTimeAPI = `https://worldtimeapi.org/api/timezone/${currLocation}`;
  fetch(worldTimeAPI)
    .then((res) => res.json())
    .then((res) => {
      time = res.datetime.slice(11, 19);
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
  changeTheme(hours);
  setInterval(() => {
    seconds += 1;
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
      if (minutes === 60) {
        hours += 1;
        minutes = 0;
        changeTheme(hours);
        if (hours === 24) {
          hours = 0;
        }
      }
    }
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
};

const newQuoute = () => {
  fetch(randonQuoteAPI)
    .then((res) => res.json())
    .then((res) => {
      quouteText.textContent = res.content;
      quouteAuthor.textContent = res.author;
    });
};

const showMore = () => {
  quoute.classList.toggle('quoute--active');
  cloakCon.classList.toggle('cloak--active');
  moreInformation.classList.toggle('more-information--active');
  if (cloakCon.classList.contains('cloak--active')) {
    showMoreButton.innerHTML =
      '<h6>less</h6><div class="show-more-button__circle"><i class="fa-solid fa-angle-up" style="color: #ffffff;"></i></div>';
  } else {
    showMoreButton.innerHTML =
      '<h6>more</h6><div class="show-more-button__circle"><i class="fa-solid fa-angle-down" style="color: #ffffff;"></i></div>';
  }
};

getTimeZone(() => {
  showLocation(() => {
    cloak();
  });
});

showMoreButton.addEventListener('click', showMore);
quouteRefresh.addEventListener('click', newQuoute);
window.addEventListener('load', newQuoute);
