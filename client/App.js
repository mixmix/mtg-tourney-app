import { html, pull } from 'inu'
import defer from 'pull-defer'
import request from 'xhr'

const INITIAL_MODEL = {
  refreshing: false,
  pairings: [],
  filter: undefined,
  visibleColumns: [
    'Table',
    'Player',
    'Team',
    'Points',
    'Points-', // some quirk sometimes sees the Points column have a - at the end of it
  ],
}

const FETCH_PAIRINGS = 'FETCH_PAIRINGS'
const REFRESH_PAIRINGS = 'REFRESH_PAIRINGS'
const UPDATE_PAIRINGS = 'UPDATE_PAIRINGS'
const ADD_FILTER = 'ADD_FILTER'

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

      case ADD_FILTER:
        const filter = (action.filter) ? 
          new RegExp( action.filter.split('').join('.*'), 'i') : 
          undefined
        return {
          model: Object.assign({}, model, { filter })
        }

      default:
        return { model }
    }
  },

  view: (model, dispatch) => {
    const pairings = (model.filter) ?
      model.pairings.filter( p => p.Player.match(model.filter) ) :
      model.pairings

    const filledColumns = Object.keys(pairings[0] || [])
    const visibleColumns = model.visibleColumns.filter( col => filledColumns.indexOf(col) > -1 )

    return html`
      <div class='main'>
        <h1>MTG table</h1>
        <button 
          class="refresh ${(model.refreshing) ? 'button-primary' : ''}"
          onclick=${ () => dispatch({
              type: REFRESH_PAIRINGS
            })
          }
        >
          <i class="fa fa-refresh ${(model.refreshing) ? 'fa-spin' : ''}" aria-hidden="true"></i>
        </button>
        <input 
          type='text'
          placeholder='filter'
          oninput=${ (e) => dispatch({
              type: ADD_FILTER,
              filter: e.target.value
            })
          }
        />

        <table class="u-full-width">
          <tbody>
            ${pairings.map( pairing => html`
              <tr>
                ${visibleColumns.map( col => html`<td>${pairing[col]}</td>` )} 
              </tr>
            ` )}

          </tbody>
        </table>       
      </div>
    `
  },

  run: (effect) => {
    switch (effect.type) {

      case FETCH_PAIRINGS:
        let source = defer.source()

        request.get('/data', (err, res) => {
          if (err) console.log(err)

          const model = JSON.parse(res.body)
          const pairings = model.pairings
          console.log(JSON.stringify(model,null,2))

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

