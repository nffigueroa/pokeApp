import React from 'react';
import { getPokemonList, getPokeInfo } from '../../services';
import ItemList from '../../components/item-list/item-list';


import './list.css';
import { pokeSprite } from '../../config';

class PokeList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            pokeList: {
                results: [{}]
            }
        }
    }

    componentDidMount (){
        getPokemonList().then((res) => {
            this.setState({pokeList: {
                results: res.results
            }})
            this.fillId()
        });
    }

    fillId = () => {
        this.setState((state) => {
            state.pokeList.results.forEach((item) => {
                getPokeInfo(item.url)
                .then((info) => item.info = info)
            })
        })
        console.log(this.state.pokeList.results)
    }
    
    buildList  = () => {
        return this.state.pokeList.results.map((pokemon, index) => {
            return <ItemList key={index} name={pokemon.name} />;
        })
    }

    render() {
    return (
        <section className="list-container">
            {this.buildList()}
        </section>
        );
    }
  }

  export default PokeList;