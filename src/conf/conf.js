const conf = {
    authUrl:String(import.meta.env.VITE_FIREBASE_AUTH_URL),
    apiKey:String(import.meta.env.VITE_FIREBASE_API_KEY),
    projectId:String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    bucketId:String(import.meta.env.VITE_FIREBASE_BUCKET_ID),
    appId:String(import.meta.env.VITE_FIREBASE_APP_ID),
    senderId:String(import.meta.env.VITE_FIREBASE_SENDER_ID)
}

export default conf