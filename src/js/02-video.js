import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(() => {
  player.getCurrentTime().then((time) => {
        localStorage.setItem('videoplayer-current-time', time);
  });
}, 1000));

const storedTime = localStorage.getItem('videoplayer-current-time');
if (storedTime) {
  player.setCurrentTime(storedTime);
}
console.log(onPlay)



  


