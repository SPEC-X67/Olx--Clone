import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useFirebase } from "../../store/FirebaseContext";
import { useProduct } from "../../store/ProductContext";
import "./Search.css";

function SearchResults() {
  const location = useLocation();
  const { db } = useFirebase();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedProduct } = useProduct()

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery) return;

      setLoading(true);

      try {
        // Firestore query to search for products
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          orderBy("name"),
        );

        const querySnapshot = await getDocs(q);
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredMatches = productsArray.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
  
        setProducts(filteredMatches);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [db, searchQuery]);

  const handleView = (product) => {
    setSelectedProduct(product);
    navigate('/view')
  }

  return (
    <div className="searchResults">
      <div className="mine-div">
      <h1>Results for {searchQuery} </h1>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found for your search.</p>
      ) : (
        <div className="productGrid">
          {products.map((product) => (
            <div key={product.id} className="productCard" onClick={() => handleView(product)}>
              <img src={product.imageUrl} alt={product.name} />
              <div className="productDetails">
                <h2>{product.name}</h2>
                <p className="y">₹{product.price}</p>
                <p className="x">{product.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default SearchResults;
