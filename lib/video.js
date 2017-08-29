"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedbackfruits_knowledge_engine_1 = require("feedbackfruits-knowledge-engine");
const Context = require("./context");
function videoToDocs(video) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Converting video to doc:', video.co_url);
        const iri = feedbackfruits_knowledge_engine_1.Helpers.iriify(video.co_url);
        const video_iri = feedbackfruits_knowledge_engine_1.Helpers.iriify(video.video_url);
        let quads = [];
        quads.push({ subject: iri, predicate: Context.type, object: Context.Knowledge.Topic });
        quads.push({ subject: iri, predicate: Context.Knowledge.resource, object: video_iri });
        quads.push({ subject: video_iri, predicate: Context.Knowledge.topic, object: iri });
        quads.push({ subject: video_iri, predicate: Context.type, object: Context.VideoObject });
        quads.push({ subject: video_iri, predicate: Context.type, object: Context.Knowledge.Resource });
        video.part && quads.push({ subject: video_iri, predicate: Context.name, object: video.part });
        video.transcription && quads.push({ subject: video_iri, predicate: Context.text, object: video.transcription });
        quads.push({ subject: video_iri, predicate: Context.sourceOrganization, object: 'Coursera' });
        return feedbackfruits_knowledge_engine_1.Helpers.quadsToDocs(quads);
    });
}
exports.videoToDocs = videoToDocs;
