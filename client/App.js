import { html, pull } from 'inu'
import defer from 'pull-defer'
import request from 'xhr'

const INITIAL_MODEL = {
  pairings: []
}

const FETCH_PAIRINGS = 'FETCH_PAIRINGS'
const UPDATE_PAIRINGS = 'UPDATE_PAIRINGS'

const App = {
  init: () => ({
    model: INITIAL_MODEL,
    effect: { type: FETCH_PAIRINGS }
  }),

  update: (model, action) => {

    switch (action.type) {
      case UPDATE_PAIRINGS:
        const pairings = action.pairings
        const model = { pairings }
        return { model }
      default:
        return model
    }
  },

  view: (model, dispatch) => html`
    <div class='main'>
      <h1>MTG table pairings</h1>
      ${model.pairings.map( p => html` 
          <div class='row'>
            <div class='ten columns'>${p.Player}</div>
            <div class='two columns'>${p.Table}</div> 
          </div>
        `)
      }
    </div>
  `,

  run: (effect) => {
    switch (effect.type) {

      case FETCH_PAIRINGS:
        let source = defer.source()

        request.get('/data', (err, res) => {
          if (err) console.log(err)

          const model = JSON.parse(res.body)
          const pairings = model.pairings

          source.resolve(
            pull.values([{
              type: UPDATE_PAIRINGS,
              pairings
            }])
         )
        })

        return source

      default:
        console.log('some unmatched effect', effect)
    }
  }
}

export default App

