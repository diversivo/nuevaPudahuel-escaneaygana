
import React, { useEffect, useState, useRef } from 'react';


import MomentumSlider from 'momentum-slider';
import testImage from '../../assets/images/ruleta_test.png';
import Hand from '../../assets/svg/hand.svg';
import Config from '../../assets/config/config.json';

const Streaming = ({ location, submitToAPI }) => {

  // Variables to use later
  // var root = document.documentElement;
  const container = useRef(null);
  const [imgSlider, setImgSlider] = useState(null);
  const initialIndex = 5;
  const minMovement = 30;
  const winner = 3;
  const loop = 2;

  useEffect(() => {
    const range = [0, 9];
    const titles = Config.map(e => e.promo_text);

    const legals = Config.map(e => e.legal_text);

    const texts = titles.reduce((acum, current, index) => {
      return [...acum, {
        title: current,
        legal: legals[index]
      }]
    }, [])

    const images = Config.map(e => {
      const img = require(`../../assets/backgrounds/${e.img}.jpg`);
      return img;
    });

    if (typeof window !== `undefined`) {

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

      let firstTry = true ;

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
            opacity: [0.1, 1]
          }
        },
        // Update pagination if slider change
        change: function (newIndex, oldIndex) {
          if (newIndex && oldIndex) {
            const toLeft = goLeft(newIndex, oldIndex);
            console.log('Left?');
            console.log(toLeft)
            animate(msImages, toLeft, winner, minMovement);
            if(firstTry){
              firstTry = false;
              submitToAPI();
            }
            console.log(oldIndex);
            console.log(newIndex);
            console.log('==========');
          }
        }
      });

      setImgSlider(msImages);
    }
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
          setPrice();
        }
      }, 100);
      animation = interval
    }
  };

  const setPrice = () => {
    if (typeof document !== `undefined`) {
      const winnerCard = document.getElementsByClassName("ms-slide__image")[winner + loop];

      const rewardOverlay = document.createElement("div");
      const upperText = document.createElement("p");
      const codeButton = document.createElement("button");
      const lowerText = document.createElement("p");

      upperText.innerText = "código canjeable";
      codeButton.innerHTML = "HGLPWXC";
      codeButton.setAttribute("class", "reward__code");
      lowerText.innerText = "presenta el código en caja";
      rewardOverlay.setAttribute("class", "reward__overlay");
      lowerText.setAttribute("class", "reward__lower-text");


      rewardOverlay.appendChild(upperText);
      rewardOverlay.appendChild(codeButton);
      rewardOverlay.appendChild(lowerText);

      winnerCard.appendChild(rewardOverlay);
    }
  };

  return (
    <main ref={container} className="sliders-container overflow-hidden" >
    <button className="spin-btn" onClick={() => animate(imgSlider, true, winner, minMovement)}>JUGAR</button>
    <div className="sliders__intructions align-center">
        <img src={Hand} alt="hand"/>
        <p>Desliza con la mano o pulsa en el botón</p>
    </div>
    </main>);
}


export default Streaming;