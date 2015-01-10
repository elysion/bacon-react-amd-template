requirejs(["./dependencies"], function() {
  require(["app/main"], function(app) {
    app.init();
  });
});
