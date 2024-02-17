const imagepokemon = document.getElementById('imagepokemon');
let pokedex = 1;

async function fetchPokemon(num) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
        const pokemonJSON = await response.json();

        displayPokemon(pokemonJSON);
        pokedex++; 
    }
    catch(error){
        console.error("Error fetching data:", error);
    }
}

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



//Nos se lo hico gpt
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

fetchPokemon(pokedex);
