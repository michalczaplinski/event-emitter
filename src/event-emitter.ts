// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"

type Subscriptions = { [key: string]: Function[] }

export default class EventEmitter {
  _subscriptions: Subscriptions = {};

  on(channel: string, handler: (data: any) => void): this {
    if (!this._subscriptions[channel]) {
      this._subscriptions[channel] = [];
    };
    this._subscriptions[channel].push(handler);
    return this;
  }

  off(channel: string, handler: Function) {
    if (!this._subscriptions[channel]) {
      throw new Error(`There is no channel called ${channel}`)
    }
    const currentHandler = this._subscriptions[channel].find(h => h === handler);
    if (!currentHandler) {
      throw new Error(`There is no handler ${handler.name}`)
    }

    currentHandler()

  }

  send(channel: string, data: any) {
    if (!this._subscriptions[channel]) return;

    this._subscriptions[channel].forEach(subscriber => {
      subscriber(data);
    });
  }
}