require('dotenv').load({ silent: true });

const {
  NAME = 'coursera',
  KAFKA_ADDRESS = 'tcp://localhost:9092',
  OUTPUT_TOPIC = 'update_requests',
} = process.env;

// const KHAN_API_ENDPOINT = 'https://academic.microsoft.com/api/browse/GetEntityDetails';

export {
  NAME,
  KAFKA_ADDRESS,
  OUTPUT_TOPIC,
}
