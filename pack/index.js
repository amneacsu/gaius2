(() => {
  // src/types.ts
  var ComponentType;
  (function(ComponentType2) {
    ComponentType2[ComponentType2["None"] = 0] = "None";
  })(ComponentType || (ComponentType = {}));

  // src/core/Component.ts
  var Component = class {
    constructor() {
      this.type = ComponentType.None;
    }
  };

  // src/core/ComponentStore.ts
  var ComponentStore = class {
    constructor() {
      this.components = [];
    }
  };

  // src/index.ts
  var store = new ComponentStore();
  var componentCount = 2e4;
  while (store.components.length < componentCount) {
    store.components.push(new Component());
  }
  console.log(store);
})();
