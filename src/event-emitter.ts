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

  off(channel: string, handler: (data: any) => void) {
    if (!this._subscriptions[channel]) {
      throw new Error(`There is no channel called ${channel}`)
    }
    const currentHandlerIndex = this._subscriptions[channel].findIndex(h => h === handler);
    if (currentHandlerIndex === -1) {
      throw new Error(`There is no handler ${handler.name}`)
    }
    this._subscriptions[channel] = [
      ...this._subscriptions[channel].slice(0, currentHandlerIndex),
      ...this._subscriptions[channel].slice(currentHandlerIndex + 1),
    ]
    if (this._subscriptions[channel].length === 0) {
      delete this._subscriptions[channel];
    }

  }

  send(channel: string, data: any) {
    if (!this._subscriptions[channel]) return;

    this._subscriptions[channel].forEach(subscriber => {
      subscriber(data);
    });
  }
}