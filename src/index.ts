import { Component, ComponentStore } from './core';

const store = new ComponentStore;
const componentCount = 20000;
while (store.components.length < componentCount) {
  store.components.push(new Component());
}

console.log(store);
