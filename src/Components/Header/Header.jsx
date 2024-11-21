import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
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
        <div className="brandName" onClick={() => navigate("/")}>
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
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
            {suggestions.length > 0 && (
              <ul className="suggestionDropdown">
                {suggestions.map((item) => (
                  <li key={item.id} onClick={() => handleSuggestionClick(item)}>
                    {item.name} -{" "}
                    <span style={{ fontStyle: "italic" }}>{item.category}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="searchAction" onClick={handleSearch}>
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span
            onClick={() => {
              if (!user) navigate("/login");
            }}
          >
            {user ? user.displayName : "Login"}
          </span>
        </div>
        {user && (
          <span
            onClick={() => {
              auth.signOut();
              navigate("/login");
            }}
          >
            Logout
          </span>
        )}
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span onClick={() => navigate("/create")}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
