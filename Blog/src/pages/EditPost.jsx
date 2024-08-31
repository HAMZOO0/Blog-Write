import React, { useEffect, useState } from "react";
import services from "../service/dbConfig";
import { PostCard, LoadingSpinner } from "../components/index";
import { useNavigate } from "react-router-dom";

export default function EditPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const { slug } = useParams(); // we get slug from url
  useEffect(() => {
    if (slug) {
      services.getPosts(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? <PostCard post={post} /> : <LoadingSpinner />;
}
