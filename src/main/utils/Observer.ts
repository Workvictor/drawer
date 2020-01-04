type Subscriber<Data> = (data: Data) => void;

export class Observer<Data> {
  protected observers: Array<Subscriber<Data>> = [];

  subscribe = (fn?: Subscriber<Data>) => {
    if (fn) {
      this.observers.push(fn);
    }
    return this;
  };

  unsubscribe = (fn: Subscriber<Data>) => {
    this.observers = this.observers.filter(i => i !== fn);
    return this;
  };

  broadcast = (data: Data) => {
    this.observers.forEach(sub => sub(data));
  };
}
