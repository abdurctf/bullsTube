import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";

initializeApp();

const firestore = new Firestore();
const storage = new Storage();
const rawVideoBucketName = "bullstube-raw-videos";
const videoCollectionId = "videos";

// export interface Video {
//   id?: string,
//   uid?: string,
//   filename?: string,
//   status?: "processing" | "processed",
//   title?: string,
//   description?: string
// }
//new changes
export interface Video {
  id?: string;
  uid?: string;
  filename?: string;
  status?: 'processing' | 'processed';
  title: string; // Title of the video
  description: string; // Description of the video
  uploaderEmail: string; // Email of the uploader
  thumbnailFilename?: string; // The name of the thumbnail file in storage
}


export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
  };

  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User Created: ${JSON.stringify(userInfo)}`);
  return;
});


export const generateUploadUrl = onCall({maxInstances: 1}, async (request) => {
  // Check if the user is authentication
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
    
  }

  
  const { title, description, uploaderEmail, fileExtension } = request.data;
  const auth = request.auth;
  const data = request.data;
  const bucket = storage.bucket(rawVideoBucketName);
  const uid = request.auth.uid;
  const timestamp = Date.now();
  const videoFileName = `${uid}-${timestamp}.${fileExtension}`;
  const thumbnailFileName = `${uid}-thumbnail-${timestamp}.png`;

  const videoDocRef = firestore.collection(videoCollectionId).doc();
  await videoDocRef.set({
    uid: uid,
    status: 'pending',
    filename: videoFileName,
    title: title,
    description: description,
    uploaderEmail: uploaderEmail,
    thumbnailFilename: thumbnailFileName
  });

  // Generate signed URL for video upload
  const [videoUploadUrl] = await bucket.file(videoFileName).getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  // Generate signed URL for thumbnail upload
  const [thumbnailUploadUrl] = await bucket.file(thumbnailFileName).getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

 

  // // Generate a unique filename for upload
  // const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

  // // Get a v4 signed URL for uploading file
  // const [url] = await bucket.file(fileName).getSignedUrl({
  //   version: "v4",
  //   action: "write",
  //   expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  // });

  return {
    videoUploadUrl,
    thumbnailUploadUrl,
    videoId: videoDocRef.id,};
});

export const getVideos = onCall({maxInstances: 1}, async () => {
  const snapshot =
    await firestore.collection(videoCollectionId).limit(10).get();
  return snapshot.docs.map((doc) => doc.data());
});
