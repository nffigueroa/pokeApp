import React from 'react';
import { getRandomEnemies, getPokemonPowerInfoByMove, getPokemonHp } from '../../services';
import './fight.css';
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
        this.props.pokemonFight.forEach(() => {
            getRandomEnemies(this.props.pokeList.pokeList, this.props.pokemonFight.length)
            .then((response) => {
                this.setState({ pokemonEnemies: [...this.props.pokeEnemies, response] });
                this.props.addEnemies([...this.props.pokeEnemies, response])
                return Promise.resolve();
            })
            .then(() => {
                this.selectPokemon(`0F`); // Initialize the player one card battle
                this.selectPokemon(`0E`);   // Initialize the player two card battle
            })
        })
    }
    selectPokemon = (id, event) => {
        if ( event ) { event.persist()};

        const flagEnemies = id.includes('E');
        if (flagEnemies) {
            this.setState(
                {
                    pokemonPlayerTwo :
                    {
                        ...this.props.pokeEnemies[id.split('E')[0]],
                        hp: getPokemonHp(this.props.pokeEnemies[Number(id.split('E')[0])].height, this.props.pokeEnemies[Number(id.split('E')[0])].weight),
                        currrentHp: getPokemonHp(this.props.pokeEnemies[Number(id.split('E')[0])].height, this.props.pokeEnemies[Number(id.split('E')[0])].weight)
                    }
                })
        } else {
            this.setState(
                {
                    pokemonPlayerOne : {
                        ...this.props.pokemonFight[id.split('F')[0]],
                        hp: getPokemonHp(this.props.pokemonFight[Number(id.split('F')[0])].height, this.props.pokemonFight[Number(id.split('F')[0])].weight),
                        currrentHp: getPokemonHp(this.props.pokemonFight[Number(id.split('F')[0])].height, this.props.pokemonFight[Number(id.split('F')[0])].weight)
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
                let currrentHp = this.state.pokemonPlayerOne.currrentHp - this.state.tAttk;
                this.setState({
                    pokemonPlayerOne: {
                        ...this.state.pokemonPlayerOne,
                        currrentHp
                    },
                    currentTurn: Number(this.state.currentTurn) === 1 ? 2 : 1
                })
            } else {
                let currrentHp = this.state.pokemonPlayerTwo.currrentHp - this.state.tAttk;
                if (currrentHp <= 0) {
                    const newPokemon = this.props.pokeEnemies.filter((item) => item.currrentHp > 0)[0];
                    console.log(newPokemon)
                    this.setState({
                        pokemonPlayerTwo: {
                           newPokemon
                        },
                        currentTurn: Number(this.state.currentTurn) === 1 ? 2 : 1    
                    })
                    return;
                }
                this.setState({
                    pokemonPlayerTwo: {
                        ...this.state.pokemonPlayerTwo,
                        currrentHp
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
                    Player One: <PokemonRemainingComponent shoeEnemies={false} pokemonFight={this.props.pokemonFight}  selectPok={this.selectPokemon} />
                    </div>
                    <div className="pokemon-remaining">
                    Player Two: <PokemonRemainingComponent showEnemies={true} pokemonFight={this.props.pokemonFight} selectPok={this.selectPokemon} />
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
    pokemonFight: state.pokemon.pokemonFight.payload.pokemonFight,
    pokeList: state.pokemon.pokeList.payload,
    pokeEnemies: state.pokemon.pokeEnemies ? state.pokemon.pokeEnemies.payload : []
})

const mapDispacthToProps  = (dispatch) => bindActionCreators({addEnemies}, dispatch);

export default connect(mapStateToProps, mapDispacthToProps)(WithAuthentication(FightPage));