import config from "../cofig variables/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  Client = new Client();
  databases;
  storage;

  constructor() {
    this.Client.setEndpoint(config.appWriteUrl).setProject(
      config.appWriteProjectid
    );
    this.databases = new Databases(this.Client);
    this.storage = new Storage(this.Client);
  }

  async createPost({ title, slug, content, featuredImg, status, userID }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDbId,
        config.appWriteColectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          content,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      return await this.databases.updateDocument(
        config.appWriteDbId,
        config.appWriteColectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          content,
          status,
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDbId,
        config.appWriteColectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error", error);
    }
  }

  async getPost(slug) {
    try {
      await this.databases.getDocument(
        config.appWriteDbId,
        config.appWriteColectionId,
        slug
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const services = new Services();
export default services;
