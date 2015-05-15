var _ = require("lodash");
var package = require([__dirname, "package"].join("/"));

function PacketAPI(options){
    this.options = {
        baseUrl: "https://api.packet.net",
        timeout: 10000,
        headers: {
            "User-Agent": [package.name, package.version].join(" "),
            "X-Auth-Token": options.api_key
        },
        pool: {
            maxSockets: Infinity
        },
        json: true
    }

    this.version = package.version;

    var endpoints = [
        "devices",
        "projects",
        "ssh_keys"
    ]

    _.each(endpoints, function(endpoint){
        _.merge(PacketAPI.prototype, require([__dirname, "lib", endpoint].join("/"))(this.options));
    }, this);
}

module.exports = PacketAPI;
