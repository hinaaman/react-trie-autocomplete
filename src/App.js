import React from 'react'

import AutoComplete from 'lib/AutoComplete';
import AutoCompleteSearch from 'components/AutoCompleteSearch'
import Database from 'components/Database'

import BIRDS from 'data/commonbirds';

import 'App.css'

function App() {
    const recommendationEngine = new AutoComplete(BIRDS);
    return (
        <div className="App">
            <AutoCompleteSearch recommendationEngine={recommendationEngine} />
            <Database title="Sample Database Values with Weights" data={BIRDS} />
        </div>
    )
}

export default App
