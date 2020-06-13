const menuItems = document.querySelectorAll('.menu p');
const menuLists = [...document.querySelectorAll('.menu ul')];
const carriers = document.querySelector('#carriers');
const socialMedia = document.querySelector('.socialMedia');
const nav = document.querySelector('nav');
const submenu = document.querySelector('header > nav > ul');
const submenuLiTemp = [...document.querySelectorAll('header > nav > ul > li')];
const hamburger = document.querySelector('#contact--hamburger');
const breakPointSm = 576;
const breakPointMd = 768;
const breakPointLg = 951;
const prevWidth = window.innerWidth;
const rateStars = [...document.querySelectorAll('.rate')];
// const breakPointXl = 1200;

let levelMenu = 0;

const navArrows = [...document.querySelectorAll('.nav--arrow > img')];

const elementsToHideOnMobile = [
  ...menuLists,
  carriers,
  socialMedia,
  hamburger,
  nav,
  submenu,
];

function showMenuItems() {
  if (window.innerWidth < breakPointLg) {
    elementsToHideOnMobile.forEach((el) => el.classList.add('hidden'));
    if (window.innerWidth > breakPointMd) {
      [...menuLists].forEach((el) => el.classList.remove('hidden'));
    }
  } else {
    elementsToHideOnMobile.forEach((el) => el.classList.remove('hidden'));
    hamburger.classList.remove('showHamburger');
  }
}
showMenuItems();
window.addEventListener('resize', () => {
  const currentWidth = window.innerWidth;
  if (currentWidth > breakPointMd && prevWidth < breakPointMd) {
    window.location.reload(true);
  } else if (currentWidth < breakPointMd && prevWidth > breakPointMd) {
    window.location.reload(true);
  }
});

menuItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (window.innerWidth < breakPointLg) {
      const visibleElements = menuLists.filter(
        (ul) => ul !== item.nextElementSibling
      );
      visibleElements.forEach((el) => el.classList.add('hidden'));
      e.target.nextElementSibling.classList.toggle('hidden');
    }
  });
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('showHamburger');
  submenu.classList.toggle('hidden');
  nav.classList.toggle('hidden');
});

function nextSubmenu(e) {
  const selectedLi = $(e.target).closest('li')[0];
  const selectedLiDiv = selectedLi.querySelector('div');
  const selectedUl = $(selectedLi).closest('ul')[0];
  const selectedUlChildren = selectedUl.querySelectorAll('li');
  selectedUlChildren.forEach((li) => {
    if (li !== selectedLi) {
      li.style.display = 'none';
    }
  });
  selectedLiDiv.classList = 'nav--arrow--prev';
  const nextUl = selectedLi.querySelector('ul');
  nextUl.classList = 'show';
  const nexlUlLi = nextUl.querySelectorAll('li');
  nexlUlLi.forEach((li) => (li.style.display = 'flex'));
  if (levelMenu === 2) {
    selectedLi.parentNode.classList.add('moveElement');
  }
}

function startSubmenu(e) {
  const selectedLi = $(e.target).closest('li')[0];
  const selectedLiDiv = selectedLi.querySelector('div');
  selectedLiDiv.classList = 'nav--arrow';
  const submenuLi = [...submenu.querySelectorAll('li')];
  const submenuUl = [...submenu.querySelectorAll('ul')];
  submenuUl.forEach((ul) => (ul.classList = ''));
  submenuLi.forEach((li) => (li.style.display = 'flex'));
}

function prevSubmenu(e) {
  const selectedLi = $(e.target).closest('li')[0];
  const selectedLiDiv = selectedLi.querySelector('div');
  selectedLiDiv.classList = 'nav--arrow';
  const nextUl = selectedLi.querySelector('ul');
  nextUl.classList = '';
  const nexlUlLi = nextUl.querySelectorAll('li');
  nexlUlLi.forEach((li) => (li.style.display = 'none'));
  const selectedLiParentChildrens = [
    ...selectedLi.parentNode.querySelectorAll('li'),
  ];
  selectedLiParentChildrens.forEach((li) => (li.style.display = 'flex'));
  selectedLi.parentNode.classList.remove('moveElement');
}

