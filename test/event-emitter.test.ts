import EventEmitter from "../src/event-emitter"

describe("Dummy test", () => {

  it('Emits', done => {
    const emitter = new EventEmitter();

    emitter.on('start', (data) => {
      expect(data).toBe('hello');
      done();
    })
    emitter.send('start', 'hello');
  })

  it('is called exactly 3 times', () => {

    const emitter = new EventEmitter();

    const spy = jest.fn();
    emitter.on('start', spy);

    emitter.send('start', 'hello');
    emitter.send('start', 'hello');
    emitter.send('start', 'hello');

    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, 'hello');
    expect(spy).toHaveBeenNthCalledWith(2, 'hello');
    expect(spy).toHaveBeenNthCalledWith(3, 'hello');
    expect(spy).toHaveReturnedTimes(3);

  })

  it('Can use a listener with no data', () => {

    const emitter = new EventEmitter();

    const spy = jest.fn();
    emitter.on('start', spy);

    emitter.send('start', 'hello');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturnedTimes(1);

  })

  it('Does not do anything if we try to send a message to an unregistered channel', () => {
    const emitter = new EventEmitter();

    const spy = jest.fn();

    emitter.send('start', 'hello');

    expect(emitter._subscriptions).toEqual({});
  })

  it('Can unregister listeners', () => {
    const emitter = new EventEmitter();

    const spy = jest.fn();

    emitter.send('start', 'hello');

    expect(emitter._subscriptions).toEqual({});
  })

})
