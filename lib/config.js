"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').load({ silent: true });
const { NAME = 'coursera', KAFKA_ADDRESS = 'tcp://localhost:9092', OUTPUT_TOPIC = 'update_requests', } = process.env;
exports.NAME = NAME;
exports.KAFKA_ADDRESS = KAFKA_ADDRESS;
exports.OUTPUT_TOPIC = OUTPUT_TOPIC;
