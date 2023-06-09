console.log('Welcome to Spotify');

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let playGif = document.getElementById('playGif') ;
let masterSongName = document.getElementById('masterSongName');
let masterArtistName = document.getElementById('masterArtistName');
let masterCover = document.getElementById('masterCover');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "God's Menu", artistName: "Stray Kids", filePath: "songs/0.mp3", coverPath: "song_covers/cover1.jpg"},
    {songName: "Midnight Rain", artistName: "Taylor Swift", filePath: "songs/1.mp3", coverPath: "song_covers/cover2.jpg"},
    {songName: "End of the Day", artistName: "One Direction", filePath: "songs/2.mp3", coverPath: "song_covers/cover3.png"},
    {songName: "Fine Line", artistName: "Harry Styles", filePath: "songs/3.mp3", coverPath: "song_covers/cover4.jpg"},
    {songName: "The Real (Heung Version)", artistName: "Ateez", filePath: "songs/4.mp3", coverPath: "song_covers/cover5.jpg"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("artistName")[0].innerText = songs[i].artistName;
})

// audioElement.play();

//handle play/pause click

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        playGif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        playGif.style.opacity = 0;
    }
})


//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

//make all song icons play except the one playing
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        masterArtistName.innerText = songs[songIndex].artistName;
        masterCover.src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        playGif.style.opacity = 1;
    })
})

document.getElementById('masterNext').addEventListener('click', ()=>{
    if (songIndex >= 4){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterArtistName.innerText = songs[songIndex].artistName;
    masterCover.innerText = songs[songIndex].coverPath;
    masterCover.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    playGif.style.opacity = 1;
})

document.getElementById('masterPrevious').addEventListener('click', ()=>{
    if (songIndex <= 0){
        songIndex = 4;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterArtistName.innerText = songs[songIndex].artistName;
    masterCover.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    playGif.style.opacity = 1;
})