let tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
import data from './data.js'
window.onYouTubeIframeAPIReady = () => {
    data.YouTubeReady = true;
}