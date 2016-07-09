import React from 'react'

const App = (props) => {
  return (
    <div>
    {props.store.pairings.map(p => (
        <div key={p.DCI} className='row'>
          <div className='ten columns'>{p.Player}</div>
          <div className='two columns'>{p.Table}</div> 
        </div>
      ))
    }
    </div>
  )
}

export default App

