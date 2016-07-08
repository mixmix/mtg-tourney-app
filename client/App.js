import React from 'react'

const App = (props) => {
  return (
    <div>
      {props.store.pairings.map(p => <div key={p.DCI}>{p.Player} - {p.Table}</div> )}
    </div>
  )
}

export default App

