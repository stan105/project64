const videoplayer = document.querySelector(".videoplayermain");
const video = videoplayer.querySelector(".videoplayer");
const videobuttons = videoplayer.querySelector(".videobuttons");
const videobar = videobuttons.querySelector(".videobar");
const overlay = videoplayer.querySelector(".videooverlay");
const videotimer = document.createElement("div");
videotimer.classList.add("videotimer");
videobar.appendChild(videotimer);
let bardrag = 0;
let videoplayed = 0;
function videoplay(){
	if (overlay != null && videoplayed == 0) {
		videoplayer.removeChild(overlay);
	}
	if (video.paused) {
		video.play();
		videoplayed = 1;
		videobuttons.querySelector(".videoplay").querySelector(".videoplayicon").src = "assets/pause.png";
		videobuttons.style.visibility = "visible";
	} else {
		video.pause();
		videobuttons.querySelector(".videoplay").querySelector(".videoplayicon").src = "assets/play.png";
	}
}
function videofstoggle(){
	if (document.fullscreenElement == null) {
		video.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}
function updatebar(a){
	const rect = videobar.getBoundingClientRect();
	const percent = Math.min(Math.max(0, a.x - rect.x), rect.width) / rect.width;
	video.currentTime = percent * video.duration;
	videobar.querySelector(".videomainbar").style.width = (video.currentTime / video.duration) * 100 + "%";
}
function updatebarmove(a){
	const rect = videobar.getBoundingClientRect();
	const percent = Math.min(Math.max(0, a.x - rect.x), rect.width) / rect.width;
	videotimer.style.left = (percent) * 100 + "%";
	videotimer.style.visibility = "visible";
	videotimer.innerHTML = formatdur(percent * video.duration);
	videobar.querySelector(".videomainbarback").style.visibility = "visible";
	videobar.querySelector(".videomainbarback").style.width = (percent) * 100 + "%";
}
const zeroformatter = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2});
function formatdur(value){
	const seconds = Math.floor(value % 60);
	const minutes = Math.floor(value / 60) % 60;
	const hours = Math.floor(value / 3600);
	if (hours <= 0) {
		return `${minutes}:${zeroformatter.format(seconds)}`;
	} else {
		return `${hours}:${zeroformatter.format(minutes)}:${zeroformatter.format(seconds)}`;
	}
}
video.addEventListener("timeupdate", function(){
	videobar.querySelector(".videomainbar").style.width = (video.currentTime / video.duration) * 100 + "%";
	if (video.ended) {
		videobuttons.querySelector(".videoplay").querySelector(".videoplayicon").src = "assets/play.png";
	}
	videobuttons.querySelector(".videotime").innerHTML = formatdur(video.currentTime) + "/" + formatdur(video.duration);
})
videoplayer.addEventListener("mouseover", function(){
	if (videoplayed) {
		videobuttons.style.visibility = "visible";
	}
})
videobar.addEventListener("mousemove", (a) => {
	updatebarmove(a);
})
videobuttons.addEventListener("mouseout", function(){
	videotimer.style.visibility = "hidden";
	videobar.querySelector(".videomainbarback").style.visibility = "hidden";
})
videoplayer.addEventListener("mouseout", function(){
	videobuttons.style.visibility = "hidden";
})
videobar.addEventListener("mousedown", (a) => {
	bardrag = 1;
	updatebar(a);
})
document.addEventListener("mouseup", function(){
	bardrag = 0;
})
document.addEventListener("mousemove", (a) => {
	if (bardrag) {
		updatebar(a);
	}
})