import { Component } from 'react';
import PokemonDataView from './PokemonDataView';
import PokemonErrorView from './PokemonErrorView';
import PokemonPendingView from './PokemonPendingView';
import pokemonAPI from '../services/pokemon-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class PokemonInfo extends Component {
  state = { pokemon: null, error: null, status: Status.IDLE };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pokemonName !== this.props.pokemonName) {
      this.setState({ status: Status.PENDING });
      pokemonAPI
        .fetchPokemon(this.props.pokemonName)
        .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
        .catch(error => {
          this.setState({ error, status: Status.REJECTED });
        });
    }
  }

  render() {
    const { pokemon, error, status } = this.state;
    const { pokemonName } = this.props;

    if (status === 'idle') {
      return <div>Give us know PokemonName</div>;
    }
    if (status === 'pending') {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }
    if (status === 'rejected') {
      return <PokemonErrorView message={error.message} />;
    }
    if (status === 'resolved') {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}
