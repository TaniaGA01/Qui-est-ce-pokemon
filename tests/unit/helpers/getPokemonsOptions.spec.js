import getPokokemonOptions, { getPokemons, getPokemonsNames } from "@/helpers/getPokemonsOptions"

describe('getPokemonsOptions Helpers', () => {

    test('Retourner un array de nombres', () => {
        
        const pokemons = getPokemons() //Executer la fonction de l'import

        expect( pokemons.length ).toBe(650)
        expect( pokemons[0] ).toBe(1)
        expect( pokemons[450] ).toBe(451)
        expect( pokemons[649] ).toBe(650)
    })

    test('Retourner 4 element avec le nom qui corresponde', async () => {
        // on utilise async car la constant getPokemonName est async

        const pokemons = await getPokemonsNames([1, 2, 3, 4])
        
        expect(pokemons).toStrictEqual([{"id": 1, "name": "bulbasaur"}, {"id": 2, "name": "ivysaur"}, {"id": 3, "name": "venusaur"}, {"id": 4, "name": "charmander"}])

    })

    test('getPokemonsOption retourne un array d\'objets random', async() => {

        const pokemons = await getPokokemonOptions()
        expect(pokemons.length).toBe(4)
        expect(pokemons).toEqual([
            {
                id: expect.any(Number), 
                name: expect.any(String)
            },
            {
                id: expect.any(Number), 
                name: expect.any(String)
            },
            {
                id: expect.any(Number), 
                name: expect.any(String)
            },
            {
                id: expect.any(Number), 
                name: expect.any(String)
            }
        ])
    })
})