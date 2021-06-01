import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

import { loadHistoday } from './network';

import { Chart } from './Chart';

const themes = ['pastel', 'neon'];

function App() {
  const [BTC, setBTC] = useState([]);
  const [ETH, setETH] = useState([]);

  const [theme, setTheme] = useState('pastel');
  const [title, setTitle] = useState('BTC, ETH');
  
  useEffect(()=> {
    loadHistoday({ fsym: 'BTC' }).then(setBTC);
    loadHistoday({ fsym: 'ETH' }).then(setETH);

    return;
    // below line is another option to avoid extraneous render
    
    Promise.all([
      loadHistoday({ fsym: 'BTC' }),
      loadHistoday({ fsym: 'ETH' }),
    ]).then(([ nextBTC, nextETH ])=> (
      setBTC(nextBTC),
      setETH(nextETH)
    ));
    
  }, []);

  const exchanges = useMemo(()=> ({ BTC, ETH }), [BTC, ETH]);
  
  return (
    <div className="App">
      {title}
      <Chart exchanges={exchanges} theme={theme}/>
      <button onClick={()=> setTheme(
        prev=> themes.filter(t=> t !== prev)[0]
      )}>Change Theme</button>
      <input
        style={{ position: 'fixed', bottom: 0 }}
        onChange={e=> setTitle(e.target.value)}
        value={title}/>
    </div>
  );
}

export default App;
