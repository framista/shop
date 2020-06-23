const menuItems = document.querySelectorAll('.menu p');
const menuLists = [...document.querySelectorAll('.menu ul')];
const carriers = document.querySelector('#carriers');
const socialMedia = document.querySelector('.socialMedia');
const nav = document.querySelector('nav');
const submenu = document.querySelector('header > nav > ul');
const submenuLiTemp = [...document.querySelectorAll('header > nav > ul > li')];
const hamburger = document.querySelector('#contact--hamburger');
// const breakPointSm = 576;
const breakPointMd = 768;
const breakPointLg = 951;
// const breakPointXl = 1200;
const prevWidth = window.innerWidth;
let levelMenu = 0;
const navArrows = [...document.querySelectorAll('.nav--arrow > img')];

let allProducts = null;
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

/*
  round price to 2 numbers precision
*/
function roundPrice(number) {
  return Math.round(number * 100) / 100;
}

/*
  update basket amount and price
*/
function updateBasket(data) {
  const basketPrice = document.querySelector('#basket-price');
  basketPrice.innerText = `${roundPrice(data.priceTotal)} zł`;
  const basketAmount = document.querySelector('#basket-amount');
  basketAmount.innerText = data.products.length;
}

const basketData = JSON.parse(localStorage.getItem('basket')) || {
  priceTotal: 0,
  products: [],
};
updateBasket(basketData);

/*
  create product to basket
*/
function createProduct(product, index) {
  const { id, size, amount } = product;
  const [selectedProduct] = allProducts.filter(
    (p) => parseInt(id, 10) === p.id
  );
  const productsConteiner = document.querySelector('.basket__products');
  const template = document.querySelector('#basket-products-item');
  const item = template.content.cloneNode(true);
  const div = item.querySelector('.basket__products--item');
  div.dataset.product = index;
  item.querySelector('img').src = selectedProduct.img1;
  item.querySelector('.basket__products--name').innerText =
    selectedProduct.name;
  item.querySelector('.basket__products--model').innerText =
    selectedProduct.model;
  item.querySelector('.basket__products--size span').innerText = size;
  item.querySelector('.basket__products--oneprice').innerText =
    selectedProduct.price;
  item.querySelector('.basket__amount--current').innerText = amount;
  const priceForProducts =
    amount * parseFloat(selectedProduct.price.replace(',', '.'));
  const priceForProductsToString = priceForProducts
    .toString()
    .replace('.', ',');
  item.querySelector(
    '.basket__products--totalprice'
  ).innerText = priceForProductsToString;
  if (amount === 1) {
    item
      .querySelector('.basket__sign--minus')
      .classList.add('basket__sign--disabled');
  }
  productsConteiner.append(item);
}

/*
  update total prices products in basket and 
*/
function updatePrices(priceTotal) {
  const delivery = 13;
  const priceTotalToString = roundPrice(priceTotal)
    .toString()
    .replace('.', ',');
  document.querySelector(
    '#basket-total-price-without-delivery'
  ).innerText = priceTotalToString;
  const priceWithDelivery = roundPrice(priceTotal + delivery);
  const priceWithDeliveryToString = priceWithDelivery
    .toString()
    .replace('.', ',');
  document.querySelector(
    '#basket-total-price'
  ).innerText = priceWithDeliveryToString;
}

/*
  amount of products in basket
*/
function updateAmountProducts(number) {
  document.querySelector('#basket-products-amount').innerText = number;
}

/*
  count total price in basket including amounts of products
*/
function countTotalPrice(products) {
  const total = products.reduce((prev, curr) => {
    const [selectedProduct] = allProducts.filter(
      (p) => parseInt(curr.id, 10) === p.id
    );
    const productPrice = parseFloat(selectedProduct.price.replace(',', '.'));
    return prev + curr.amount * productPrice;
  }, 0);
  return total;
}

/*
  delete product
*/
function deleteProduct(e) {
  e.preventDefault();
  const clickedElement = e.target;
  const productItem = clickedElement.closest('.basket__products--item');
  productItem.remove();
  const { products } = JSON.parse(localStorage.getItem('basket'));
  const productToDeleteId = productItem.dataset.product;
  products.splice(productToDeleteId, 1);
  const updatedPriceTotal = countTotalPrice(products);
  localStorage.setItem(
    'basket',
    JSON.stringify({ priceTotal: updatedPriceTotal, products })
  );
  window.location.reload();
}

/*
  change amount of product
*/
function changeProductAmount(e) {
  const clickedElement = e.target;
  const productItem = clickedElement.closest('.basket__products--item');
  const amountProductElement = productItem.querySelector(
    '.basket__amount--current'
  );
  let amountProduct = parseInt(amountProductElement.innerText, 10);
  const sign = clickedElement.classList.contains('basket__sign--minus')
    ? 'minus'
    : 'plus';
  if (sign === 'minus') {
    if (amountProduct === 1) {
      clickedElement.classList.add('basket__sign--disabled');
    } else {
      amountProduct--;
      if (amountProduct === 1) {
        clickedElement.classList.add('basket__sign--disabled');
      }
    }
    amountProductElement.innerText = amountProduct;
  } else {
    const minusSignButton = productItem.querySelector('.basket__sign--minus');
    amountProduct++;
    amountProductElement.innerText = amountProduct;
    if (amountProduct !== 1) {
      minusSignButton.classList.remove('basket__sign--disabled');
    }
  }
  const totalPriceProductElement = productItem.querySelector(
    '.basket__products--totalprice'
  );
  const productPrice = parseFloat(
    productItem
      .querySelector('.basket__products--oneprice')
      .innerText.replace(',', '.')
  );
  totalPriceProductElement.innerText = roundPrice(productPrice * amountProduct)
    .toString()
    .replace('.', ',');
  const { products } = JSON.parse(localStorage.getItem('basket'));
  const productToChangeAmountId = productItem.dataset.product;
  products[productToChangeAmountId].amount = amountProduct;
  const updatedPriceTotal = countTotalPrice(products);
  localStorage.setItem(
    'basket',
    JSON.stringify({ priceTotal: updatedPriceTotal, products })
  );
  updatePrices(updatedPriceTotal);
  updateBasket({ priceTotal: updatedPriceTotal, products });
}

/*
  get data about products in basket from local storage
*/
function getProductsBasket() {
  const data = JSON.parse(localStorage.getItem('basket'));
  updatePrices(data.priceTotal);
  const { products } = data;
  const basketNoProductElement = document.querySelector('#basket-no-product');
  if (products.length > 0) {
    basketNoProductElement.classList.add('hidden');
    updateAmountProducts(products.length);
    products.forEach((product, index) => createProduct(product, index));
    const deleteProductButtons = [
      ...document.querySelectorAll('.basket__products--delete'),
    ];
    deleteProductButtons.forEach((button) =>
      button.addEventListener('click', (e) => deleteProduct(e))
    );
    const changeAmountOfProductButtons = [
      ...document.querySelectorAll('.basket__sign'),
    ];
    changeAmountOfProductButtons.forEach((button) =>
      button.addEventListener('click', (e) => changeProductAmount(e))
    );
  } else {
    basketNoProductElement.classList.remove('hidden');
  }
}

/*
  get data about products from json file
*/
function getAllProductsData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../data/shoesData.json', true);
  xhr.onload = function () {
    if (this.status === 200) {
      allProducts = JSON.parse(this.responseText);
      getProductsBasket();
    }
  };
  xhr.send();
}
getAllProductsData();
