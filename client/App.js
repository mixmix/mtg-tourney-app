import { html, pull } from 'inu'
import defer from 'pull-defer'
import request from 'xhr'

const INITIAL_MODEL = {
  pairings: [{
    Player: 'dave schoze',
    Table: 12,
  }]
}

const FETCH_PAIRINGS = 'FETCH_PAIRINGS'
const UPDATE_PAIRINGS = 'UPDATE_PAIRINGS'

const App = {
  init: () => ({
    model: INITIAL_MODEL,
    //effect: FETCH_PAIRINGS
  }),

  //update: (model, action) => {
    //switch (action.type) {
      //case UPDATE_PAIRINGS:
        //const parings = action.pairings
        //const model = Object.assign({}, model, { pairings })
        //return { model }
      //default:
        //return model
    //}
  //},

  view: (model, dispatch) => html`
    <div class='main'>
      <p>Hi</p>
      ${model.pairings.map( p => html` 
          <div class='row'>
            <div class='ten columns'>${p.Player}</div>
            <div class='two columns'>${p.Table}</div> 
          </div>
        `)
      }
    </div>
  `,

  //run: (effect) => {
    //switch (effect.type) {

      //case FETCH_PAIRINGS:
        //let source = defer.source()

        //request.get('/data', (err, res) => {
          //if (err) console.log(err)

          //const model = JSON.parse(res.body)
          //console.log('model in client bundle', model)
          //const pairings = model.pairings

          //source.resolve(
            //pull.values({
              //type: UPDATE_PAIRINGS,
              //pairings
            //})
         //)
        //})

        //return source
    //}
  //}
}

export default App

