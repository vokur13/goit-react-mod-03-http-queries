import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

const styles = { form: { marginBottom: 20 } };

export function PokemonForm({ onSubmit }) {
  const [pokemonName, setPokemonName] = useState('');

  function handleNameChange(e) {
    setPokemonName(e.currentTarget.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (pokemonName.trim() === '') {
      return toast.error('Input Pokemon name please');
    }

    onSubmit(pokemonName);
    setPokemonName('');
  }
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="pokemonName"
        value={pokemonName}
        onChange={handleNameChange}
      />
      <button type="submit">
        <ImSearch style={{ marginRight: 8 }} />
        Найти
      </button>
    </form>
  );
}

// export class protoPokemonForm extends Component {
//   state = {
//     pokemonName: '',
//   };

//   handleNameChange = event => {
//     this.setState({ pokemonName: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     if (this.state.pokemonName.trim() === '') {
//       return toast.error('Input Pokemon name please');
//     }

//     this.props.onSubmit(this.state.pokemonName);
//     this.setState({ pokemonName: '' });
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           name="pokemonName"
//           value={this.state.pokemonName}
//           onChange={this.handleNameChange}
//         />
//         <button type="submit">
//           <ImSearch style={{ marginRight: 8 }} />
//           Найти
//         </button>
//       </form>
//     );
//   }
// }
