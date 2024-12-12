const videoplayer = document.querySelector(".videoplayermain");
const video = videoplayer.querySelector(".videoplayer");
const videobuttons = videoplayer.querySelector(".videobuttons");
const videobar = videobuttons.querySelector(".videobar");
const overlay = videoplayer.querySelector(".videooverlay");
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
video.addEventListener("timeupdate", function(){
	videobar.querySelector(".videomainbar").style.width = (video.currentTime / video.duration) * 100 + "%";
	if (video.ended) {
		videobuttons.querySelector(".videoplay").querySelector(".videoplayicon").src = "assets/play.png";
	}
})
videoplayer.addEventListener("mouseover", function(){
	if (videoplayed) {
		videobuttons.style.visibility = "visible";
	}
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