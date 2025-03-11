export async function GET(req) {
  const mockData = [
      // 🟣 PLANNED
      { id: 1, title: "AI-Powered Code Assistant", status: "Planned", lane: "AI Features", upvotes: 42, tags: ["AI", "Productivity"] },
      { id: 2, title: "Dark Mode for Dashboard", status: "Planned", lane: "UI/UX", upvotes: 60, tags: ["UI/UX", "Design"] },
      { id: 3, title: "Customizable Widgets", status: "Planned", lane: "Productivity", upvotes: 35, tags: ["Productivity", "UI/UX"] },
      { id: 4, title: "Voice Command Integration", status: "Planned", lane: "Accessibility", upvotes: 18, tags: ["AI", "Accessibility"] },

      // 🟡 IN PROGRESS
      { id: 5, title: "Real-time Collaboration for Teams", status: "In Progress", lane: "Collaboration", upvotes: 85, tags: ["Collaboration", "Productivity"] },
      { id: 6, title: "Smart Search with Filters", status: "In Progress", lane: "Search", upvotes: 22, tags: ["AI", "Search"] },
      { id: 7, title: "Automated Bug Reporting Tool", status: "In Progress", lane: "QA & Testing", upvotes: 54, tags: ["QA", "Bugs"] },
      { id: 8, title: "Live Game Score Tracking", status: "In Progress", lane: "Sports Features", upvotes: 31, tags: ["AI", "Productivity"] },

      // ✅ COMPLETED
      { id: 9, title: "2-Factor Authentication", status: "Completed", lane: "Security", upvotes: 120, tags: ["Security", "User Management"] },
      { id: 10, title: "Enhanced Notification System", status: "Completed", lane: "User Management", upvotes: 47, tags: ["UI/UX", "User Management"] },
      { id: 11, title: "Multi-Language Support", status: "Completed", lane: "Localization", upvotes: 64, tags: ["UI/UX", "Productivity"] },
      { id: 12, title: "Auto-Save Feature for Drafts", status: "Completed", lane: "Productivity", upvotes: 38, tags: ["Productivity", "Design"] },
  ];

  return Response.json(mockData, { status: 200 }); // ✅ Correct response syntax
}
