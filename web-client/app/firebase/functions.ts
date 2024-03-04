import { getFunctions, httpsCallable } from 'firebase/functions';
import {app} from './firebase';
// import auth from './firebase';
//initialize firebase app

const functions = getFunctions(app);

const generateUploadUrlFunction = httpsCallable(functions, 'generateUploadUrl');

export async function uploadVideo(file: File) {
  const response: any = await generateUploadUrlFunction({
    fileExtension: file.name.split('.').pop()
  });

  // Upload the file to the signed URL
  const uploadResult = await fetch(response?.data?.url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  return uploadResult;
}
