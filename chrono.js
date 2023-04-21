const result = document.querySelector('.result');
const chrono = document.querySelector('#chrono');
const lap = document.querySelector('#lap');
const reset = document.querySelector('#reset');

let time = 0;
chrono.addEventListener('click', () => {
    setInterval(() => {
        
      result.textContent =  time+100;
    }
    ,100)
    console.log("hello");
});

