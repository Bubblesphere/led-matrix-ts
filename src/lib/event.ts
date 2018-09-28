type Handler<T> = (data?: T) => void;

export interface IEvent<T> {
  on(handler: Handler<T>) : void;
  off(handler: Handler<T>) : void;
}

export class Event<T> implements IEvent<T> {
  private handlers: Handler<T>[] = [];

  public on(handler: Handler<T>) : void {
      this.handlers.push(handler);
  }

  public off(handler: Handler<T>) : void {
      this.handlers = this.handlers.filter(h => h !== handler);
  }

  public trigger(data?: T) {
      this.handlers.slice(0).forEach(h => h(data));
  }

  public expose() : IEvent<T> {
    return this;
  }
}