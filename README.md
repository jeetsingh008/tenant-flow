# API Kiba 🦊

**API Kiba** is a premium, local-first API mocking and simulation tool designed to completely decouple frontend development from backend readiness. By configuring virtual servers and endpoints, frontend developers can simulate complex API behaviors, network latency, and edge-case status codes without writing any backend code.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

- **Virtual Mock Servers**: Organize your mocked endpoints by project or environment (e.g., Staging vs. Production) using independent Mock Servers.
- **Advanced Endpoint Builder**: Create RESTful endpoints with full control over HTTP methods (GET, POST, PUT, DELETE), custom URL paths, status codes, and JSON response bodies.
- **Network Latency Simulation**: Hardcode artificial delays (in milliseconds) into your endpoints to see how your frontend handles loading states and sluggish network conditions.
- **Interactive Simulator Console**: A Master-Detail dashboard that lets you trigger mock requests and visually observe the simulated loading skeleton followed by the final JSON payload.
- **Modern State Management**: Built ground-up using Angular's reactivity model (Signals, `computed`, `effect`) and `@angular/forms/signals` for blazingly fast updates without `zone.js` bottlenecks.
- **Premium UI & Dark Mode**: A sleek, beautifully crafted interface styled with Tailwind CSS, featuring full Dark/Light mode support and localized toast notifications.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and the Angular CLI installed on your machine.

### Installation
1. Clone the repository and navigate into the project directory:
   ```bash
   git clone <repository-url>
   cd tenantflow
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200/`.

## 🛠 Tech Stack

- **Framework**: Angular 17+ (Standalone Components, Signals API)
- **Styling**: Tailwind CSS
- **Reactivity**: Signals, RxJS (for search debouncing)
- **Persistence**: LocalStorage (persists servers and endpoints across sessions)

## 📖 How It Works

1. **Create a Server**: Start by navigating to the **Mock Servers** tab and creating a new virtual server with a base prefix (e.g., `/api/v1`).
2. **Set Active Server**: On the main **Dashboard**, use the dropdown in the sidebar to set your newly created server as the active context.
3. **Add Endpoints**: Click `New Endpoint` to define a route. Set the HTTP method, the desired delay, status code, and the JSON response it should return.
4. **Simulate**: Select the endpoint from the sidebar to open it in the **Test Simulator**. Click *Send Test Request* to watch the artificial delay process before the mock payload resolves!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open-source and available under the MIT License.
