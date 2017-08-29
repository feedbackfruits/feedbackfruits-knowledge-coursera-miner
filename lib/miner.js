"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
const video_1 = require("./video");
const topictree = require('../topictree.json');
function mine() {
    return rxjs_1.Observable.from(topictree)
        .flatMap(video_1.videoToDocs)
        .flatMap(x => x);
}
exports.mine = mine;
