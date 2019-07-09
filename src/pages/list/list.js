import React from 'react';
import {Link} from 'react-router-dom';
import { getAllPokemonInfo, getPokeInfo, getPokemonList } from '../../services';
import ItemList from '../../components/item-list/item-list';
import {addOneToFight, addToPokeList, selectOneToFigth} from '../../actions/index';

import {connect} from 'react-redux';

import './list.css';
import { pokeSprite } from '../../config';
import PokeInfoComponent from '../../components/poke-info/poke-info';
import HeaderComponent from '../../components/header/header';
import { bindActionCreators } from 'redux';
import WithAuthentication from '../../enhancers/withAuth';

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
                id: '',
                isSelected: false,
            },
            pokemonFight : [],
            showButton: false
        }
    }

    componentWillMount() {
       this.prepopulateList();
    }
    prepopulateList (url) {
        getAllPokemonInfo(url)
        .then((response) => Promise.resolve(response))
        .then(({next, previous, results}) => {
            this.props.addToPokeList({
                nextPage: next,
                previousPage: previous,
                results
            })
            this.setState({
                pokeList: {
                    nextPage: next,
                    previousPage: previous,
                    results
                }
            })
        })
    }
    /**
     * It gets the value from the child component and set it to the state
     */
    showPokeInfo =  (id) => {
        const deleteItem = !!this.state.pokemonFight.filter((item) => id == item.id)[0];
        getPokeInfo(null, id)
        .then((response) => response)
        .then((response) => {
            if (deleteItem) {
                return Promise.resolve(response);
            }
            this.props.addOneToFight([ ...this.state.pokemonFight , response]);
            this.setState(({
                showPokemon : {
                    id,
                    response
                },
                pokemonFight:[ ...this.state.pokemonFight , response],
                showButton: this.state.pokemonFight.length > 2
            }))
         })
        .catch((e) => console.log(e));
    }
    /**
     * It builds the list calling the child component ItemList
     */
    buildList = () => {
        return this.state.pokeList.results.map((pokemon) => {
            return <ItemList isSelected={!!this.state.pokemonFight.filter((item => String(item.id) === String(pokemon.id)))[0]} returnIdOnClick={this.showPokeInfo} key={pokemon.id} name={pokemon.name} id={pokemon.id} />;
        })
    }
    navPage = (event) => {
        event.preventDefault();
        this.prepopulateList(event.target.id === 'next' 
        ? this.state.pokeList.nextPage 
        : this.state.pokeList.previousPage);
    }
    renderSquare = () => {
        const pokemon = this.state.pokemonFight;
        return pokemon.map((pok) => {
            return (
                <div className="poke-card" key={pok.id}>
                <PokeInfoComponent 
                    height={pok.height} 
                    name={pok.name} 
                    imgSrc={pok.sprites[pokeSprite.front_default]} 
                    weight={pok.weight} 
                    hp={(pok.height * pok.weight - (( Math.random() * ((10) + (-10) + -10) ) / 100)).toFixed(0)}
                    moves={pok.moves}
                />
                </div>
            )
        })
    }
    saveState = () => {
        sessionStorage.setItem('pokemonFight', JSON.stringify(this.state.pokemonFight));
        sessionStorage.setItem('pokeList', JSON.stringify(this.state.pokeList.results));
        this.props.addToPokeList(this.state.pokeList.results);
       
    }
    render() {
        const fightObj = {
                        pathname: '/fight',
                    }
        return (
            <React.Fragment>
                <div className="header-container">
                    <HeaderComponent></HeaderComponent>
                </div>
                <button onClick={this.saveState} id="cta-btn" className={this.state.showButton ? 'cta-start-fight' : 'cta-start-fight-hidden'}><Link to={fightObj} className="block-menu__item">START A FIGHT!</Link></button>
                <section className="list-container">
                    <div className="list">{this.state.pokeList.results.length > 2 ? this.buildList() : <h1>Cargando....</h1>}</div>
                    <div className="nav">
                        <span><a id="back" href="#" onClick={this.navPage}> {'<='} </a> <br /> </span><span><a href="#" onClick={this.navPage} id="next">=></a></span>
                    </div>
                    {this.state.showPokemon.response ? this.renderSquare() : ''}
                </section>
            </React.Fragment>   
        );
    }
}
const maptStateToProps = (state) => ({
    state,
    userName: !!state.user.payload,
    password: !!state.user.payload,
})
const mapActionToProps = (dispatch) => bindActionCreators({addOneToFight, addToPokeList, selectOneToFigth}, dispatch)

export default connect(maptStateToProps, mapActionToProps)(WithAuthentication(PokeList));