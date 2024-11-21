import "./Create.css";
import Header from "../Header/Header";
import axios from "axios";
import { useState } from "react";
import { useFirebase } from "../../store/FirebaseContext";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { db, user} = useFirebase();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to upload a product.");
      return;
    }

    if (!name || !category || !price || !image) {
      alert("All fields are required.");
      return;
    }

    setUploading(true);

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "first_time_upload");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dqtwzcjvp/image/upload",
        formData
      );

      const imageUrl = uploadResponse.data.secure_url;

      // Add product to Firestore
      await addDoc(collection(db, "products"), {
        name,
        category,
        imageUrl,
        price,
        sellerId : user?.uid,
        createdAt: new Date(),
      });

      setName("");
      setCategory("");
      setPrice("");
      setImage(null);
      alert("Product uploaded successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error uploading product: ", error);
      alert("Failed to upload the product. Please try again later.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <img
            width="200px"
            alt="Post"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button className="uploadBtn" onClick={handleSubmit} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload and Submit"}
          </button>
        </div>
      </card>
    </>
  );
};

export default Create;