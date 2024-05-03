import React, { useState } from "react";
import "../assets/css/main.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import avatar from "../img/img1.jpg";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            setLoading(false);
            navigate("/login");
            setTimeout(() => {    
              alert('User registered successfully !!');
            }, 500);
            
            
          
          } catch (error) {
            console.log("download URL Error:", error);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.error("Registration Error:", err.message);
      setErr(true);
      setLoading(false);
      
    }
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat App</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input
              required
              type="text"
              placeholder="Fullname"
              name="displayName"
            />
            <input required type="email" placeholder="Email" name="email" />
            <input required type="password" placeholder="Password" />
            <input required style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <img src={avatar} alt="pic" height={30} />
              <span>Add an avatar</span>
            </label>
            <button>Sign up</button>
            {loading && "Uploading Image ...."}
            {err && <span>something wrong</span>}
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </div>
      </div>

    </>
  );
};

export default Register;
