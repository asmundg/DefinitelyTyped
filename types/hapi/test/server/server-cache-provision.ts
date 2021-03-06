// https://github.com/hapijs/hapi/blob/master/API.md#-await-servercacheprovisionoptions
import { Server } from "hapi";
import * as catbox from "catbox";

const server = new Server({
    port: 8000,
});
server.initialize();
server.cache.provision({engine: require('catbox-memory'), name: 'countries' });

const cache: catbox.Policy = server.cache({segment: 'countries', cache: 'countries', expiresIn: 60 * 60 * 1000 });
cache.set('norway', 'oslo', 10 * 1000, () => {});
const value = cache.get('norway', () => {});

server.start();

server.events.on('start', () => {
    console.log('Server started at: ' + server.info.uri);
});
