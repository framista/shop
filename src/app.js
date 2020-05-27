const menuItems = document.querySelectorAll('.menu p');
const menuLists = [...document.querySelectorAll('.menu ul')];
const carriers = document.querySelector('#carriers');
const socialMedia = document.querySelector('.socialMedia');
const breakPointSm = 576;
const breakPointMd = 768;
const breakPointLg = 992;
// const breakPointXl = 1200;

const elements = [...menuLists, carriers, socialMedia];

function showMenuItems() {
  if (window.innerWidth < breakPointMd) {
    elements.forEach((el) => el.classList.add('hidden'));
  } else {
    elements.forEach((el) => el.classList.remove('hidden'));
  }
}

showMenuItems();

window.addEventListener('resize', () => showMenuItems());

menuItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (window.innerWidth < breakPointMd) {
      const visibleElements = menuLists.filter(
        (ul) => ul !== item.nextElementSibling
      );
      visibleElements.forEach((el) => el.classList.add('hidden'));
      e.target.nextElementSibling.classList.toggle('hidden');
    }
  });
});

$(document).ready(function () {
  $('.slider--shoes').slick({
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: breakPointLg,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: breakPointMd,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: breakPointSm,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  });
});

$(document).ready(function () {
  $('.slider--instagram').slick({
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: breakPointLg,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: breakPointMd,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: breakPointSm,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  });
});
