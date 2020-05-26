const menuItems = document.querySelectorAll('.menu p');
const menuLists = [...document.querySelectorAll('.menu ul')];
const carriers = document.querySelector('#carriers');
const socialMedia = document.querySelector('.socialMedia');
const breakPointMd = 768;

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
