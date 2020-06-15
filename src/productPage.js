const rateStars = [...document.querySelectorAll('.rate')];

/*
 action for selected rate stars for product card in order to see customer's opinions
*/

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

/*
 set correct width of active bar for rates
*/

const totalUserOpinion = document
  .querySelector('.opinions__average--summary')
  .innerText.split(': ')[1];
rateStars.forEach((rate) => {
  const count = rate.lastElementChild.innerText;
  const rateWidth = (count / totalUserOpinion) * 100;
  const barElement = rate.querySelector('.rate__bar--active');
  barElement.style.width = `${rateWidth}%`;
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
