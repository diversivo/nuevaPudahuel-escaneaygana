
import React, { useEffect, useState, useRef } from 'react';
import MomentumSlider from 'momentum-slider';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Streaming = ({ location }) => {

  // Variables to use later
  // var root = document.documentElement;
  const container = useRef(null);
  const pagination = useRef(null);
  // const [currentIndex, setCurrentIndex] = useState(29);
  const initialIndex = 6;
  const maxRange = 3;
  const range = [0, 11];

  Number.prototype.between = function (a, b) {
    var min = Math.min(a, b),
      max = Math.max(a, b);
    return this > min && this < max;
  };
  // var container = document.querySelector('.container');
  // var button = document.querySelector('.button');
  // var counter = document.querySelector('.counter');
  // var running = false;
  // var timer = null;
  // var seconds = 0;
  // var secondsInitial = 0;
  // Initializing the slider

  let ms = null;
  useEffect(() => {
    const slidersContainer = container.current;
    // Initializing the numbers slider
    var msNumbers = new MomentumSlider({
      el: slidersContainer,
      cssClass: 'ms--numbers',
      range,
      loop: 2,
      rangeContent: function (i) {
        return '0' + i;
      },
      style: {
        transform: [{ scale: [0.4, 1] }],
        opacity: [0, 1]
      },
      interactive: false
    });

    // Initializing the titles slider
    var titles = [
      'King of the Ring Fight',
      'Sound of Streets',
      'Urban Fashion',
      'Windy Sunset',
      'King of the Ring Fight',
      'Sound of Streets',
      'Urban Fashion',
      'Windy Sunset',
      'King of the Ring Fight',
      'Sound of Streets',
      'Urban Fashion',
      'Windy Sunset',
    ];
    var msTitles = new MomentumSlider({
      el: slidersContainer,
      cssClass: 'ms--titles',
      range,
      rangeContent: function (i) {
        return '<h3>' + titles[i] + '</h3>';
      },
      vertical: true,
      reverse: true,
      style: {
        opacity: [0, 1]
      },
      interactive: false
    });

    // Initializing the links slider
    var msLinks = new MomentumSlider({
      el: slidersContainer,
      cssClass: 'ms--links',
      range,
      rangeContent: function () {
        return '<a class="ms-slide__link">View Case</a>';
      },
      vertical: true,
      interactive: false
    });

    // Get pagination items
    var pagination = document.querySelector('.pagination');
    var paginationItems = [].slice.call(pagination.children);

    // Initializing the images slider
    var msImages = new MomentumSlider({
      // Element to append the slider
      el: slidersContainer,
      // CSS class to reference the slider
      cssClass: 'ms--images',
      // Generate the 4 slides required
      currentIndex: initialIndex,
      range,
      rangeContent: function () {
        return '<div class="ms-slide__image-container"><div class="ms-slide__image"></div></div>';
      },
      // Syncronize the other sliders
      sync: [msNumbers, msTitles, msLinks],
      // Styles to interpolate as we move the slider
      style: {
        '.ms-slide__image': {
          transform: [{ scale: [1.5, 1] }],
          opacity: [0.1, 1]
        }
      },
      // Update pagination if slider change
      change: function (newIndex, oldIndex) {
        if (typeof oldIndex !== 'undefined') {
          paginationItems[oldIndex].classList.remove('pagination__item--active');
        }
        paginationItems[newIndex].classList.add('pagination__item--active');
      }
    });

    // Select corresponding slider item when a pagination button is clicked
    pagination.addEventListener('click', function (e) {
      if (e.target.matches('.pagination__button')) {
        var index = paginationItems.indexOf(e.target.parentNode);
        msImages.select(index);
      }
    });

    // while(ms.getCurrentIndex()<59){
    //   ms.next();
    //   console.log(ms.getCurrentIndex());
    // }

    // setInterval(()=>ms.next(),10);


    // setTimeout(()=>{
    //   ms.next();
    //   console.log(ms.getCurrentIndex());
    // },2000)


    container.current.addEventListener('mouseup', () => {
      setTimeout(() => {
        setInterval(() => animationinterval(msImages), 50);
      }, 50)
    });
  }, []);

  const animationinterval = (ms) => {
    const index = ms.getCurrentIndex();

    const ii = initialIndex;
    if (index.between(ii, ii - maxRange)) {
      ms.prev();
    } else if (index.between(ii, ii + maxRange)) {
      ms.next();
    } else if (index != initialIndex) {
      ms.disable();
    }
  };

  // useEffect(() => {
  //   if(ms){
  //     ms.select(2);

  //   }
  // }, [currentIndex]);

  // // Simple toggle functionality
  // button.addEventListener('click', function () {
  //   if (running) {
  //     stop();
  //   } else {
  //     start();
  //   }
  //   running = !running;
  // });

  // Start the countdown
  // function start() {
  //   // Disable the slider during countdown
  //   ms.disable();
  //   // Get current slide index, and set initial values
  //   seconds = ms.getCurrentIndex() + 1;
  //   counter.innerText = secondsInitial = seconds;
  //   root.style.setProperty('--progress', 0);
  //   // Add class to trigger CSS transitions for `running` state
  //   container.classList.add('container--running');
  //   // Set interval to update the component every second
  //   timer = setInterval(function () {
  //     // Update values
  //     counter.innerText = --seconds;
  //     root.style.setProperty('--progress', (secondsInitial - seconds) / secondsInitial * 100);
  //     // Stop countdown if it's finished
  //     if (!seconds) {
  //       stop();
  //       running = false;
  //     }
  //   }, 1000);
  // }

  // Stop the countdown
  // function stop() {
  //   // Enable slider
  //   ms.enable();
  //   // Clear interval
  //   clearInterval(timer);
  //   // Reset progress
  //   root.style.setProperty('--progress', 100);
  //   // Remove `running` state
  //   container.classList.remove('container--running');
  // }

  return (<Layout>
    <SEO title="Desliza y gana - Nueva Pudahuel" />
    <div className="container">
      <main ref={container} className="sliders-container">
        <ul ref={pagination} className="pagination">
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
          <li className="pagination__item"><a className="pagination__button"></a></li>
        </ul>
      </main>
      <footer className="footer">
        <nav className="footer__menu">
          <ul className="footer__menu__list">
            <li className="footer__menu__item"><a className="footer__menu__link">facebook</a></li>
            <li className="footer__menu__item"><a className="footer__menu__link">dribbble</a></li>
            <li className="footer__menu__item"><a className="footer__menu__link">instagram</a></li>
          </ul>
        </nav>
      </footer>
    </div>

  </Layout>);
}


export default Streaming;