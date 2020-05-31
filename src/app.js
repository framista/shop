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
  } else {
    elementsToHideOnMobile.forEach((el) => el.classList.remove('hidden'));
    hamburger.classList.remove('showHamburger');
  }
}
showMenuItems();
window.addEventListener('resize', () => window.location.reload(true));

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
});
