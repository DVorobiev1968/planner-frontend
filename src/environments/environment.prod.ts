export const environment = {
  production: {
    "budgets": [
      {
        "type": "initial",
        "maximumWarning": "2.4mb",
        "maximumError": "5mb"
      },
      {
        "type": "anyComponentStyle",
        "maximumWarning": "2kb",
        "maximumError": "4kb"
      }
    ],
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ],
    "outputHashing": "all",
    "proxyConfig": "proxy.conf.product.json"
  },
  development: {
    "buildOptimizer": false,
    "optimization": {
      "scripts": true,
      "styles": {
        "minify": true,
        "inlineCritical": false
      },
      "fonts": { "inline": true }
    },
    "vendorChunk": true,
    "extractLicenses": false,
    "sourceMap": {
      "scripts": true,
      "styles": false,
      "hidden": true,
      "vendor": true
    },
    "namedChunks": true
  }
};
