import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

interface AdminData {
  totalUsers: number;
  activeUsers: number;
}

export const useAdminData = () => {
  const [adminData, setAdminData] = useState<AdminData>({
    totalUsers: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      setAdminData((prevData) => ({
        ...prevData,
        totalUsers: snapshot.size,
      }));
    });

    const unsubscribeActiveUsers = onSnapshot(
      query(collection(db, "users"), where("isOnline", "==", true)),
      (snapshot) => {
        setAdminData((prevData) => ({
          ...prevData,
          activeUsers: snapshot.size,
        }));
      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribeActiveUsers();
    };
  }, []);

  return adminData;
};
