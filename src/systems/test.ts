class Bar {}
class FooBar extends Bar {
  x: number;
  constructor(x: number) {
    super();
    this.x = x;
  }
}

const items: Bar[] = [new FooBar(1)];

type Class<T> = {
  new(...args: any[]): T;
};

const find = <T>(itemClass: Class<T>): T | undefined => {
  return items.find((item) => {
    return item instanceof itemClass;
  }) as T;
};

const x = find(FooBar);
console.log(x);
