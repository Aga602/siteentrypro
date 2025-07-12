# Site Entry Pro

This is a Next.js application built with Firebase Studio for managing site entry, including inductions, daily logs, and materials registration.

## Tech Stack

- **Next.js:** React framework for production.
- **TypeScript:** For type-safe code.
- **Tailwind CSS:** For styling.
- **ShadCN UI:** For UI components.
- **Genkit:** For AI-powered features.
- **React Hook Form & Zod:** For form handling and validation.

## Local Development

To run this project on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Install Dependencies

First, install the necessary npm packages:

```bash
npm install
```

### 2. Run the Development Servers

This project requires two separate development servers to be running simultaneously in two different terminal windows.

**Terminal 1: Next.js App**

This command starts the main web application.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

**Terminal 2: Genkit AI Flows**

This command starts the Genkit server, which is required for any AI-related functionality.

```bash
npm run genkit:dev
```

This will start the Genkit development UI, typically on port 4000, which you can use to inspect and test your AI flows.

## Running with Docker

You can also run the production version of this application using Docker.

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.

### 1. Build the Docker Image

From the root of the project, run the following command to build the Docker image:

```bash
docker build -t site-entry-pro .
```

### 2. Run the Docker Container

Once the image is built, you can run it as a container:

```bash
docker run -p 9002:3000 site-entry-pro
```

This command starts the container and maps port 9002 on your local machine to port 3000 inside the container. The application will be available at [http://localhost:9002](http://localhost:9002).

**Note:** The Docker container runs the production build of the Next.js app. For AI features to work, you will still need to run the Genkit server locally on your host machine as described in the "Local Development" section.

## Getting Started

- The main entry point for the application is `src/app/page.tsx`.
- The different forms can be found under `src/app/(forms)/`.
- AI-related logic (Genkit flows) will be located in the `src/ai/flows/` directory.
