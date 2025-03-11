"use client"
import Roadmap from './roadmap/page.jsx';

export default function Home() {
  return (
    <div>
     <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">FeatureOS Roadmap</h1>
      <Roadmap />
    </div>
    </div>
  );
}
