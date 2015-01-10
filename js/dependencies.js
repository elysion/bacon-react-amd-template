requirejs.config({
  "paths": {
    "jquery": "lib/jquery/dist/jquery",
    "underscore": "lib/underscore/underscore",
    "handlebars": "lib/handlebars/handlebars.amd",
    "hbs": "lib/require-handlebars-plugin/hbs",
    "bacon": "lib/Bacon/dist/Bacon",
    "bjq": "lib/bacon.jquery/dist/bacon.jquery",
    "bacon.model": "lib/bacon.model/dist/bacon.model"
  },
  "shim": {
    "underscore": {
      "exports": '_'
    }
  }
});
