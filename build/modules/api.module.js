"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ApiModule {
  constructor() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      store = {},
      providers = {},
      adapters = {},
      strategies = {},
      options = {},
      dependencies = {}
    } = settings;
    this.store = store;
    this.providers = providers;
    this.adapters = adapters;
    this.strategies = strategies;
    this.options = options;
    this.dependencies = dependencies;
    this.init();
  }

  get api() {
    return this.adapters;
  }

  init() {
    var {
      options: {
        isCreateDefaults = true
      },
      strategies
    } = this;

    if (isCreateDefaults) {
      this.createDefaults();
    }

    var strategyList = Object.keys(strategies).map(key => strategies[key]);
    this.initStrategies(strategyList);
  }

  createDefaults() {}

  initStrategies() {
    var strategyList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var {
      providers,
      adapters
    } = this;
    strategyList.forEach(strategy => strategy.bindHooksTo(adapters));
    strategyList.forEach(strategy => strategy.applyTo(providers));
  }

  healthCheck() {
    return this.providers.http('/test').then((_ref) => {
      var {
        data
      } = _ref;
      return data;
    });
  }

}

exports.default = ApiModule;