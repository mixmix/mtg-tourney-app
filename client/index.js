import React from 'react'
import ReactDOM from 'react-dom'
import request from 'xhr'

import App from './App'

document.addEventListener('DOMContentLoaded', function(e) {
  request.get('/data', (err, res) => {
    if (err) console.log(err)

    const store = JSON.parse(res.body)
    console.log('store in client bundle', store)

    const target = document.getElementById('app')

    ReactDOM.render(<App store={store} />, target)

  })
})

