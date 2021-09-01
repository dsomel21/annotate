import logo from './logo.svg';
import './App.css';
import Annotate from './Annotate';
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <br />
        <br />
        <hr />

        <Annotate selectionType='FULL_STRING'>
          <p key={10}>ਸ਼੍ਰੀ ਸਤਿਗੁਰੁ ਨਦ ਤੇ ਉਤਰਿ, ਆਇ ਦਮਦਮੇ ਥਾਨ</p>
          <p key={11}>ਧਰਮਸਾਲ ਸੁੰਦਰ ਰਚੀ, ਮਿਲੇ ਸਿੱਖ੍ਯ ਗਨ ਆਨ</p>
        </Annotate>

        <p>ਜਹਿਂ ਧੋਬਨਿ ਕੋ ਬ੍ਰਿੱਛ ਟਿਕਾਯਹੁ</p>
        <p>ਏਕ ਗ੍ਰਾਮ ਤੌ ਤਹਾਂ ਬਸਾਯਹੁ</p>
        <p>ਅਪਰ ਥਾਨ ਖੰਜਰ ਜੋ ਲਹ੍ਯੋ</p>
        <p>ਅਵਨੀ ਬਿਖੈ ਗਾਡ ਸੋ ਦਯ</p>
        <p>ਤਹਿਂ ਇਕ ਗ੍ਰਾਮ ਬਸਾਯੋ ਭਾਰੀ</p>
        <p>ਖੰਜਰ ਤਾਂ ਕੋ ਨਾਮ ਉਚਾਰੀ</p>
        <p>ਪਾਤਿਸ਼ਾਹਿ ਕੀ ਕੇਤਿਕ ਸੈਨਾ</p>
        <p>ਤਹਾਂ ਟਿਕਾਵਨਿ ਕੀਨਿ ਸੁਖੈਨ</p>
        <p>ਹੱਦ ਕਰੀ ਦੁਇ ਰਾਜਨਿ ਕੇਰੀ</p>
        <p>ਜਿਸ ਤੇ ਉਠਹਿ ਬਿਰੋਧ ਨ ਫੇਰੀ</p>
        <p>ਦੁਹਿ ਦਿਸ਼ਿ ਕੋ ਕਰਿ ਹਰਖ ਸਮੇਤ</p>
        <p>ਆਪ ਆਪਨੇ ਰਾਜ ਸੁਚੇ</p>
        <p>ਦੇਸ਼ ਕਾਮਰੂ ਕੇਰ ਬਰੋਬਰ</p>
        <p>ਅਪਰ ਰਾਜ ਇਕ ਤਹਾਂ ਹੁਤੋ ਬਰ</p>
      </header>
    </div>
  );
}

export default App;
