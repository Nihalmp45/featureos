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
      comments: [
        { id: 1, text: "This would be amazing for debugging!", author: "Alice" },
        { id: 2, text: "Will this support multiple programming languages?", author: "Bob" }
      ]
    },
    { 
      id: 2, 
      title: "Dark Mode for Dashboard", 
      description: "Introducing a sleek and visually appealing dark mode theme...",
      status: "Planned", 
      lane: "UI/UX", 
      upvotes: 60, 
      tags: ["UI/UX"],
      comments: [
        { id: 1, text: "Dark mode is a game-changer! Can't wait for this.", author: "Charlie" },
        { id: 2, text: "Will there be an option to auto-switch based on system settings?", author: "Dave" }
      ]
    },
    {
      id: 3,
      title: "Voice Commands for Navigation",
      description: "A feature that allows users to navigate the app hands-free using voice commands.",
      status: "Planned",
      lane: "Accessibility",
      upvotes: 35,
      tags: ["AI/Tech", "Productivity"],
      comments: [
        { id: 1, text: "This would make things so much easier for visually impaired users.", author: "Eva" },
        { id: 2, text: "Will it support multiple languages?", author: "Frank" }
      ]
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
      comments: [
        { id: 1, text: "Would love to see inline comments for better collaboration.", author: "Grace" },
        { id: 2, text: "Will there be a live cursor tracking feature as well?", author: "Helen" }
      ]
    },
    {
      id: 6,
      title: "Drag-and-Drop Task Management",
      description: "A flexible drag-and-drop feature to easily organize and manage tasks.",
      status: "In Progress",
      lane: "Project Management",
      upvotes: 72,
      tags: ["Productivity"],
      comments: [
        { id: 1, text: "I hope this includes customizable columns!", author: "Ian" },
        { id: 2, text: "Will it allow task dependencies?", author: "Jack" }
      ]
    },
    {
      id: 7,
      title: "Customizable Email Templates",
      description: "Allows users to create and manage customized email templates for marketing campaigns.",
      status: "In Progress",
      lane: "Marketing",
      upvotes: 50,
      tags: ["Productivity"],
      comments: [
        { id: 1, text: "Can we include dynamic fields in the templates?", author: "Kate" },
        { id: 2, text: "Would love to see A/B testing support as well.", author: "Leo" }
      ]
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
      comments: [
        { id: 1, text: "Great feature! Will there be backup codes as well?", author: "Maya" },
        { id: 2, text: "Can I use an authenticator app instead of SMS?", author: "Noah" }
      ]
    },
    {
      id: 10,
      title: "Export Data to CSV",
      description: "A feature allowing users to export their data in CSV format for analysis and backup.",
      status: "Completed",
      lane: "Data Management",
      upvotes: 55,
      tags: ["Productivity"],
      comments: [
        { id: 1, text: "Will this support large data exports efficiently?", author: "Olivia" },
        { id: 2, text: "Can we schedule automated exports?", author: "Peter" }
      ]
    },
    {
      id: 11,
      title: "Customizable User Roles",
      description: "Admins can now assign customized roles and permissions to team members.",
      status: "Completed",
      lane: "Admin Features",
      upvotes: 95,
      tags: ["Security", "Productivity"],
      comments: [
        { id: 1, text: "Can we define role hierarchies?", author: "Quinn" },
        { id: 2, text: "Is there an audit log for permission changes?", author: "Ryan" }
      ]
    }
  ];

  return Response.json(mockData, { status: 200 });
}
