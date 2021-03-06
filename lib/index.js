const TrackServerRenderer = require('track-server-renderer');

/**
 * TrackServer
 */
class TrackServer {
  /**
   * Start server.
   * @param {MiddlewareBase} middleware Middleware of server.
   * @param {object}         routes     Route definitions.
   * @param {Asset}          asset      Asset.
   * @param {integer}        port       Port of server.
   * @param {string}         bind       Binding address.
   * @return {promise} started promise.
   */
  static start(middleware, routes, asset, port=3001, bind='127.0.0.1') {
    Object.keys(routes).forEach(function(path) {
      const renderer = new TrackServerRenderer(routes[path], asset);
      middleware.register(path, renderer);
    });

    if (process.env.NODE_ENV != 'production') {
      middleware.static(asset.directory);
    }

    return middleware.listen(bind, port);
  }
}

module.exports = TrackServer;
