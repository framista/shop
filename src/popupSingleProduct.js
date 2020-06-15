const openProductPopupButtons = document.querySelectorAll(
  '.product__item--add'
);
const closeProductPopup = document.querySelector('#product-popup-close');
const overlay = document.querySelector('.overlay');

/*
 action for showing popup with selected product
*/

function openPopup(popup) {
  if (popup == null) return;
  popup.classList.add('popup-product--active');
  overlay.classList.add('overlay--active');
}

function closePopup(popup) {
  if (popup == null) return;
  popup.classList.remove('popup-product--active');
  overlay.classList.remove('overlay--active');
}

function updateProduct(product) {
  const { name, model, oldPrice, price, saving, grade, img1 } = product;
  document.querySelector('#popup-name').innerText = name;
  document.querySelector('#popup-model').innerText = model;
  document.querySelector('#popup-oldprice').innerText = oldPrice;
  document.querySelector('#popup-price').innerText = price;
  document.querySelector('#popup-saving').innerText = saving;
  document.querySelector('#popup-grade').innerText = grade;
  document.querySelectorAll('.popup-img-1').forEach((img) => (img.src = img1));
  console.log(document.querySelector('#popup-stars'));
  const popupStars = document.querySelector('#popup-stars');
  const popupIconsStar = popupStars.querySelectorAll('i');
  popupIconsStar.forEach((icon) => icon.classList.remove('stars--selected'));
  for (let i = 0; i < Math.floor(grade); i++) {
    popupIconsStar[i].classList.add('stars--selected');
  }
}

function getProductData(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './src/shoesData.json', true);
  xhr.onload = function () {
    if (this.status === 200) {
      const result = JSON.parse(this.responseText);
      const product = result.filter((e) => e.id === parseInt(id, 10))[0];
      updateProduct(product);
    }
  };
  xhr.send();
}

openProductPopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = document.querySelector('.popup-product');
    const idProduct = button.dataset.product;
    getProductData(idProduct);
    openPopup(popup);
  });
});

closeProductPopup.addEventListener('click', () => {
  const popup = document.querySelector('.popup-product');
  closePopup(popup);
});

overlay.addEventListener('click', () => {
  const popups = document.querySelectorAll('.popup-product--active');
  popups.forEach((popup) => closePopup(popup));
});
