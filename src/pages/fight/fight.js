import React from 'react';
import { getRandomEnemies, getPowerByMove, getPokemonPowerInfoByMove, getPokemonHp } from '../../services';
import './fight.css';
import { pokeSprite } from '../../config';

class FightPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pokemonFight: this.props.location.state.pokemonFight,
            pokemonEnemies: [],
            pokeList: this.props.location.state.pokeList.results,
            pokemonPlayerOne: {},
            pokemonPlayerTwo: {},
            tAttk: 0, //Total Attack
            currentTurn: 1 //Player Turn
        };
    }

    componentDidMount() {
        this.state.pokemonFight.map(() => {
            getRandomEnemies(this.state.pokeList, this.state.pokemonFight.length)
            .then((response) => this.setState({ pokemonEnemies: [...this.state.pokemonEnemies, response] }))
        })
        this.setState({
            pokemonPlayerOne:
            {
                ...this.state.pokemonPlayerOne,
                hp: getPokemonHp(this.state.pokemonPlayerOne.height, this.state.pokemonPlayerOne.weight),
                currrentHp: getPokemonHp(this.state.pokemonPlayerOne.height, this.state.pokemonPlayerOne.weight)
            }
        })
    }
    selectPokemon = (id, event) => {
        event.persist();
        const flagEnemies = String(id[1]) === 'E';
        if (flagEnemies) {
            this.setState(
                {
                    pokemonPlayerTwo :
                    {
                        ...this.state.pokemonEnemies[id[0]],
                        hp: getPokemonHp(this.state.pokemonEnemies[id[0]].height, this.state.pokemonEnemies[id[0]].weight),
                        currrentHp: getPokemonHp(this.state.pokemonEnemies[id[0]].height, this.state.pokemonEnemies[id[0]].weight)
                    }
                })
        } else {
            this.setState(
                {
                    pokemonPlayerOne : {
                        ...this.state.pokemonFight[id[0]],
                        hp: getPokemonHp(this.state.pokemonFight[id[0]].height, this.state.pokemonFight[id[0]].weight),
                        currrentHp: getPokemonHp(this.state.pokemonFight[id[0]].height, this.state.pokemonFight[id[0]].weight)
                    }
                })
        }
    }
    renderPokemonRemaining = (showEnemies) => {
        const arrPokemon = showEnemies ? this.state.pokemonEnemies : this.state.pokemonFight;
        return (arrPokemon.map((item, index) => {
            return (
                <div className="pokeball" onClick={(e) => this.selectPokemon(`${index}${showEnemies ? 'E' : 'F'}`, e) } key={index}>
                    <div className="background-red">
                        <div className="background-white"></div>
                        </div>
                </div>
            )
        }))
    }
    useAttack = (move, playerTwo) => {
        if ((playerTwo && Number(this.state.currentTurn) === 1) 
        || (!playerTwo && Number(this.state.currentTurn) === 2)) {
            return
        }
        getPokemonPowerInfoByMove(move.url)
        .then(({accuracy, power}) => {
            this.setState({
                tAttk: (accuracy / 100) * power
            })
            if (playerTwo) {
                this.setState({
                    pokemonPlayerOne: {
                        ...this.state.pokemonPlayerOne,
                        currrentHp: this.state.pokemonPlayerOne.currrentHp - this.state.tAttk
                    }
                })
            } else {
                this.setState({
                    pokemonPlayerTwo: {
                        ...this.state.pokemonPlayerTwo,
                        currrentHp: this.state.pokemonPlayerTwo.currrentHp - this.state.tAttk
                    }
                })
            }
        })
        this.setState({
            currentTurn: Number(this.state.currentTurn) === 1 ? 2 : 1
        })
    }
    renderMoves =  (playerTwo) => {
        const {pokemonPlayerOne, pokemonPlayerTwo} = this.state;
        const showMoves = !!(pokemonPlayerOne.moves || pokemonPlayerTwo.moves);
        const arrMoves = playerTwo ? pokemonPlayerTwo.moves : pokemonPlayerOne.moves;
        if (showMoves && arrMoves) {
             return (
                 arrMoves.map( ({move}, index) => {
                    return (
                        <div className="moves-container" key={index} onClick={() => this.useAttack(move, playerTwo)}>
                            <div className="move">{move.name}</div>
                        </div>)
                })
            )
        }
    }
    renderProgressBar = (playerTwo) => {
        const {pokemonPlayerOne, pokemonPlayerTwo} = this.state;
        const { currrentHp, hp } = playerTwo ? pokemonPlayerTwo : pokemonPlayerOne;
        return (
            <div className="progressbar" style={{width: `${currrentHp * 100 / hp}%`}}></div>
        )
    }
    renderBubble = (fPrint) => {
        return (
            <div className="bubble" style={{opacity: fPrint ? 1 : 0, bottom: fPrint ? '-25px' : '-100px'}}>-{this.state.tAttk}</div>
        )
    }
    renderPokemonCardBattle = () => {
        const {pokemonPlayerOne, pokemonPlayerTwo, currentTurn} = this.state;
        const showCard = pokemonPlayerOne && pokemonPlayerTwo;
        if (showCard) {
            return (<>
                <section className="pf-player-one">
                    <h1>{pokemonPlayerOne  ? pokemonPlayerOne.name : ''}</h1>
                    <div className="attk-bubble">
                    { this.renderBubble(Number(currentTurn) === 1) }
                    </div>
                    <img src={pokemonPlayerOne.sprites ? pokemonPlayerOne.sprites[pokeSprite.back_default] : ''} />
                    <div className="container-progressbar">
                        {this.renderProgressBar()}
                    </div>
                    <div className="moves">
                        {this.renderMoves()}
                    </div>
                </section>
                <section className="pf-player-one">
                    <h1>{pokemonPlayerTwo ? pokemonPlayerTwo.name : ''}</h1>
                    <div className="attk-bubble">
                    { this.renderBubble(Number(currentTurn) === 2) }
                    </div>
                    <img src={pokemonPlayerTwo.sprites ? pokemonPlayerTwo.sprites[pokeSprite.front_default] : ''} />
                    <div className="container-progressbar">
                        {this.renderProgressBar(true)}
                    </div>
                    <div className="moves">
                        {this.renderMoves(true)}
                    </div>
                </section>
                </>
            )
        }
    }

    render() {
        return (
            <div className="pokemon-fight">
                <div className="container-pokeball">
                    <div className="pokemon-remaining">
                       Player One: {this.renderPokemonRemaining()}
                    </div>
                    <div className="pokemon-remaining">
                        Player Two: {this.renderPokemonRemaining(true)}
                    </div>
                </div>
                    <div className="container-battle">
                       {this.renderPokemonCardBattle()}
                    </div>
            </div>
        );
    }
}

export default FightPage;