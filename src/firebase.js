import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyA-kpaHoCYnE7bNNGuLlNtikTKkwt97Sz4",
    authDomain: "push-notification-sample-cc5b4.firebaseapp.com",
    projectId: "push-notification-sample-cc5b4",
    storageBucket: "push-notification-sample-cc5b4.firebasestorage.app",
    messagingSenderId: "689806237170",
    appId: "1:689806237170:web:c294dbfe6a5d2345989f6b",
    measurementId: "G-604YNM1BW7",
};

// Firebase を初期化
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };