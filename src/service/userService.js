import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './configFirebase';


export const createUserProfile = async (uid, data) => {
	await setDoc(doc(db, 'users', uid), data);
};


export const getUserProfile = async (uid) => {
	const userDoc = await getDoc(doc(db, 'users', uid));
	return userDoc.exists() ? userDoc.data() : null;
};


export const updateUserProfile = async (uid, data) => {
	await updateDoc(doc(db, 'users', uid), data);
};