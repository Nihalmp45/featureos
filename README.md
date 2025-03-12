# FeatureOS - Interactive Roadmap

FeatureOS is a project management tool built using **Next.js** which allows users to create and manage a visual interactive roadmap with drag-and-drop functionality. It provides real-time updates for project status, with a simple and intuitive user interface.

### Features:
- **Interactive Roadmap**: Display project posts organized by their current status (Planned, In Progress, Completed).
- **Drag-and-Drop**: Organize posts between different status categories using drag-and-drop.
- **Upvote System**: Users can upvote posts to show support or popularity.
- **Post Details Modal**: Click on a post to view more details in a modal popup and user can comment about the post.
- **Responsive Design**: Mobile and desktop-friendly UI using **TailwindCSS**.
- **Toast Notifications**: Inform users of actions like upvoting and status updates.

### Technologies:
- **Next.js** - For server-side rendering and static site generation.
- **React** - For building the user interface.
- **Zustand** - For Storing data.
- **React-Query** - For fetching and managing data.
- **Dnd-Kit** - For the drag-and-drop functionality.
- **TailwindCSS** - For styling the components.
- **MongoDB** - Database

## Installation Guide

To get started with FeatureOS, follow the steps below.

### Prerequisites:
Make sure you have **Node.js** (version 14 or higher) and **npm** (or **yarn**) installed on your machine. You can download Node.js from [here](https://nodejs.org/).

### 1. Clone the Repository

## git clone https://github.com/Nihalmp45/featureos.git
## cd featureos


### 2. Install Dependencies

## npm install
Or, if you prefer yarn:
yarn install

### 3. Set up MongoDB
To set up MongoDB locally, follow these steps:

If you don’t already have MongoDB installed, download MongoDB and install it locally. Ensure that your MongoDB service is running by starting it with:
## mongod

Alternatively, you can use MongoDB Atlas, a cloud-based MongoDB service. Create an account on MongoDB Atlas and set up a new cluster.

### 4. Configure Environment Variables
You need to set up your environment variables for the app to connect to MongoDB. Create a .env.local file in the root of your project and add the following environment variables:

For local MongoDB (if running locally):

## MONGODB_URI=mongodb://localhost:27017/featureos

For MongoDB Atlas (if using the cloud service):

Go to your MongoDB Atlas dashboard and create a new project and cluster.
Add a new database user and assign them the required permissions.
Get the connection string from the "Connect" option in MongoDB Atlas, and replace the placeholders with your username, password, and database name.

## MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/featureos?retryWrites=true&w=m

### 4. Additionally, add the following environment variables:

## TOKEN_SECRET=nextjsproject
## DOMAIN=http://localhost:3000

### 5. Run the Development Server
## npm run dev

Or using yarn:
yarn dev
The app will now be running at http://localhost:3000.

### 6. Build for Production
When you are ready to deploy, build the production version of the app:

## npm run build
npm start

Or using yarn:
yarn build
yarn start

