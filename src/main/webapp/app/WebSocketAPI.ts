import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as log from 'loglevel';

export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:4201/ws';
  topic = '/topic/greetings';
  stompClient: any;

  constructor() {}
  _connect(): void {
    log.warn('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    this.stompClient.connect(
      {},
      function(): void {
        _this.stompClient.subscribe(_this.topic, function(sdkEvent: any) {
          _this.onMessageReceived(sdkEvent);
        });
        // _this.stompClient.reconnect_delay = 2000;
      },
      this.errorCallBack
    );
  }

  _disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    log.warn('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: string) {
    log.warn('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message: string): void {
    log.warn('calling logout api via web socket');
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
  }

  onMessageReceived(message: string): void {
    log.warn('Message Recieved from Server :: ' + message);
  }
}