navArrows.forEach((arrow) => {
  arrow.addEventListener('click', (e) => {
    if (window.innerWidth <= breakPointLg) {
      switch (levelMenu) {
        case 0:
          levelMenu++;
          nextSubmenu(e);
          break;
        case 1:
          const prevArrow = e.path[1].classList.contains('nav--arrow--prev');
          if (prevArrow) {
            levelMenu = 0;
            startSubmenu(e);
          } else {
            levelMenu++;
            nextSubmenu(e);
          }
          break;
        case 2:
          levelMenu--;
          prevSubmenu(e);
          break;
      }
    }
  });
});

submenuLiTemp.forEach((li) => {
  li.addEventListener('click', (e) => {
    if (
      window.innerWidth > breakPointLg &&
      !li.classList.contains('li--onlymobile') &&
      $(li).has('ul').length
    ) {
      e.preventDefault();
      submenuLiTemp.forEach((submenuLi) => {
        const element = submenuLi.querySelector('ul');
        if (
          submenuLi !== li &&
          element &&
          element.classList.contains('subnav')
        ) {
          element.classList = 'hidden';
        }
      });
      li.querySelector('ul').classList.toggle('hidden');
      li.querySelector('ul').classList.toggle('subnav');
    }
  });
});

$(document).ready(function () {
  $('.slider--shoes').slick({
    infinite: true,
    speed: 1,
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
  $('.slider--products').slick({
    infinite: true,
    speed: 1,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: breakPointLg,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: breakPointMd,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: breakPointSm,
        settings: {
          centerMode: true,
          arrows: false,
          slidesToShow: 1.2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  });
  $('.slider--instagram').slick({
    infinite: true,
    speed: 1,
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
  $('.selectedProduct__info--slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.selectedProduct__info--sliderSide',
    responsive: [
      {
        breakpoint: breakPointLg,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: breakPointMd,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: breakPointSm,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
    ],
  });
  $('.selectedProduct__info--sliderSide').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.selectedProduct__info--slider',
    vertical: true,
    verticalSwiping: true,
    arrows: true,
    focusOnSelect: true,
    outerEdgeLimit: true,
    centerMode: true,
  });
  $('.slider--accessories').slick({
    infinite: true,
    speed: 1,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
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

$('.select__normal').click(function () {
  $('.select__active').toggleClass('hidden');
  $('.select__normal--error').addClass('hidden');
  $('.select__active li').click(function () {
    const size = this.innerText.split(' ')[1];
    const sizeInp = document.querySelector('#size');
    sizeInp.innerText = size;
    const availableAmount = ['Dostępne', 'Niedostępne', 'Ostatnie'];
    const availableInp = document.querySelector('#available');
    availableInp.innerText = availableAmount[parseInt(size, 10) % 3];
    $('.select__normal--choosen-available').removeClass('not few');
    switch (availableInp.innerText) {
      case 'Niedostępne':
        $('.select__normal--choosen-available').addClass('not');
        break;
      case 'Ostatnie':
        $('.select__normal--choosen-available').addClass('few');
        break;
    }
    $('.select__normal--notchoosen').addClass('hidden');
    $('.select__normal--choosen').removeClass('hidden');
    $('.select__active').addClass('hidden');
  });
});

$('.btn').click(function (e) {
  e.preventDefault();
  if (!$('.select__normal--notchoosen').hasClass('hidden')) {
    $('.select__normal--error').removeClass('hidden');
  }
});

// action for selected rate stars for product card in order to see customer's opinions
rateStars.forEach((rate) => {
  rate.addEventListener('click', (e) => {
    const selectedRate = e.currentTarget.getAttribute('data-rate');
    const selectedRateAmount = e.currentTarget.lastElementChild.innerText;
    const noRate = document.querySelector('#no-rate');
    const allOpinions = [...document.querySelectorAll('.list__item')];
    if (selectedRateAmount === '0') {
      noRate.classList.remove('hidden');
      allOpinions.forEach((opinion) => opinion.classList.add('hidden'));
    } else {
      noRate.classList.add('hidden');
      allOpinions.forEach((opinion) => {
        if (opinion.dataset.rateOpinion === selectedRate) {
          opinion.classList.remove('hidden');
        } else {
          opinion.classList.add('hidden');
        }
      });
    }
  });
});
