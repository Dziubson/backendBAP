"use strict";

module.exports = {
  //MONGO CONFIG
  URI_MONGO: process.env.URI_MONGO || 'mongodb://root:ffUwWMf6yQrLUq7@cluster0-shard-00-00-6nv0r.gcp.mongodb.net:27017,cluster0-shard-00-01-6nv0r.gcp.mongodb.net:27017,cluster0-shard-00-02-6nv0r.gcp.mongodb.net:27017/db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  //PORT APP CONFIG
  PORT_LISTEN: process.env.PORT_LISTEN || 10002,
  //JWT CONFIG
  TOKEN_SECRET_JWT: process.env.TOKEN_SECRET_JWT || 'jWt9982_s!tokenSecreTqQrtw'
};