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
}
