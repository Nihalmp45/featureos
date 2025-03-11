"use client";
import Roadmap from './roadmap/page.jsx';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl p-6">
        <h1 className="text-3xl font-bold mb-2 ml-3">Roadmaps</h1>
        <p className="text-gray-600 mb-6 ml-3">
          Stay connected with our development journey and get a sneak peek at upcoming features! 😉
        </p>
        <Roadmap />
      </div>
    </div>
  );
}
