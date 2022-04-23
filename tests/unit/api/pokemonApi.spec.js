import pokemonAPI from "@/api/pokemonApi"


describe('pokemon API', () => {

    //TEST 1 : Axios
    test('Axios doit être bien configuré avec l\'API de Pokémon', () => {
        
        console.log(pokemonAPI)// ici on trouve defaults et la BaseURL de la commande suivante

        expect( pokemonAPI.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')
    })

    //TEST 2 : 
})