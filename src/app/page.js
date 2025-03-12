"use client";
import Roadmap from "./roadmap/page.jsx";
import { useState, useRef } from "react";
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const tags = ["AI/Tech", "Productivity", "UI/UX", "Security"];
  const dropdownRef = useRef(null);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl p-6">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 ml-3">Roadmaps</h1>
            <p className="text-gray-600 mb-6 ml-3">
              Stay connected with our development journey and get a sneak peek
              at upcoming features! 😉
            </p>
          </div>

          {/* Dropdown Filter */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex gap-2 py-1 px-4 border border-gray-300 rounded-2xl cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {selectedTag || "Show all"} <ChevronDown />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-md z-10">
                <ul>
                  <li
                    className={`px-4 py-2 cursor-pointer ${
                      !selectedTag ? "text-blue-600 font-bold bg-blue-100" : ""
                    }`}
                    onClick={() => {
                      setSelectedTag(null);
                      setIsOpen(false);
                    }}
                  >
                    Show all
                  </li>
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className={`px-4 py-2 cursor-pointer ${
                        selectedTag === tag
                          ? "text-blue-600 font-bold bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag);
                        setIsOpen(false);
                      }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Roadmap selectedTag={selectedTag} />
      </div>
    </div>
  );
}
