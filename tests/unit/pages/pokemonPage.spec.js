import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/pokemonPage'
import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonPage component', () => {


    test('Faire l\'appel à mixPokemonsArray dans le mounted ', () => {
        
        const mixPokemonsArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonsArray')

        const wrapper = shallowMount( PokemonPage )

        expect( mixPokemonsArraySpy ).toHaveBeenCalled()

    })

    test('Match snapshot après le chargement des pokemons', () => {
        
        //const wrapper = mount(PokemonPage, { //on utilise le mount pour créer le li dans le snapshot

        const wrapper = shallowMount(PokemonPage, {
            data(){
                return{
                pokemonArr: pokemons,
                pokemon: pokemons[0],
                showPokemon:false,
                showAnswer: false,
                message: false,
                laClase:``,
                disabled:``,
                scoreSuccess:[],
                scoreError:[],
                success:``,
                error:``
                }
            },
        })

        expect(wrapper.html()).toMatchSnapshot()
        
        


    })

    test('Afficher les composants pokemonImage et pokemonOptions', () => {

        const wrapper = shallowMount(PokemonPage, {

            data(){
                return{
                pokemonArr: pokemons,
                pokemon: pokemons[1],
                showPokemon:false,
                showAnswer: false,
                message: false,
                laClase:``,
                disabled:``,
                scoreSuccess:[],
                scoreError:[],
                success:``,
                error:``
                }
            },
        })

        console.log('identifier les composants', wrapper.html())
        
        const PokemonImage = wrapper.findComponent('pokemon-image-stub')
        expect(PokemonImage.exists()).toBeTruthy
        expect(PokemonImage.attributes('pokemonid')).toStrictEqual("2")   

        const PokemonOptions = wrapper.findComponent('pokemon-options-stub')
        expect(PokemonOptions.exists()).toBeTruthy
        expect(PokemonOptions.attributes('pokemons')).toBeTruthy() 

    })

    test('Test du checkAnswer', async() => {
        
        const wrapper = shallowMount(PokemonPage, {

            data(){
                return{
                pokemonArr: pokemons,
                pokemon: pokemons[1],
                showPokemon:false,
                showAnswer: false,
                message: false,
                laClase:``,
                disabled:``,
                scoreSuccess:[],
                scoreError:[],
                success:``,
                error:``
                }
            },
        })

        await wrapper.vm.checkAnswer(2) // 2 = id
        expect(wrapper.find('h2').exists()).toBeTruthy()
        
        // verifier que le checkAnswer change showPokemon à TRUE
        expect(wrapper.vm.showPokemon).toBeTruthy()

        // verifier que le checkAnswer affiche les messages
        expect(wrapper.find('h2').text()).toBe(`Correct ! c'est ${pokemons[1].name} !`)
        
        await wrapper.vm.checkAnswer(3)
        expect(wrapper.find('h2').text()).toBe(`Oops, c'est ${pokemons[1].name} !`)

    })

})