import {initializeApp} from 'firebase/app';
import firebaseConfig from './firebase.config';

const initializeAuthentications = () => {
    initializeApp(firebaseConfig);
}

export default initializeAuthentications;