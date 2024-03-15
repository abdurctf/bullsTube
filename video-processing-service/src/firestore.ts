import {credential} from "firebase-admin";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";

initializeApp({credential: credential.applicationDefault()});

const firestore = new Firestore();

// Note: This requires setting an env variable in Cloud Run
/** if (process.env.NODE_ENV !== 'production') {
  firestore.settings({
      host: "localhost:8080", // Default port for Firestore emulator
      ssl: false
  });
} */

const videoCollectionId = 'videos';

// export interface Video {
//   id?: string,
//   uid?: string,
//   filename?: string,
//   status?: 'processing' | 'processed',
//   title?: string,
//   description?: string  
// }
//new changes
export interface Video {
  id?: string;
  uid?: string;
  filename?: string;
  status?: 'processing' | 'processed';
  title?: string; // Title of the video
  description?: string; // Description of the video
  uploaderEmail: string; // Email of the uploader
  thumbnailFilename?: string; // The name of the thumbnail file in storage
}

async function getVideo(videoId: string) {
  const snapshot = await firestore.collection(videoCollectionId).doc(videoId).get();
  return (snapshot.data() as Video) ?? {};
}

export function setVideo(videoId: string, video: Video) {
  if (!video.title || !video.description || !video.uploaderEmail) {
    throw new Error('Video metadata must include title, description, and uploaderEmail');
  }
  return firestore
    .collection(videoCollectionId)
    .doc(videoId)
    .set(video, {merge: true});
}

export async function isVideoNew(videoId: string) {
  const video = await getVideo(videoId);
  return video?.status !== undefined;
}
