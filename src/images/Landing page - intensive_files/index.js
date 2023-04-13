/* eslint-disable radix */
import './styles.scss';
import './index.html';
import Swiper, { Navigation, Pagination } from 'swiper';
function windowLoad() {
  function digistCountersAnimate(digistCounter) {
    var startTimestamp = null;
    var duration = parseInt(digistCounter.dataset.digistCounter) ? parseInt(digistCounter.dataset.digistCounter) : 1500;
    var startValue = parseInt(digistCounter.innerHTML);
    var startPosition = 0;
    var step = function step(timestap) {
      if (!startTimestamp) {
        startTimestamp = timestap;
      }
      var progress = Math.min((timestap - startTimestamp) / duration, 1);
      // eslint-disable-next-line no-param-reassign
      digistCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  function digistCountersInit(digistCountersItems) {
    // eslint-disable-next-line operator-linebreak
    var digistCounters = digistCountersItems || document.querySelectorAll('[data-digits-counter]');
    if (digistCounters) {
      digistCounters.forEach(function (digistCounter) {
        digistCountersAnimate(digistCounter);
      });
    }
  }
  var options = {
    threshold: 0.3
  };
  var observer = new IntersectionObserver(function (entries, observ) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var targetElement = entry.target;
        var digitsCountersItems = targetElement.querySelectorAll('[data-digits-counter]');
        if (digitsCountersItems.length) {
          digistCountersInit(digitsCountersItems);
        }
        observ.unobserve(targetElement);
      }
    });
  }, options);
  var sections = document.querySelectorAll('.statistics__container');
  if (sections.length) {
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // eslint-disable-next-line no-unused-vars
  var swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      1200: {
        slidesPerView: 2,
        spaceBetween: 100
      }
    }
  });

  // const swiperContainer = document.querySelector('.swiper');
  // const buttonPrev = document.querySelector('.swiper-button-prev');
  // const buttonNext = document.querySelector('.swiper-button-next');

  // if (swiperContainer) {
  //   swiperContainer.addEventListener('mouseover', () => {
  //     buttonPrev.classList.add('hover');
  //     buttonNext.classList.add('hover');
  //   });

  //   swiperContainer.addEventListener('mouseout', () => {
  //     buttonPrev.classList.remove('hover');
  //     buttonNext.classList.remove('hover');
  //   });
  // }
}

window.addEventListener('load', windowLoad);