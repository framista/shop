const rateStars = [...document.querySelectorAll('.rate')];
let productOpinions;

/*
  set stars, to be shown as selected or notselected
*/
function setActiveStars(grade, starsContainer) {
  const popupIconsStar = starsContainer.querySelectorAll('i');
  popupIconsStar.forEach((icon) => icon.classList.remove('stars--selected'));
  for (let i = 0; i < Math.floor(grade); i++) {
    popupIconsStar[i].classList.add('stars--selected');
  }
}

/*
  set main product info
*/
function updateMainProduct(product) {
  console.log(product);
  const { name, model, oldPrice, price, img1, saving } = product;
  document.querySelector('#price').innerText = price;
  document.querySelector(
    '.single-product .priceold--amount'
  ).innerText = oldPrice;
  document.querySelector(
    '.single-product .priceold--details'
  ).innerText = saving;
  document.querySelector(
    '.single-product .selectedProduct__info--model h3'
  ).innerText = name;
  document.querySelector(
    '.single-product .selectedProduct__info--model p'
  ).innerText = model;
  document
    .querySelectorAll('.product-img-1')
    .forEach((img) => (img.src = img1));
}

/*
  remove all opinions from container with users opinions
*/
function removeChildren(container, classSelected) {
  const containerChildren = [...container.children];
  containerChildren.forEach((child) => {
    if (child.classList.contains(classSelected)) {
      child.remove();
    }
  });
}

/*
  add opinions with selected grade to container with users opinions
*/
function updateRates(grade) {
  const opinionsContainer = document.querySelector('.opinions__lists');
  removeChildren(opinionsContainer, 'list__item');
  const opinionSelectedGrade = productOpinions.opinions.filter((opinion) => {
    return opinion.grade === grade;
  });
  const template = document.getElementById('opinion-item-template');
  opinionSelectedGrade.forEach((opinion) => {
    const item = template.content.cloneNode(true);
    item.querySelector(
      '.stars--note'
    ).innerText = `${opinion.grade}/${opinion.grade}`;
    const userStarsConteiner = item.querySelector('.stars--icon');
    setActiveStars(opinion.grade, userStarsConteiner);
    item.querySelector('.list__item--body').innerText = opinion.content;
    const { name, city, country } = opinion.author;
    item.querySelector(
      '.opinion__author'
    ).innerText = `${name}, ${city}, ${country}`;
    item.querySelector('.opinion__rate--yes .opinion__rate--count').innerText =
      opinion.yesAmount;
    item.querySelector('.opinion__rate--no .opinion__rate--count').innerText =
      opinion.noAmount;
    opinionsContainer.append(item);
  });
}

/*
  count mean value of array with amount of particular rate
*/
function getMeanRate(tab, total) {
  const particularGrades = [...tab].reverse();
  const grades = particularGrades.map((value, index) => value * (index + 1));
  const sum = grades.reduce((a, b) => a + b, 0);
  const mean = sum / total;
  return Math.round(mean * 10) / 10;
}

/*
  set amount of opinions for all rates and update width of rates bar
*/
function updateStars() {
  const { opinions } = productOpinions;
  const amountParticularRates = Array.from(Array(5), (_, i) => i + 1)
    .map((i) => opinions.reduce((n, opinion) => n + (opinion.grade === i), 0))
    .reverse();
  const totalUserOpinion = amountParticularRates.reduce((a, b) => a + b, 0);
  const meanRate = getMeanRate(amountParticularRates, totalUserOpinion);
  const meanRateElement = document.querySelector(
    '.opinions__average--note .stars--note'
  );
  meanRateElement.innerText = meanRate;
  const starsContainer = document.querySelector(
    '.opinions__average--note .stars--icon'
  );
  setActiveStars(meanRate, starsContainer);
  // update grades on main view
  document.querySelector(
    '.single-product .selectedProduct__info--grade .stars p'
  ).innerText = meanRate;
  const mainStarsContainer = document.querySelector(
    '.single-product .selectedProduct__info--grade .stars--icon'
  );
  setActiveStars(meanRate, mainStarsContainer);
  // end update main view
  document.querySelector(
    '.opinions__average--summary'
  ).innerText = `Liczba wystawionych opinii: ${totalUserOpinion}`;
  const ratesAmountContainer = document.querySelector(
    '.opinions__average--rates'
  );
  const ratesAmountContainerChildren = [...ratesAmountContainer.children];
  rateStars.forEach((rate, index) => {
    const count = amountParticularRates[index];
    const rateWidth = (count / totalUserOpinion) * 100;
    const barElement = rate.querySelector('.rate__bar--active');
    barElement.style.width = `${rateWidth}%`;
    ratesAmountContainerChildren[index].querySelector(
      '.rate__count'
    ).innerText = count;
  });
}

/*
  get from a file all users opinions for selected product
*/
function getOpinionsData(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../data/opinionsData.json', true);
  xhr.onload = function () {
    if (this.status === 200) {
      const result = JSON.parse(this.responseText);
      [productOpinions] = result.filter((e) => e.id === parseInt(id, 10));
      updateRates(5);
      updateStars();
    }
  };
  xhr.send();
}

/*
  get from a file information about main product
*/
function getProductData(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../data/shoesData.json', true);
  xhr.onload = function () {
    if (this.status === 200) {
      const result = JSON.parse(this.responseText);
      const [product] = result.filter((e) => e.id === parseInt(id, 10));
      updateMainProduct(product);
    }
  };
  xhr.send();
}

const productId = localStorage.getItem('selectedProduct') || 1;
getOpinionsData(productId);
getProductData(productId);

/*
 action for selected rate stars for product card in order to see customer's opinions
*/
rateStars.forEach((rate) => {
  rate.addEventListener('click', (e) => {
    const selectedRate = e.currentTarget.getAttribute('data-rate');
    const selectedRateAmount = e.currentTarget.lastElementChild.innerText;
    const noRate = document.querySelector('#no-rate');
    const opinionsContainer = document.querySelector('.opinions__lists');
    removeChildren(opinionsContainer, 'list__item');
    if (selectedRateAmount === '0') {
      noRate.classList.remove('hidden');
    } else {
      noRate.classList.add('hidden');
      updateRates(parseInt(selectedRate, 10));
    }
  });
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
function saveSelectedProduct(product) {
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
    add selected product to chart
*/
$('#selectedProduct-add').click(function (e) {
  e.preventDefault();
  if ($('.select__normal--notchoosen').hasClass('hidden')) {
    const size = document.querySelector('#size').innerText;
    const price = document.querySelector('#price').innerText.replace(',', '.');
    const id = document.querySelector('.selectedProduct__priceSchedule').dataset
      .product_id;
    console.log(document.querySelector('.selectedProduct__priceSchedule'));
    saveSelectedProduct({ id, price, size });
  } else {
    $('.select__normal--error').removeClass('hidden');
  }
});

/*
  select to choose the size of shoe
*/
$('.single-product .select__normal').click(function () {
  console.log('klika');
  $('.single-product .select__active').toggleClass('hidden');
  $('.single-product .select__normal--error').addClass('hidden');
  $('.single-product .select__active li').click(function () {
    const size = this.innerText.split(' ')[1];
    const sizeInp = document.querySelector('#size');
    sizeInp.innerText = size;
    const availableAmount = ['Dostępne', 'Niedostępne', 'Ostatnie'];
    const availableInp = document.querySelector('#popup-available');
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
    $('.single-product .select__normal--notchoosen').addClass('hidden');
    $('.single-product .select__normal--choosen').removeClass('hidden');
    $('.single-product .select__active').addClass('hidden');
  });
});
