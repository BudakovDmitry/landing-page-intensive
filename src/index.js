/* eslint-disable radix */
import './styles.scss';
import './index.html';

function windowLoad() {
  function digistCountersAnimate(digistCounter) {
    let startTimestamp = null;
    const duration = parseInt(digistCounter.dataset.digistCounter)
      ? parseInt(digistCounter.dataset.digistCounter)
      : 1500;
    const startValue = parseInt(digistCounter.innerHTML);
    const startPosition = 0;

    const step = (timestap) => {
      if (!startTimestamp) {
        startTimestamp = timestap;
      }
      const progress = Math.min((timestap - startTimestamp) / duration, 1);
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
    const digistCounters =
      digistCountersItems || document.querySelectorAll('[data-digits-counter]');

    if (digistCounters) {
      digistCounters.forEach((digistCounter) => {
        digistCountersAnimate(digistCounter);
      });
    }
  }

  const options = {
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries, observ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const digitsCountersItems = targetElement.querySelectorAll('[data-digits-counter]');

        if (digitsCountersItems.length) {
          digistCountersInit(digitsCountersItems);
        }

        observ.unobserve(targetElement);
      }
    });
  }, options);

  const sections = document.querySelectorAll('.statistics__container');
  if (sections.length) {
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
}

window.addEventListener('load', windowLoad);
