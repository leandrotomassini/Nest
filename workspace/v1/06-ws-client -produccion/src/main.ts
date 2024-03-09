import { connectToServer } from './socket-client';
import './style.css';


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>

    <h2>Websocket - Client</h2>

    <input id="jwtToken" placeholder="Json Web Token"/>
    
    <button id="btn-connect">Connect</button>
    
    <br/>
    
    <span id="server-status">Offline</span>
    
    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input">
    </form>

    <h3>Messages</h3>

    <ul id="messages-ul"></ul>
  </div>
`;

// connectToServer();

const jwtToken = document.querySelector<HTMLInputElement>('#jwtToken');
const btnConnect = document.querySelector<HTMLInputElement>('#btn-connect');

btnConnect?.addEventListener('click', () => {

  if (jwtToken!.value.trim().length <= 0) return alert('enter a valid jwt');

  connectToServer(jwtToken!.value.trim());

});
