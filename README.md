# TuneTunnel

This is a full-stack project comprising a React frontend and a Node.js/Express backend. The frontend is created using Vite, and the backend API handles various tasks related to music streaming and downloading.

## Getting Started

Follow these steps to set up and run both the frontend and backend locally.

### Prerequisites

- Node.js (version 14.18.0 or higher recommended)
- npm (comes with Node.js)

### Project Structure

- `frontend/` - Contains the React frontend project.
- `backendv2/` - Contains the Node.js/Express backend API.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/decoded-satapathy/TuneTunnel.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd TuneTunnel
   ```

#### Frontend Setup

3. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

4. **Install the frontend dependencies:**

   ```bash
   npm install
   ```

5. **Start the frontend development server:**

   ```bash
   npm run dev
   ```

   By default, this will run the frontend on `http://localhost:3000`. If port 3000 is busy, Vite will automatically use the next available port.

#### Backend Setup

6. **Navigate to the backend directory:**

   ```bash
   cd ../backendv2
   ```

7. **Install the backend dependencies:**

   ```bash
   npm install
   ```

### Running the Backend Server

To start the backend server, run:

```bash
npm run dev
```

The server will start on port `3001` by default. If port `3001` is busy, the server will throw an error. To resolve this, either change the port number in the `src/index.ts` file or free up port `3001`.

### Changing the Port

If you need to change the port, open the `src/index.ts` file and modify the following line:

```typescript
app.listen(3001); // change 3001 to some unused port like 3002
```

Replace `3001` with your desired port number.

## API Endpoints

Will update soon

## Special thanks 🙏

1. [ts-npm-ytmusic-api](https://github.com/zS1L3NT/ts-npm-ytmusic-api)
2. [ytdl-core](https://github.com/distubejs/ytdl-core)
