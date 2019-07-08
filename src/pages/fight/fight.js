import React from 'react';
import { getRandomEnemies, getPowerByMove, getPokemonPowerInfoByMove, getPokemonHp } from '../../services';
import './fight.css';
import { pokeSprite } from '../../config';
import CardBatlle from '../../components/card-battle/card/CardBattle';
import PokemonRemainingComponent from '../../components/pokemon-remaining/PokemonRemaining';
import WithAuthentication from '../../enhancers/withAuth';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {addEnemies} from '../../actions/index';

class FightPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           // pokemonFight: this.props.location.state.pokemonFight,
            pokemonEnemies: [],
            // pokeList: this.props.location.state.pokeList.results,
            pokemonPlayerOne: {},
            pokemonPlayerTwo: {},
            tAttk: 0, //Total Attack
            currentTurn: 1 //Player Turn
        };
    }

    componentDidMount() {
        this.props.pokemonFight.pokemonFight.map(() => {
            getRandomEnemies(this.props.pokeList.pokeList, this.props.pokemonFight.pokemonFight.length)
            .then((response) => {
                this.setState({ pokemonEnemies: [...this.props.pokeEnemies, response] });
                this.props.addEnemies([...this.props.pokeEnemies, response])
            })
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
                        ...this.props.pokeEnemies[id[0]],
                        hp: getPokemonHp(this.props.pokeEnemies[id[0]].height, this.props.pokeEnemies[id[0]].weight),
                        currrentHp: getPokemonHp(this.props.pokeEnemies[id[0]].height, this.props.pokeEnemies[id[0]].weight)
                    }
                })
        } else {
            this.setState(
                {
                    pokemonPlayerOne : {
                        ...this.props.pokemonFight.pokemonFight[id[0]],
                        hp: getPokemonHp(this.props.pokemonFight.pokemonFight[id[0]].height, this.props.pokemonFight.pokemonFight[id[0]].weight),
                        currrentHp: getPokemonHp(this.props.pokemonFight.pokemonFight[id[0]].height, this.props.pokemonFight.pokemonFight[id[0]].weight)
                    }
                })
        }
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
                    },
                    currentTurn: Number(this.state.currentTurn) === 1 ? 2 : 1
                })
            } else {
                this.setState({
                    pokemonPlayerTwo: {
                        ...this.state.pokemonPlayerTwo,
                        currrentHp: this.state.pokemonPlayerTwo.currrentHp - this.state.tAttk,
                    },
                    currentTurn: Number(this.state.currentTurn) === 1 ? 2 : 1
                })
            }
        })
    }
    render() {
        return (
            <div className="pokemon-fight">
                <div className="container-pokeball">
                    <div className="pokemon-remaining">
                       Player One: <PokemonRemainingComponent shoeEnemies={false} pokemonFight={this.props.pokemonFight.pokemonFight}  selectPok={this.selectPokemon} />
                    </div>
                    <div className="pokemon-remaining">
                    Player Two: <PokemonRemainingComponent showEnemies={true} pokemonFight={this.props.pokemonFight.pokemonFight} selectPok={this.selectPokemon} />
                    </div>
                </div>
                    <div className="container-battle">
                        <CardBatlle {...this.state} useAttk={this.useAttack}/>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userName: !!state.user.payload,
    password: !!state.user.payload,
    pokemonFight: state.pokemon.pokemonFight.payload,
    pokeList: state.pokemon.pokeList.payload,
    pokeEnemies: state.pokemon.pokeEnemies ? state.pokemon.pokeEnemies.payload : []
})

const mapDispacthToProps  = (dispatch) => bindActionCreators({addEnemies}, dispatch);

export default connect(mapStateToProps, mapDispacthToProps)(WithAuthentication(FightPage));