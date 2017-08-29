import { Doc, Helpers } from 'feedbackfruits-knowledge-engine';
import * as Context from './context';

export type Video = {
  co_url: string,
  video_url: string,
  transcription: string,
  part: string,
};

export async function videoToDocs(video: Video): Promise<Doc[]> {
  console.log('Converting video to doc:', video.co_url);
  const iri = Helpers.iriify(video.co_url);
  const video_iri = Helpers.iriify(video.video_url);
  let quads = [];

  quads.push({ subject: iri, predicate: Context.type, object: Context.Knowledge.Topic })


  quads.push({ subject: iri, predicate: Context.Knowledge.resource, object: video_iri });
  quads.push({ subject: video_iri, predicate: Context.Knowledge.topic, object: iri });

  quads.push({ subject: video_iri, predicate: Context.type, object: Context.VideoObject });
  quads.push({ subject: video_iri, predicate: Context.type, object: Context.Knowledge.Resource });
  video.part && quads.push({ subject: video_iri, predicate: Context.name, object: video.part });
  video.transcription && quads.push({ subject: video_iri, predicate: Context.text, object: video.transcription });
  quads.push({ subject: video_iri, predicate: Context.sourceOrganization, object: 'Coursera' });

  return Helpers.quadsToDocs(quads);
}
