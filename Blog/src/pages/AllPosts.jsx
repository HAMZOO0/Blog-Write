// all post selection page where all post shows and when we click on it  it navigate to post/:slug and then you can edit and delete blogs
import React, { useEffect, useState } from "react";
import services from "../service/dbConfig";
import { PostCard, Container } from "../components/index.js";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    services.getPosts([]).then((data) => {
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
