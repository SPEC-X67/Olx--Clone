import "./Banner.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Banner() {
  const categories = [
    "Mobile Phones",
    "Cars",
    "Motorcycles",
    "Houses",
    "TV - Video - Audio",
    "Tablets",
    "Land & Plots",
  ];

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="subNavbar">
          <div className="left-nav">
            <h1>
              ALL CATEGORIES <KeyboardArrowDownIcon />
            </h1>
          </div>
          <div className="right-nav">
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <a href={`search?query=${category.slice(0, -1)}`}>{category}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="Banner" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
