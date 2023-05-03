import './App.css';
import { Variable, Palette } from './types';

import Button from './components/Button';

const variables = {
  accountId: '123',
  key: '$blue',
  value: '#7198FD',
  libraryId: '123',
} as any as Variable;

const palette = {
  accountId: '234',
  libraryId: '123',
  colors: [{
    key: '$red',
    rgb: 'red',
    hex: 'red',
  }],
} as any as Palette;

function App() {
  return (
    <div className="App">
      <Button _variables={[variables]} _palette={palette} _styles={{ backgroundColor: 'lightgray', '&:hover': { backgroundColor: '$blue', color: '$red' } }}>
        Hello World!
      </Button>
    </div>
  );
}

export default App;
