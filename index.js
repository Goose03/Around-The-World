//Tarea 1 Web-Dev
//Habilitar permiso de sonido de la pagina y darle refresh

const imagepokemon = document.getElementById('imagepokemon');
let pokedex = 1;

const jokeContent = document.getElementById('jokeContent');

//Obtiene el objeto del pokemon al recibir su numero en la pokedex
async function fetchPokemon(num) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
        const pokemonJSON = await response.json();

        displayPokemon(pokemonJSON);
        pokedex++; 
    }
    catch(error){
        console.error("Error fetching Pokemon:", error);
    }
}

//Gira al pokemon 4 veces y cambia de pokemon cada 2 segundos
function displayPokemon(pokemonJSON) {
    const pokeImage = document.createElement("img");

    imagepokemon.innerHTML = ''; 
    imagepokemon.appendChild(pokeImage);

    pokeImage.src = pokemonJSON.sprites.front_default;
    pokeImage.style.width = '200px'; 
    pokeImage.style.height = '200px';


    setTimeout(() => {
        pokeImage.src = pokemonJSON.sprites.back_default;
        setTimeout(() => {
            pokeImage.src = pokemonJSON.sprites.front_default;
            setTimeout(() => {
                pokeImage.src = pokemonJSON.sprites.back_default;
                setTimeout(() => {
                    fetchPokemon(pokedex);
                }, 495)
            }, 495)
        }, 495);
    }, 495);
}


//Fetch del dadjoke de rapidapi
async function fetchJoke(){
    const url = 'https://dad-jokes.p.rapidapi.com/random/joke';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6bd59c717fmshf79747870e66d39p131552jsn309d6ad0ed45',
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
        }
    };
    
    
    try{
        const response = await fetch(url, options);
        const joke = await response.json();
        displayJoke(joke);
    }
    catch(error){
        console.log('Error fetching joke:', error);
        jokeContent.innerHTML = '';
        jokeContent.textContent = "Ya se acabao el limite diario de chistes :("
    }
    
}

//Muestra el chiste y cabia de chiste despues de 10 segundos
//No usar demas que solo deja 50 al dia :(
function displayJoke(joke){

    jokeContent.innerHTML = '';

    const setup = document.createElement('p');
    setup.textContent = joke.body[0].setup;

    const punchline = document.createElement('p');
    punchline.textContent = joke.body[0].punchline;

    jokeContent.appendChild(setup);
    jokeContent.appendChild(punchline);

    setTimeout(() => {
        fetchJoke();
    }, 10000)
}



//Nose lo hizo gpt para poner el audio en loop
var audio = document.getElementById('myAudio');

// Function to replay audio when it ends
function replayAudio() {
    audio.currentTime = 0; // Reset audio to the beginning
    audio.play(); // Start playing the audio again
}

// Event listener for the 'ended' event
audio.addEventListener('ended', function() {
    replayAudio(); // Call the function to replay the audio
});


document.addEventListener('DOMContentLoaded', function() {
    fetchPokemon(pokedex);
    fetchJoke();
});