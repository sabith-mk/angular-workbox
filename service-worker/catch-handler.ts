import { RouteHandler } from 'workbox-core/types';

export const catchHandler: RouteHandler = { handle: (args) => new Promise(resolve => resolve(Response.error())) }