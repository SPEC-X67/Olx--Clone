import { useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import {useProduct} from '../../store/ProductContext'
import { useNavigate } from "react-router-dom";
function Posts() {

  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setSelectedProduct } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    const fecthProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fecthedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fecthedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fecthProducts();
  }, [db]);

  const handleView = (product) => {
    setSelectedProduct(product); // Save the product in context
    navigate("/view"); // Navigate to the View page
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
          <div className="card" key={product.id} onClick={() => handleView(product)}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <p className="name"> {product.name}</p>
              <span className="category"> {product.category}</span>
            <div className="date">
              <span>{ product.createdAt.toDate().toDateString()}</span>
            </div>
            </div>
          </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards" >
        {products.reverse().map((product) => (
            <div className="card" key={product.id} style={{border: "1px solid"}}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="category">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{ product.createdAt.toDate().toDateString()                          }</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
 