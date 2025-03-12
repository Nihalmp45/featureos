export async function GET(req) {
  const mockData = [
    // 🟣 PLANNED
    { 
      id: 1, 
      title: "AI-Powered Code Assistant", 
      description: "An AI-powered coding assistant designed to help developers write efficient and accurate code faster...",
      status: "Planned", 
      lane: "AI Features", 
      upvotes: 42, 
      tags: ["AI/Tech", "Productivity"],
    },
    { 
      id: 2, 
      title: "Dark Mode for Dashboard", 
      description: "Introducing a sleek and visually appealing dark mode theme...",
      status: "Planned", 
      lane: "UI/UX", 
      upvotes: 60, 
      tags: ["UI/UX"],
    },
    {
      id: 3,
      title: "Voice Commands for Navigation",
      description: "A feature that allows users to navigate the app hands-free using voice commands.",
      status: "Planned",
      lane: "Accessibility",
      upvotes: 35,
      tags: ["AI/Tech", "Productivity"],
    },

    // 🟡 IN PROGRESS
    { 
      id: 5, 
      title: "Real-time Collaboration for Teams", 
      description: "A robust collaboration feature that enables team members to work together in real-time...",
      status: "In Progress", 
      lane: "Collaboration", 
      upvotes: 85, 
      tags: ["Productivity"],
    },
    {
      id: 6,
      title: "Drag-and-Drop Task Management",
      description: "A flexible drag-and-drop feature to easily organize and manage tasks.",
      status: "In Progress",
      lane: "Project Management",
      upvotes: 72,
      tags: ["Productivity"],
    },
    {
      id: 7,
      title: "Customizable Email Templates",
      description: "Allows users to create and manage customized email templates for marketing campaigns.",
      status: "In Progress",
      lane: "Marketing",
      upvotes: 50,
      tags: ["Productivity"],
    },

    // ✅ COMPLETED
    { 
      id: 9, 
      title: "2-Factor Authentication", 
      description: "An essential security upgrade that adds a second layer of protection to user accounts...",
      status: "Completed", 
      lane: "Security", 
      upvotes: 120, 
      tags: ["Security"],
    },
    {
      id: 10,
      title: "Export Data to CSV",
      description: "A feature allowing users to export their data in CSV format for analysis and backup.",
      status: "Completed",
      lane: "Data Management",
      upvotes: 55,
      tags: ["Productivity"],
    },
    {
      id: 11,
      title: "Customizable User Roles",
      description: "Admins can now assign customized roles and permissions to team members.",
      status: "Completed",
      lane: "Admin Features",
      upvotes: 95,
      tags: ["Security", "Productivity"],
    }
  ];

  return Response.json(mockData, { status: 200 });
}
