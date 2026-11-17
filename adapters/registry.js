'use strict';

class AdapterRegistry {
  constructor() {
    this._adapters = new Map();
  }

  register(adapter) {
    if (!adapter || !adapter.name) {
      throw new Error('Adapter must have a name property');
    }
    this._adapters.set(adapter.name, adapter);
    return this;
  }

  get(name) {
    return this._adapters.get(name) || null;
  }

  list() {
    return Array.from(this._adapters.keys());
  }

  has(name) {
    return this._adapters.has(name);
  }
}

module.exports = {
  AdapterRegistry
};
