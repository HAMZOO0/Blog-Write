import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index.js";
import appwriteService from "../../service/dbConfig.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function PostForm(post) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    let file = null;
    //* if we want to update blog post
    if (post) {
      file = data?.featuredImg[0]
        ? await appwriteService.uploadFile(data.featuredImg[0])
        : null;

      if (file) {
        await appwriteService.deleteFile(post?.featuredImg);
      }

      const update_blog = await appwriteService.updatePost(post?.slug, {
        ...data,
        featuredImg: file ? file.$id : post.featuredImg, // !!
      });
      if (update_blog) {
        navigate(`/post/${update_blog.$id}`);
      }
    }
    // we if are creating new blog post
    else {
      if (data?.featuredImg && data?.featuredImg?.[0]) {
        const file = await appwriteService.uploadFile(data.featuredImg[0]);
      }

      if (file) {
        const fileid = file.$id;
        data.featuredImg = fileid;
        let create_blog = await appwriteService.createPost({
          ...data,
          userID: userData.$id,
        });
      }
      if (create_blog) {
        navigate(`/post/${create_blog.$id}`);
      }
    }
  };
}
