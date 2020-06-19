const rateStars = [...document.querySelectorAll('.rate')];
let productOpinions;

/*
  remove all opinions from container with users opinions
*/
function removeOpinions(opinionsContainer) {
  const opinionsContainerChildren = [...opinionsContainer.children];
  opinionsContainerChildren.forEach((child) => {
    if (child.classList.contains('list__item')) {
      child.remove();
    }
  });
}

/*
  set stars, to be shown as selected or notselected
*/
function setActiveStars(grade, starsContainer) {
  const popupIconsStar = starsContainer.querySelectorAll('i');
  popupIconsStar.forEach((icon) => icon.classList.remove('stars--selected'));
  for (let i = 0; i < grade; i++) {
    popupIconsStar[i].classList.add('stars--selected');
  }
}

/*
  add opinions with selected grade to container with users opinions
*/
function updateRates(grade) {
  const opinionsContainer = document.querySelector('.opinions__lists');
  removeOpinions(opinionsContainer);
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
  set amount of opinions for all rates and update width of rates bar
*/
function updateStars() {
  const { opinions } = productOpinions;
  const amountParticularRates = Array.from(Array(5), (_, i) => i + 1)
    .map((i) => opinions.reduce((n, opinion) => n + (opinion.grade === i), 0))
    .reverse();
  const totalUserOpinion = amountParticularRates.reduce((a, b) => a + b, 0);
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

const productId = 1;
getOpinionsData(productId);

/*
 action for selected rate stars for product card in order to see customer's opinions
*/
rateStars.forEach((rate) => {
  rate.addEventListener('click', (e) => {
    const selectedRate = e.currentTarget.getAttribute('data-rate');
    const selectedRateAmount = e.currentTarget.lastElementChild.innerText;
    const noRate = document.querySelector('#no-rate');
    const opinionsContainer = document.querySelector('.opinions__lists');
    removeOpinions(opinionsContainer);
    if (selectedRateAmount === '0') {
      noRate.classList.remove('hidden');
    } else {
      noRate.classList.add('hidden');
      updateRates(parseInt(selectedRate, 10));
    }
  });
});

/*
    add selected product to chart
*/
$('#selectedProduct-add').click(function (e) {
  e.preventDefault();
  if (!$('.select__normal--notchoosen').hasClass('hidden')) {
    $('.select__normal--error').removeClass('hidden');
  }
});
