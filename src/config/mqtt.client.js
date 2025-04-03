// mqttClient.mjs
import mqtt from 'mqtt';

const brokerUrl = 'mqtt://broker.hivemq.com';
const mqttClient = mqtt.connect(brokerUrl);

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
});

mqttClient.on('message', (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
});

export default mqttClient
