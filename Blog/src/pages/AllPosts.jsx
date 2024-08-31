import React, { useEffect, useState } from "react";
import services from "../service/dbConfig";
import { PostCard } from "../components/index.js";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    services.getPosts().then((data) => {
      if (data) {
        setPosts(data.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
