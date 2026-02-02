const express = require("express");
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const responseTime = require("response-time");
const client = require("prom-client")
const doSomeHeavyTask = require("./util");
const { error } = require("winston");

const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100"
    })
  ]
};
const logger = createLogger(options);

const app = express();
const PORT = 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
    name: "http_req_req_time",
    help: "This tell how much time is taken by req res",
    labelNames: ["method","route", "status_code"],
    buckets: [1,20,50,100,500,1000,1500,2000,3000]
});

app.use(responseTime((req,res,time)=> {
    reqResTime.labels({
        method: req.method,
        route: req.route,
        status_code: res.statusCode
    }).observe(time);
}))

app.get('/',(req,res)=>{
    logger.info('req came on / route');
    return res.json({ msg: "hii" });
});

app.get('/metrics',async (req,res)=>{
    logger.info('req came on /metrics route');
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
})

app.get('/slow',async (req,res)=>{
    try {
        logger.info('req came on /slow route');
        const timeTaken = await doSomeHeavyTask();
        return res.json({
            status: "success",
            message: `heavy task completed in ${timeTaken}ms`,
        });

    } catch(err) {
        logger.error(error.message);
        return res
            .status(400)
            .json({ status: "error", error: " internal server erro", err })
    }
})

app.listen(PORT,()=> console.log(`Server is running on ${PORT}`));