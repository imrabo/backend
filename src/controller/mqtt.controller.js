import mqttClient from "../config/mqtt.client.js";


export  function mqttSubscrib(req, res) {
    const topic = req.query.topic;
    if (!topic) return res.status(400).send('Topic is required');
    
    mqttClient.subscribe(topic, (err) => {
        if (err) return res.status(500).send('Subscription failed');
        console.log(`Subscribed to ${topic}`)
        res.send(`Subscribed to ${topic}`);
    });
}

export  function mqttPublish(req, res) {
    const topic = req.query.topic;
    const message = req.query.message || 'Hello from Express!';
    if (!topic) return res.status(400).send('Topic is required');
    
    mqttClient.publish(topic, message);
    console.log(`Message sent to ${topic}: ${message}`)
    res.send(`Message sent to ${topic}: ${message}`);
}
