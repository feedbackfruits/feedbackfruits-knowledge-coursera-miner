import { Observable } from '@reactivex/rxjs';
import { Doc } from 'feedbackfruits-knowledge-engine';
import { Video, videoToDocs } from './video';

const topictree: Video[] = require('../topictree.json');

export function mine(): Observable<Doc> {
  return Observable.from(topictree)
    .flatMap(videoToDocs)
    .flatMap(x => x);
}
