const express = require("express");
const client = require("prom-client")
const doSomeHeavyTask = require("./util");

const app = express();
const PORT = 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

app.get('/',(req,res)=>{
    return res.json({ msg: "hii" });
});

app.get('/metrics',async (req,res)=>{
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
})

app.get('/slow',async (req,res)=>{
    try {
        const timeTaken = await doSomeHeavyTask();
        return res.json({
            status: "success",
            message: `heavy task completed in ${timeTaken}ms`,
        });

    } catch(err) {
        return res
            .status(400)
            .json({ status: "error", error: " internal server erro", err })
    }
})

app.listen(PORT,()=> console.log(`Server is running on ${PORT}`));