import { Component } from 'react';
import PokemonDataView from './PokemonDataView';
import PokemonErrorView from './PokemonErrorView';
import PokemonPendingView from './PokemonPendingView';
import pokemonAPI from '../services/pokemon-api';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export class PokemonInfo extends Component {
  state = { pokemon: null, loading: false, error: null };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pokemonName !== this.props.pokemonName) {
      this.setState({ loading: true, pokemon: null });
      fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`No item ${this.props.pokemonName} found`);
          }
          return response.json();
        })
        .then(pokemon => this.setState({ pokemon }))
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  render() {
    const { loading, pokemon, error } = this.state;
    const { pokemonName } = this.props;
    return (
      <div>
        {error && <div>{error.message}</div>}
        {loading && <div>...Loading</div>}
        {!pokemonName && <div>Give us know PokemonName</div>}
        {pokemon && (
          <div>
            <p>{pokemon.name}</p>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              width="240px"
            />
          </div>
        )}
      </div>
    );
  }
}
