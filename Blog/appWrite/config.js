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
    } catch (error) {}
  }
}

const services = new Services();
export default services();
