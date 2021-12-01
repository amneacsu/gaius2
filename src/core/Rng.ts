export class Rng {
  seed: number;

  constructor(seed?: number) {
    this.seed = seed ?? Math.random();
  }

  random() {
    let t = Math.sin(this.seed);
    t *= Math.pow(10, 5);
    t = t - Math.floor(t);
    this.seed += 1;
    return t;
  }

  float(min: number, max: number) {
    return this.random() * (max - min) + min;
  }

  int(min: number, max: number) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  sample<T>(list: T[]) {
    return list[this.int(0, list.length - 1)];
  }

  shuffle<T>(list: T[]) {
    const a = [...list];

    for (let i = 0; i < a.length; i++) {
      let j = this.int(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
  }

  setSeed(newSeed: number) {
    if (newSeed % Math.PI === 0) {
      newSeed += 0.1;
    }

    this.seed = newSeed;
  }
}
