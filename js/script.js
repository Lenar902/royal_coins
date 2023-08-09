/*settings*/
const options = {
    reelWidth: 115,
    reelHeight: 942,
    reelOffset: 245,
    sounds: {
      reelsBegin: './sounds/reelsBegin.mp3',
      reelsEnd: './sounds/reelsEnd.mp3',
    }
};

const reels = [
{
  imageSrc: './img/royal_coins/grid01.png',
  symbols: [
    {
      title: 'seven',
      position: 0,
      weight: 2
    },
    {
      title: 'bar',
      position: 105,
      weight: 6
    },
    {
      title: 'cherry',
      position: 210,
      weight: 5
    },
    {
      title: 'grape',
      position: 315,
      weight: 1
    },
    {
      title: 'lemon',
      position: 420,
      weight: 3
    },
    {
      title: 'watermelon',
      position: 525,
      weight: 5
    },
    {
      title: 'orange',
      position: 630,
      weight: 5
    },
    {
      title: 'bell',
      position: 735,
      weight: 3
    },
    {
      title: 'plum',
      position: 840,
      weight: 5
    }       
  ]
},

{
  imageSrc: './img/royal_coins/grid02.png',
  symbols: [
    {
      title: 'orange',
      position: 0,
      weight: 5
    },
    {
      title: 'lemon',
      position: 105,
      weight: 6
    },
    {
      title: 'watermelon',
      position: 210,
      weight: 5
    },
    {
      title: 'seven',
      position: 315,
      weight: 1
    },
    {
      title: 'bar',
      position: 420,
      weight: 3
    },
    {
      title: 'plum',
      position: 525,
      weight: 5
    },
    {
      title: 'grape',
      position: 630,
      weight: 1
    },
    {
      title: 'bell',
      position: 735,
      weight: 3
    },
    {
      title: 'cherry',
      position: 840,
      weight: 5
    }      
  ]
},

{
  imageSrc: './img/royal_coins/grid03.png',
  symbols: [
    {
      title: 'grape',
      position: 0,
      weight: 1
    },
    {
      title: 'seven',
      position: 105,
      weight: 6
    },
    {
      title: 'lemon',
      position: 210,
      weight: 5
    },
    {
      title: 'bell',
      position: 315,
      weight: 1
    },
    {
      title: 'cherry',
      position: 420,
      weight: 3
    },
    {
      title: 'orange',
      position: 525,
      weight: 5
    },
    {
      title: 'watermelon',
      position: 630,
      weight: 1
    },
    {
      title: 'bar',
      position: 735,
      weight: 3
    },
    {
      title: 'plum',
      position: 840,
      weight: 5
    }      
  ]
}
];


window.onload = function() {

    const subtraction = document.querySelector('#sub');
    const addition = document.querySelector('#add');
    const rate = document.querySelector('#rate');
    const coins = document.querySelector('#coins');
    const spin = document.querySelector('#spin-button');
    const auto = document.querySelector('#play-button');
    const stars = document.querySelector('#stars');
    const wintext = document.querySelector('#win-text');
    const wincount = document.querySelector('#win-count');
    let rt = +rate.textContent;
    let rtTemp = rt;
    let objSave = JSON.parse(sessionStorage.getItem('obj'));
    if (objSave != null) stars.textContent = objSave.stars;
    let st = +stars.textContent;
    if (objSave != null) coins.textContent = objSave.coins;
    let m = +coins.textContent;
    

    const callback = function(payLine) {
        console.log(payLine[0].title + ' | ' + payLine[1].title + ' | ' + payLine[2].title);

        if (payLine[0].title === payLine[1].title && payLine[0].title === payLine[2].title) {
            (new Audio('./sounds/winner.mp3')).play();
            rtTemp *= 5;
            wincount.textContent = rtTemp;
            m += rtTemp;
            coins.textContent = m;
            wintext.style.visibility = "visible";            
            wincount.style.visibility = "visible";            
        }
    };

    var machine = document.querySelector('#slot-machine');
    var slot = slotMachine(machine, reels, callback, options);
    

    subtraction.addEventListener('click', function() {   
        rt -= 50;
        if (rt < 0) rt = 0;     
        rate.textContent = rt;       
    });

    addition.addEventListener('click', function() { 
        rt += 50;
        m = +coins.textContent;
        if (rt > m) rt = m;      
        rate.textContent = rt;    
    });

    spin.addEventListener('click', function() {           
        coins.textContent -= rate.textContent;
        if (coins.textContent < 0) coins.textContent = 0;
        if (rt > 0) st += 100;
        if (st > 9000) st = 9000;
        rtTemp = rt;
        rt = 0;
        rate.textContent = rt;
        stars.textContent = st;       
        
        objSave = {
            coins: coins.textContent,
            stars: st
        }
          
        sessionStorage.setItem('obj', JSON.stringify(objSave));  
        spin.disabled = true;
        auto.disabled = false; 
        spin.style.background = "#69916d"; 
        auto.style.background = "linear-gradient(180deg, #70FF00 0%, #BD00FF 0.01%, #005484 100%)"; 
    });

    auto.addEventListener('click', () => {
        spin.disabled = false;
        spin.style.background = "linear-gradient(180deg, #70FF00 0%, #008405 100%)";
        auto.style.background = "#69916d"; 
        auto.disabled = true; 
        if (rtTemp > 0) slot.play();
    });

};

