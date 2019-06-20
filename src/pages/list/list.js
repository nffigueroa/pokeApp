import React from 'react';
import { getAllPokemonInfo, getPokeInfo, getPokemonList } from '../../services';
import ItemList from '../../components/item-list/item-list';


import './list.css';
import { pokeSprite } from '../../config';
import PokeInfoComponent from '../../components/poke-info/poke-info';

class PokeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokeList: {
                nextPage: '',
                previousPage: '',
                results: [{
                }]
            },
            showPokemon: {
                id: ''
            }
        }
    }

    componentWillMount() {
       this.prepopulateList();
    }
    prepopulateList (url) {
        getAllPokemonInfo(url)
        .then((response) => {
            this.setState({
                pokeList: {
                    nextPage: response.next,
                    previousPage: response.previous,
                    results: response.results
                }
            })
        })
    }
    /**
     * It gets the value from the child component and set it to the state
     */
    showPokeInfo = async (id) => {
       await this.setState((state) => state.showPokemon.id = id);
       this.clickItem ();
    }
    /**
     * It builds the list calling the child component ItemList
     */
    buildList = () => {
        return this.state.pokeList.results.map((pokemon) => {
            return <ItemList returnIdOnClick={this.showPokeInfo} key={pokemon.id} name={pokemon.name} id={pokemon.id} />;
        })
    }
    clickItem = async () => {
        await this.setState((state) => {
            getPokeInfo(null, this.state.showPokemon.id)
            .then((response) => {
                state.showPokemon = {response};
            })
            .catch((e) => console.log(e));
        })
    }
    navPage = (event) => {
        this.prepopulateList(event.target.id === 'next' 
        ? this.state.pokeList.nextPage 
        : this.state.pokeList.previousPage);
    }
    renderSquare = () => {
        const pokemon = this.state.showPokemon.response;
        return (
            <PokeInfoComponent height={pokemon.height} name={pokemon.name} imgSrc={pokemon.sprites[pokeSprite.front_default]} />
        )
    }

    render() {
        return (
            <section className="list-container">
                <div className="list">{this.state.pokeList.results.length > 2 ? this.buildList() : <h1>Cargando....</h1>}</div>
                <div className="nav">
                    <span><a id="back" href="#" onClick={this.navPage}> {'<='} </a> <br /> </span><span><a href="#" onClick={this.navPage} id="next">=></a></span>
                </div>
                {this.state.showPokemon.response ? this.renderSquare() : ''}
            </section>
        );
    }
}

export default PokeList;