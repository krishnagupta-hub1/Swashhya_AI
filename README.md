# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running Locally

To set up this project on your local machine using an editor like VS Code, follow these steps:

### 1. Prerequisites

*   **Node.js**: Make sure you have Node.js (version 18 or later) installed. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm**: Node.js comes with npm (Node Package Manager), which you'll use to install dependencies.

### 2. Copy Project Files

Create a new folder on your computer for this project. Then, copy all the files and folders from your Firebase Studio project into this new local folder, maintaining the same directory structure.

### 3. Install Dependencies

Open a terminal or command prompt inside your new project folder and run the following command to install all the necessary packages listed in `package.json`:

```bash
npm install
```

### 4. Set Up Environment Variables

The generative AI features in this app use the Gemini API. To use them locally, you'll need an API key.

1.  Create a new file named `.env.local` in the root of your project folder.
2.  Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add the following line to your `.env.local` file, replacing `YOUR_API_KEY_HERE` with the key you just obtained:

```
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

### 5. Run the Development Server

Once the installation and setup are complete, you can start the Next.js development server by running:

```bash
npm run dev
```

This will start the application, and you can view it by opening [http://localhost:9002](http://localhost:9002) in your web browser. The AI features will now work using your local API key.
