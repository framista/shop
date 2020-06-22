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

function closePopupWaiting() {
  const popupWaiting = document.querySelector('#popup-waiting');
  popupWaiting.innerHTML = '';
  popupWaiting.setAttribute('style', `width: 0px; height: 0px`);
  const popup = document.querySelector('.popup-product');
  popup.style.overflow = 'auto';
}

function updateProduct(product) {
  const { id, name, model, oldPrice, price, saving, grade, img1 } = product;
  document.querySelector('.popup-product').dataset.popup_id = id;
  document.querySelector('#popup-name').innerText = name;
  document.querySelector('#popup-model').innerText = model;
  document.querySelector('#popup-oldprice').innerText = oldPrice;
  document.querySelector('#popup-price').innerText = price;
  document.querySelector('#popup-saving').innerText = saving;
  document.querySelector('#popup-grade').innerText = grade;
  document.querySelectorAll('.popup-img-1').forEach((img) => (img.src = img1));
  const popupStars = document.querySelector('#popup-stars');
  const popupIconsStar = popupStars.querySelectorAll('i');
  popupIconsStar.forEach((icon) => icon.classList.remove('stars--selected'));
  for (let i = 0; i < Math.floor(grade); i++) {
    popupIconsStar[i].classList.add('stars--selected');
  }
}

function getProductData(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../data/shoesData.json', true);
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
    const currentWidth = window.innerWidth;
    if (currentWidth > 1150) {
      $('.popup-product .select__normal--notchoosen').removeClass('hidden');
      $('.popup-product .select__normal--choosen').addClass('hidden');
      const popup = document.querySelector('.popup-product');
      const popupWaiting = document.querySelector('#popup-waiting');
      popupWaiting.setAttribute('data-popup-waiting', 'message');
      const productItem = button.closest('.product__item');
      const idProduct = productItem.dataset.product;
      getProductData(idProduct);
      openPopup(popup);
    }
  });
});

closeProductPopup.addEventListener('click', () => {
  const popup = document.querySelector('.popup-product');
  closePopup(popup);
});

overlay.addEventListener('click', () => {
  const popupWaiting = document.querySelector('#popup-waiting');
  const waitingType = popupWaiting.getAttribute('data-popup-waiting');
  if (waitingType !== 'loader') {
    closePopupWaiting();
    const popups = document.querySelectorAll('.popup-product--active');
    popups.forEach((popup) => closePopup(popup));
    closePopupWaiting();
  }
});

/*
  update basket amount and price
*/
function updateBasket(data) {
  const basketPrice = document.querySelector('#basket-price');
  basketPrice.innerText = `${Math.round(data.priceTotal * 100) / 100} zł`;
  const basketAmount = document.querySelector('#basket-amount');
  basketAmount.innerText = data.products.length;
}

/*
    save product
*/
function saveProduct(product) {
  const { id, price, size } = product;
  const basketData = JSON.parse(localStorage.getItem('basket')) || {
    priceTotal: 0,
    products: [],
  };
  basketData.priceTotal += parseFloat(price);
  basketData.products.push({ id, size, amount: 1 });
  localStorage.setItem('basket', JSON.stringify(basketData));
  updateBasket(basketData);
}

/*
  add product to chart - show loader and verify if size is selected
*/
$('#popup-product-add').click(function (e) {
  e.preventDefault();
  const popupWaiting = document.querySelector('#popup-waiting');
  const popup = document.querySelector('.popup-product');
  popup.style.overflow = 'hidden';
  const { width, height } = popup.getBoundingClientRect();
  popupWaiting.setAttribute(
    'style',
    `width: ${Math.floor(width)}px; height: ${Math.floor(height)}px`
  );
  if (!$('.popup-product .select__normal--notchoosen').hasClass('hidden')) {
    $('.popup-product .select__normal--error').removeClass('hidden');
    popupWaiting.innerHTML = `Proszę wybierz rozmiar <br /> jaki chciałbyś kupić`;
  } else {
    const size = document.querySelector('#popup-size').innerText;
    const price = document
      .querySelector('#popup-price')
      .innerText.replace(',', '.');
    const id = document.querySelector('.popup-product').dataset.popup_id;
    saveProduct({ id, price, size });
    popupWaiting.setAttribute('data-popup-waiting', 'loader');
    popupWaiting.innerHTML = `
      <svg> 
        <circle cx="70" cy="70" r="70"></circle>
      </svg> 
    `;
    setTimeout(() => {
      closePopup(popup);
      closePopupWaiting();
    }, 3000);
  }
});

/*
  close overlay with info - only choose size 
*/
$('#popup-waiting').click(function () {
  const popupWaiting = document.querySelector('#popup-waiting');
  const waitingType = popupWaiting.getAttribute('data-popup-waiting');
  if (waitingType === 'message') {
    closePopupWaiting();
  }
});
