import { html, pull } from 'inu'
import defer from 'pull-defer'
import request from 'xhr'

const INITIAL_MODEL = {
  refreshing: false,
  pairings: []
}

const FETCH_PAIRINGS = 'FETCH_PAIRINGS'
const REFRESH_PAIRINGS = 'REFRESH_PAIRINGS'
const UPDATE_PAIRINGS = 'UPDATE_PAIRINGS'

const App = {
  init: () => ({
    model: INITIAL_MODEL,
    effect: { type: FETCH_PAIRINGS }
  }),

  update: (model, action) => {

    switch (action.type) {
      case REFRESH_PAIRINGS:
        return {
          model: Object.assign({}, model, {refreshing: true}),
          effect: {
            type: FETCH_PAIRINGS
          }
        }
      case UPDATE_PAIRINGS:
        let newModel = Object.assign({}, model, {refreshing: false})
        newModel.pairings = action.pairings
        return { 
          model: newModel
        }
      default:
        return { model }
    }
  },

  view: (model, dispatch) => html`
    <div class='main'>
      <div>
        <button 
          class="refresh ${(model.refreshing) ? 'button-primary' : ''}"
          onclick=${ () => dispatch({type: REFRESH_PAIRINGS}) }
        >
          <i class="fa fa-refresh ${(model.refreshing) ? 'fa-spin' : ''}" aria-hidden="true"></i>
        </button>
      </div>
      
      ${model.pairings.map( p => html` 
          <div class='row'>
            <div class='two columns'>${p.Table}</div> 
            <div class='ten columns'>${p.Player.replace(/,.*/,'')}, <strong>${p.Player.replace(/[^,]*,/,'')}</strong></div>
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

