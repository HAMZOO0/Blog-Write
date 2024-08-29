const config = {
  appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appWriteProjectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appWriteDbId: String(import.meta.env.VITE_APPWRITE_DB_ID),
  appWriteColectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_DI),
};

export default config;
import.meta.env;
