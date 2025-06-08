import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCsoICy4ccu-xV0ZQDU7PWiiTxgI0j8oug',
  authDomain: 'codetrek-f4fe6.firebaseapp.com',
  projectId: 'codetrek-f4fe6',
  storageBucket: 'codetrek-f4fe6.firebasestorage.app',
  messagingSenderId: '810373237387',
  appId: '1:810373237387:web:e00266c09cb0b40375e28e',
};

// Inicializa Firebase y la exporta
export const firebaseApp = initializeApp(firebaseConfig);
