import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("/api/data");
  const data = await response.json();

  console.log("API Data:", data); // ✅ Confirm fetched data structure
  if (!response.ok) throw new Error("Failed to fetch posts");
  return data;
};

export default function Roadmap() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  const renderLane = (laneName, status) => (
    <div key={laneName} className="border rounded-lg p-4">
      <h2 className="font-bold text-lg mb-2">{laneName}</h2>
      {data?.filter((item) => item.status === status).length > 0 ? (
        data
          .filter((item) => item.status === status)
          .map((post) => (
            <div key={post.id} className="bg-gray-100 p-3 rounded-md mb-2">
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.lane}</p>
              <p className="text-xs">👍 {post.upvotes}</p>
            </div>
          ))
      ) : (
        <p className="text-gray-400">No items available</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {renderLane("Planned", "Planned")}
      {renderLane("In Progress", "In Progress")}
      {renderLane("Completed", "Completed")}
    </div>
  );
}
