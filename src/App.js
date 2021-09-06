import logo from './logo.svg';
import './App.css';
import Annotate from './Annotate';
function App() {
  const handleSelect = selection => {
    console.log(selection);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://spg.dev'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <br />

        <Annotate selectionType='FULL_WORDS' onSelect={handleSelect}>
          <p>This, is the Full Words</p>
          <p key={10}>ਸ਼੍ਰੀ ਸਤਿਗੁਰੁ ਨਦ ਤੇ ਉਤਰਿ,,,,, ਆਇ ਦਮਦਮੇ ਥਾਨ? !</p>
          <p key={11}>ਧਰਮਸਾਲ ਸੁੰਦਰ ਰਚੀ, ਮਿਲੇ ਸਿੱਖ੍ਯ ਗਨ ਆਨ</p>
        </Annotate>

        <Annotate selectionType='FULL_STRING' onSelect={handleSelect}>
          <p>This is the FULL_STRING, and should grab the entire string no matter what....</p>
          <p key={12}>ਜਹਿਂ ਧੋਬਨਿ ਕੋ ਬ੍ਰਿੱਛ ਟਿਕਾਯਹੁ</p>
          <p key={13}>ਏਕ ਗ੍ਰਾਮ ਤੌ ਤਹਾਂ ਬਸਾਯਹੁ</p>
          <p key={14}>ਅਪਰ ਥਾਨ ਖੰਜਰ ਜੋ ਲਹ੍ਯੋ</p>
          <p key={15}>ਅਵਨੀ ਬਿਖੈ ਗਾਡ ਸੋ ਦਯੋ</p>
        </Annotate>
      </header>
    </div>
  );
}

export default App;
