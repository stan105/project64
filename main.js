const codespace = document.querySelector(".codespace");
if (codespace != null) {
	/*const code = `
-- This is a comment
local playerName = "Player1"
if workspace.Player.Head then
    print("Player found!")
end`;
	const keywords = ["local", "if", "then", "end", "for", "while", "do", "return", "function", "or", "and"];
	const other = ["math", "workspace", "script", "print"];
        const patterns = [
            { regex: /\b(--.*?$)/gm, class: "comment" }, // Comments
            { regex: /\b("[^"]*")/g, class: "string" },  // Strings
            { regex: /\b(math|workspace|script|print)\b/g, class: "object" }, // Objects
            { regex: /\b(local|if|then|end|for|while|do|return|function|or|and)\b/g, class: "keyword" } // Keywords
        ];
	// Function to safely apply syntax highlighting
	function highlightLua(code, patterns) {
		// Escape HTML to prevent existing tags from breaking
		let escapedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		// Apply each pattern sequentially
		alert(escapedCode)
		patterns.forEach(({ regex, class: className }) => {
			escapedCode = escapedCode.replace(regex, match => {
				return `<span class="${className}">${match}</span>`;
			});
		});
		return escapedCode;
	}
	// Highlight the code and insert it into the DOM
	codespace.innerHTML = highlightLua(code, patterns);*/
}
/*! `lua` grammar compiled for Highlight.js 11.8.0 */
(()=>{var e=(()=>{"use strict";return e=>{const t="\\[=*\\[",a="\\]=*\\]",n={
begin:t,end:a,contains:["self"]
},o=[e.COMMENT("--(?!"+t+")","$"),e.COMMENT("--"+t,a,{contains:[n],relevance:10
})];return{name:"Lua",keywords:{$pattern:e.UNDERSCORE_IDENT_RE,
literal:"true false nil",
keyword:"and break do else elseif end for goto if in local not or repeat return then until while",
built_in:"_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print game workspace rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
},contains:o.concat([{className:"function",beginKeywords:"function",end:"\\)",
contains:[e.inherit(e.TITLE_MODE,{
begin:"([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"}),{className:"params",
begin:"\\(",endsWithParent:!0,contains:o}].concat(o)
},e.C_NUMBER_MODE,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{className:"string",
begin:t,end:a,contains:[n],relevance:5}])}}})();hljs.registerLanguage("lua",e)
})();
hljs.highlightAll();
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