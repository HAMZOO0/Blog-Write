import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index.js";
import services from "../../service/dbConfig.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm(post) {
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
        ? await services.uploadFile(data.featuredImg[0])
        : null;

      if (file) {
        await services.deleteFile(post?.featuredImg);
      }

      const update_blog = await services.updatePost(post?.slug, {
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
        file = await services.uploadFile(data.featuredImg[0]);
      }

      if (file) {
        const fileid = file.$id;
        data.featuredImg = fileid;
        let create_blog = await services.createPost({
          ...data,
          userID: userData.$id,
        });
      }
      if (create_blog) {
        navigate(`/post/${create_blog.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    // Step 1: Set up a subscription to watch form field changes
    const subscribe = watch((value, { name }) => {
      // Step 2: Check if the changed field is 'title'
      if (name === "title") {
        // Step 3: Update the 'slug' field based on the 'title'
        setValue("slug", slugTransform(value.title), { shouldValidate: true });

        /*  setValue is a function to programmatically update the form field.
    "slug" is the name of the field you want to update.
    slugTransform(value.title) converts the title value into a slug format (e.g., "My Title" becomes "my-title").
    { shouldValidate: true } tells the form to validate the slug field after updating it.  */
      }
      // Clean up the subscription
      return subscribe.unsubscribe();
    });
  }, [watch, slugTransform, setValue]);

  /*
* watch is a function from react-hook-form that lets you listen for changes in the form fields.

inside watch, you define a function that will run whenever any form field changes.
* value contains the current values of all the form fields.
* { name } extracts the name of the field that changed.

*/
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={services.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
