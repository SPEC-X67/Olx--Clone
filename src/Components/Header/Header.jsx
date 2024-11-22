import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";
import { collection, orderBy, query, getDocs } from "firebase/firestore";

function Header() {
  const { auth, user, db } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const productRef = collection(db, "products");
        const q = query(productRef, orderBy("name"));

        const querySnapshot = await getDocs(q);

        const matches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          category: doc.data().category,
        }));

        // Filter matches for partial substrings
        const filteredMatches = matches.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSuggestions(filteredMatches);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [searchQuery, db]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    navigate(`/search?query=${encodeURIComponent(suggestion.name)}`);
    setSuggestions([]);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="left-head">
          <div className="brandName" onClick={() => navigate("/")}>
            <OlxLogo />
          </div>
          <div className="productSearch">
            <div className="input">
              <input
                type="text"
                placeholder="Find car, mobile phone, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="searchAction" onClick={handleSearch}>
              <Search color="#ffffff" />
            </div>
            
                
              {suggestions.length > 0 && (
                <ul className="suggestionDropdown">
                  {suggestions.map((item) => (
                    <li
                    key={item.id}
                    onClick={() => handleSuggestionClick(item)}
                    >
                      {item.name} - {"      "}
                      <span style={{ fontStyle: "italic", textAlign: "end" }}>
                        {item.category}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
        </div>
        <div className="right-head">
        <div className="dropdown">
          <span
            className="drop-user"
            onClick={() => {
              if (!user) navigate("/login");
            }}> {user ? user.displayName : "Login"} </span>

          {user && (
            <span
              className="drop-logout"
              onClick={() => {
                auth.signOut();
                navigate("/login");
              }}> Logout </span>
          )}
         </div>
          <div className="sellMenu" onClick={() => navigate("/create")}>
            <SellButton />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
