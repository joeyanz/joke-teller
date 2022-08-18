const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

// Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to voiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: "72177b9e122f4ff38604dd91d6f18041",
        src: joke,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
}

// get jokes from joke API
let joke = "";
const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,sexist,explicit";
async function getJokes() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.log(error);
    }
}

// event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
