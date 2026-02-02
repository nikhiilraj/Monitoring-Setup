# 📊 Backend Monitoring with Prometheus, Grafana & Loki

A production-style **observability setup** for a Node.js backend using **Prometheus for metrics**, **Grafana for visualization**, and **Loki for centralized logging**.

This project demonstrates **hands-on experience** with real-world monitoring patterns including:
- Custom Prometheus metrics
- Request latency histograms
- Centralized structured logging
- Error visibility
- Docker-based observability stack

---

## 🚀 Tech Stack

### Backend
- **Node.js + Express**
- **prom-client** – Custom Prometheus metrics
- **response-time** – HTTP latency tracking
- **winston** – Structured logging
- **winston-loki** – Log shipping to Loki

### Observability
- **Prometheus** – Metrics scraping & storage
- **Grafana** – Metrics & log visualization
- **Loki** – Centralized log aggregation
- **Docker Compose** – Infrastructure orchestration

---

## 🏗️ Architecture Overview

```

```
                ┌──────────────┐
                │   Client     │
                └──────┬───────┘
                       │ HTTP Requests
                       ▼
              ┌──────────────────┐
              │  Node.js Backend │
              │  (Express API)   │
              │                  │
              │ ┌──────────────┐ │
              │ │ Prom Metrics │ │───▶ /metrics
              │ └──────────────┘ │
              │                  │
              │ ┌──────────────┐ │
              │ │ Winston Logs │ │───▶ Loki
              │ └──────────────┘ │
              └─────────┬────────┘
                        │
    ┌───────────────────┴───────────────────┐
    │                                       │
```

┌──────────────┐                       ┌────────────────┐
│ Prometheus   │                       │     Loki       │
│ (Metrics)    │                       │ (Logs Store)   │
└──────┬───────┘                       └───────┬────────┘
│                                       │
└───────────────┬───────────────────────┘
▼
┌────────────┐
│  Grafana   │
│ Dashboards │
└────────────┘

```

---

## 📂 Project Structure

```

.
├── index.js                # Express app + metrics + logging
├── util.js                 # Simulated heavy task (latency & errors)
├── package.json
├── prometheus-config.yml   # Prometheus scrape config
├── docker-compose.yml      # Prometheus, Grafana, Loki stack
└── README.md

````

---

## 📈 Metrics Implemented (Prometheus)

### Default Metrics
- CPU usage
- Memory usage
- Event loop stats
- Process metrics

### Custom Histogram
```js
http_req_req_time
````

**Labels**

* `method`
* `route`
* `status_code`

**Buckets**

```
[1, 20, 50, 100, 500, 1000, 1500, 2000, 3000] ms
```

This allows:

* Request latency analysis
* P95 / P99 calculations
* Route-level performance monitoring

---

## 🧪 API Endpoints

### `/`

Simple health endpoint
Generates logs + latency metrics.

---

### `/metrics`

Prometheus scrape endpoint.

```
GET /metrics
```

---

### `/slow`

Simulates a real-world backend bottleneck:

* Random latency (100ms – 2500ms)
* Random failures
* Error logging to Loki

Useful for:

* Stress testing dashboards
* Error rate visualization
* Latency distribution analysis

---

## 📝 Logging with Loki

* Logs are structured via **Winston**
* Shipped directly to **Loki**
* Viewable inside **Grafana Explore**
* Includes:

  * Request traces
  * Errors
  * Route-level logs

This mimics **production-grade centralized logging**.

---

## 🐳 Running the Stack

### 1️⃣ Start Observability Stack

```bash
docker-compose up
```

Services:

* Prometheus → `http://localhost:9090`
* Grafana → `http://localhost:3000`
* Loki → `http://localhost:3100`

---

### 2️⃣ Run Backend

```bash
pnpm install
node index.js
```

Backend runs on:

```
http://localhost:8000
```

---

## 📊 Grafana Dashboards

You can build dashboards for:

* Request latency (P50 / P95 / P99)
* Error rates
* Traffic volume
* Logs correlated with metrics

*(Attach screenshots here for maximum recruiter impact)*

---

## 🎯 What This Project Demonstrates

* Real-world observability concepts
* Backend performance monitoring
* Metrics + logs correlation
* Production-style architecture
* Hands-on experience with Prometheus, Grafana & Loki

---

## 📌 Future Improvements

* Alertmanager integration
* Distributed tracing (Tempo / OpenTelemetry)
* Kubernetes deployment
* Log labels optimization
* RED / USE methodology dashboards

---

## 👤 Author

**Nikhil**
Backend | Observability | Systems Thinking

---

## ⭐ Why This Matters

Monitoring is not optional in production systems.
This project shows not just *what tools are used*, but *how they work together*.
