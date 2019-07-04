import React from 'react';
import { getRandomEnemies, getPowerByMove, getPokemonPowerInfoByMove, getPokemonHp } from '../../services';
import './fight.css';
import { pokeSprite } from '../../config';
import CardBatlle from '../../components/card-battle/card/CardBattle';
import PokemonRemainingComponent from '../../components/pokemon-remaining/PokemonRemaining';

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
    render() {
        return (
            <div className="pokemon-fight">
                <div className="container-pokeball">
                    <div className="pokemon-remaining">
                       Player One: <PokemonRemainingComponent {...this.state} showEnemies= {false} selectPok={this.selectPokemon} />
                    </div>
                    <div className="pokemon-remaining">
                    Player One: <PokemonRemainingComponent {...this.state} showEnemies= {true}  selectPok={this.selectPokemon}/>
                    </div>
                </div>
                    <div className="container-battle">
                        <CardBatlle {...this.state} useAttk={this.useAttack}/>
                    </div>
            </div>
        );
    }
}

export default FightPage;