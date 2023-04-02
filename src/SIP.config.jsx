import * as JsSIP from 'jssip'

let socket = new JsSIP.WebSocketInterface("Your WebSocket Here")
let configuration = {
    sockets: [ socket ],
    uri: "Your sip uri here",
    password: "Your password here if needed",
  }
export let phone = new JsSIP.UA(configuration)