import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCteONg6rPJ5ni5ndK5ez4EeGYC4KbQ97E",
  authDomain: "blog-app-image-bucket.firebaseapp.com",
  projectId: "blog-app-image-bucket",
  storageBucket: "blog-app-image-bucket.appspot.com",
  messagingSenderId: "274894851541",
  appId: "1:274894851541:web:dc5161eaf3754356fa415c",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
