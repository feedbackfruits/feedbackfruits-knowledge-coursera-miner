import test from 'ava';

import memux from 'memux';
import init from '../lib';
import { NAME, KAFKA_ADDRESS, OUTPUT_TOPIC, INPUT_TOPIC, PAGE_SIZE, START_PAGE } from '../lib/config';

test('it exists', t => {
  t.not(init, undefined);
});

test('it works', async (t) => {
  try {
    let _resolve, _reject;
    const resultsPromise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    let memo = [];
    const receive = (message) => {
      console.log('Received message!', message);
      memo.push(message);
      if (memo.length === 2) _resolve(memo);
    };

    await memux({
      name: 'dummy-broker',
      url: KAFKA_ADDRESS,
      input: OUTPUT_TOPIC,
      receive,
      options: {
        concurrency: 1
      }
    });

    await init({
      name: NAME,
    });

    const results = await resultsPromise;
    console.log('Result data:', results);

    t.deepEqual(results[0], {
      action: 'write',
      data: {
        '@id': 'https://www.coursera.org/learn/machine-learning',
        'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': [
          '<https://knowledge.express/Topic>',
        ],
        'https://knowledge.express/resource': [
          '<https://d3c33hcgiwev3.cloudfront.net/qHTMkA4fEeW2rSIAC2yC6g.processed/full/540p/index.mp4?Expires=1495756800&Signature=QKgHlIfWd6eHA4XL11KXRqAMlhaOhhHana2GXIMlWjSK9RRsjQSCBLo4jHDWu2kosKDJg707CAn2U6cMwBxfGBP31NhecH~gybGS7GT8iyIuPr6cPRG5Ea6HfimBVBBV2m42AX3ECrx1mXwnz~f73XG40fnHBw3yXWq6FEFRScY_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A>',
        ],
      },
      key: 'https://www.coursera.org/learn/machine-learning',
      label: NAME,
    });

    return t.deepEqual(results[1], {
      action: 'write',
      data: {
            '@id': 'https://d3c33hcgiwev3.cloudfront.net/qHTMkA4fEeW2rSIAC2yC6g.processed/full/540p/index.mp4?Expires=1495756800&Signature=QKgHlIfWd6eHA4XL11KXRqAMlhaOhhHana2GXIMlWjSK9RRsjQSCBLo4jHDWu2kosKDJg707CAn2U6cMwBxfGBP31NhecH~gybGS7GT8iyIuPr6cPRG5Ea6HfimBVBBV2m42AX3ECrx1mXwnz~f73XG40fnHBw3yXWq6FEFRScY_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A',
            'http://schema.org/name': [
              '01_welcome-to-machine-learning',
            ],
            'http://schema.org/sourceOrganization': [
              'Coursera',
            ],
            'http://schema.org/text': [
"What is machine learning? You probably use it dozens of times a day without even knowing it. Each time you do a web search on Google or Bing, that works so well because their machine learning software has figured out how to rank what pages. When Facebook or Apple's photo application recognizes your friends in your pictures, that's also machine learning. Each time you read your email and a spam filter saves you from having to wade through tons of spam, again, that's because your computer has learned to distinguish spam from non-spam email. So, that's machine learning. There's a science of getting computers to learn without being explicitly programmed. One of the research projects that I'm working on is getting robots to tidy up the house. How do you go about doing that? Well what you can do is have the robot watch you demonstrate the task and learn from that. The robot can then watch what objects you pick up and where to put them and try to do the same thing even when you aren't there. For me, one of the reasons I'm excited about this is the AI, or artificial intelligence problem. Building truly intelligent machines, we can do just about anything that you or I can do. Many scientists think the best way to make progress on this is through learning algorithms called neural networks, which mimic how the human brain works, and I'll teach you about that, too. In this class, you learn about machine learning and get to implement them yourself. I hope you sign up on our website and join us."
            ],
        'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': [
              '<http://schema.org/VideoObject>',
              '<https://knowledge.express/Resource>',
        ],
            'https://knowledge.express/topic': [
              '<https://www.coursera.org/learn/machine-learning>',
            ],
      },
      key: 'https://d3c33hcgiwev3.cloudfront.net/qHTMkA4fEeW2rSIAC2yC6g.processed/full/540p/index.mp4?Expires=1495756800&Signature=QKgHlIfWd6eHA4XL11KXRqAMlhaOhhHana2GXIMlWjSK9RRsjQSCBLo4jHDWu2kosKDJg707CAn2U6cMwBxfGBP31NhecH~gybGS7GT8iyIuPr6cPRG5Ea6HfimBVBBV2m42AX3ECrx1mXwnz~f73XG40fnHBw3yXWq6FEFRScY_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A',
      label: 'coursera',

      label: NAME,
    });
  } catch(e) {
    console.error(e);
    throw e;
  }
});
