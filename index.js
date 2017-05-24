require('dotenv').load({ silent: true });

// const KHAN_API_ENDPOINT = 'https://academic.microsoft.com/api/browse/GetEntityDetails';

const {
  NAME = 'coursera',
  KAFKA_ADDRESS = 'tcp://kafka:9092',
  OUTPUT_TOPIC = 'quad_update_requests',
} = process.env;

const memux = require('memux');
const fetch = require('node-fetch');
const PQueue = require('p-queue');
const jsonld = require('jsonld').promises;
const log = console.log.bind(console);

const { send } = memux({
  name: NAME,
  url: KAFKA_ADDRESS,
  output: OUTPUT_TOPIC
});

const queue = new PQueue({
  concurrency: 16
});

const topictree = require('./topictree.json');

const Context = {
  type: '<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>',
  name: '<http://schema.org/name>',
  image: '<http://schema.org/image>',
  description: '<http://schema.org/description>',
  text: '<http://schema.org/text>',
  url: '<http://schema.org/url>',
  sameAs: '<http://schema.org/sameAs>',
  license: '<http://schema.org/license>',
  sourceOrganization: '<http://schema.org/sourceOrganization>',
  author: '<http://schema.org/author>',
  about: '<http://schema.org/about>',
  citation: '<http://schema.org/citation>',
  CreativeWork: '<http://schema.org/CreativeWork>',
  VideoObject: '<http://schema.org/VideoObject>',
  Movie: '<http://schema.org/Movie>',
  Person: '<http://schema.org/Person>',
  ReadAction: '<http://schema.org/ReadAction>',
  WriteAction: '<http://schema.org/WriteAction>',

  Coursera: {
    Course: '<https://www.coursera.org/Course>',
    Lecture: '<https://www.coursera.org/Lecture>',
    Section: '<https://www.coursera.org/Section>',
    Part: '<https://www.coursera.org/Part>',
 },

  AcademicGraph: {
    FieldOfStudy: '<http://academic.microsoft.com/FieldOfStudy>',
    parentFieldOfStudy: '<http://academic.microsoft.com/parentFieldOfStudy>',
    childFieldOfStudy: '<http://academic.microsoft.com/childFieldOfStudy>'
  },


  Knowledge: {
    Topic: '<https://knowledge.express/Topic>',
    next: '<https://knowledge.express/next>',
    previous: '<https://knowledge.express/previous>',
    child: '<https://knowledge.express/child>',
    parent: '<https://knowledge.express/parent>',
    resource: '<https://knowledge.express/resource>',

    Resource: '<https://knowledge.express/Resource>',
    topic: '<https://knowledge.express/topic>',
    entity: '<https://knowledge.express/entity>',

    Entity: '<https://knowledge.express/Entity>',
  }
}


global['topictree'] = topictree;
let i = 0;

const queuedSend = quad => queue.add(() => {
  console.log(i++);
  const action = { type: 'write', quad };
  return send(action);
});

const irify = uri => `<${uri}>`;

function doVideo(memo, video) {
  const iri = irify(video.co_url);
  const video_iri = irify(video.video_url)

  queuedSend({ subject: iri, predicate: Context.type, object: Context.Knowledge.topic })


  queuedSend({ subject: iri, predicate: Context.Knowledge.resource, object: video_iri });
  queuedSend({ subject: video_iri, predicate: Context.Knowledge.topic, object: iri });

  queuedSend({ subject: video_iri, predicate: Context.type, object: Context.VideoObject });
  queuedSend({ subject: video_iri, predicate: Context.type, object: Context.Knowledge.Resource });
  video.part && queuedSend({ subject: video_iri, predicate: Context.name, object: video.part });
  video.transcription && queuedSend({ subject: video_iri, predicate: Context.text, object: video.transcription });
  queuedSend({ subject: videoIri, predicate: Context.sourceOrganization, object: 'Coursera' });
}

topictree.map((video) => doVideo({}, video));
