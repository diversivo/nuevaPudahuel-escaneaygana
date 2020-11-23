
import React, { useEffect, useState, useRef } from 'react';
import MomentumSlider from 'momentum-slider';

import Layout from '../components/layout';
import SEO from '../components/seo';
import testImage from '../assets/images/ruleta_test.png';

const Streaming = ({ location }) => {

  // Variables to use later
  // var root = document.documentElement;
  const container = useRef(null);
  const [imgSlider, setImgSlider] = useState(null);
  const initialIndex = 5;
  const minMovement = 30;
  const winner = 3;
  const loop = 2;
  const range = [0, 9];

  const titles = [
    '40% de descuento en 1 cosas',
    '40% de descuento en 2 cosas',
    '40% de descuento en 3 cosas',
    '40% de descuento en 4 cosas',
    '40% de descuento en 5 cosas',
    '40% de descuento en 6 cosas',
    '40% de descuento en 7 cosas',
    '40% de descuento en 8 cosas',
    '40% de descuento en 9 cosas',
    '40% de descuento en 10 cosas'
  ];

  const legals = [
    'Hasta agotar stock.',
    'Hasta agotar stock.',
    'Hasta agotar stock.',
    'Hasta agotar stock.',
    'Hasta agotar stock.',
    'Hasta agotar stock.',
    'Hasta agotar stock.',
    'Hasta agotar stock.',
    'Hasta agotar stock.',
    'Hasta agotar stock.',
  ];

  const texts = titles.reduce((acum, current, index) => {
    return [...acum, {
      title: current,
      legal: legals[index]
    }]
  }, [])

  const images = [
    testImage,
    testImage,
    testImage,
    testImage,
    testImage,
    testImage,
    testImage,
    testImage,
    testImage,
    testImage,
  ];




  useEffect(() => {
    const slidersContainer = container.current;

    // Initializing the titles slider

    var msTitles = new MomentumSlider({
      el: slidersContainer,
      cssClass: 'ms--titles',
      range,
      rangeContent: function (i) {
        return `<h3>${texts[i].title} </h3>
        <span>${texts[i].legal}</span>`;
      },
      loop,
      // reverse: true,
      style: {
        opacity: [0.3, 1]
      },
      vertical: false,
      interactive: false
    });

    // Initializing the images slider
    const msImages = new MomentumSlider({
      // Element to append the slider
      el: slidersContainer,
      // CSS class to reference the slider
      cssClass: 'ms--images',
      // Generate the 4 slides required
      currentIndex: initialIndex,
      loop,
      range,
      rangeContent: function (index) {
        console.log(images[index]);
        return `<div class="ms-slide__image-container"><div class="ms-slide__image" style="background-image:url('${images[index]}')"></div></div>`;
      },
      // Syncronize the other sliders
      sync: [msTitles],
      // Styles to interpolate as we move the slider
      style: {
        '.ms-slide__image': {
          transform: [{ scale: [1, 1.1] }],
          opacity: [0.1, 1]
        }
      },
      // Update pagination if slider change
      change: function (newIndex, oldIndex) {
        if (newIndex && oldIndex) {
          const toLeft = goLeft(newIndex, oldIndex);
          console.log('Left?');
          console.log(toLeft)
          animate(msImages, toLeft, winner, minMovement)
          console.log(oldIndex);
          console.log(newIndex);
          console.log('==========');
        }
      }
    });

    setImgSlider(msImages);
  }, []);

  const goLeft = (newIndex, oldIndex) =>
    newIndex > oldIndex ?
      newIndex - oldIndex === 1 :
      oldIndex - newIndex !== 1;

  let animation = null;

  const animate = (slider, toLeft, stopConditon, minIterations) => {
    if (!animation) {
      let iterations = 0;
      const interval = setInterval(() => {
        toLeft ? slider.next() : slider.prev();
        iterations += 1;
        if (slider.getCurrentIndex() === stopConditon && iterations >= minIterations) {
          clearInterval(interval);
          slider.disable();
        }
      }, 100);
      animation = interval
    }
  };

  return (<Layout>
    <SEO title="Desliza y gana - Nueva Pudahuel" />
    <main ref={container} className="sliders-container" />
    <button className="spin-btn" onClick={() => animate(imgSlider, true, winner, minMovement)}>GIRAR RULETA</button>
  </Layout>);
}


export default Streaming;