import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import InstagramIcon from "@mui/icons-material/Instagram";
import images from "../../assets/images.png";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import sorceCode from "../../assets/Footerdata.json";
import "./Footer.css";

function Footer() {
  const footerItem = sorceCode.footerItem;

  return (
    <section className="footer">
      <div className="footer__top">
        <div className="center">
          {footerItem.map((value, index) => {
            const { heading, item1, item2, item3, item4 } = value;
            return (
              <div className="categories" key={index}>
                <h4>{heading}</h4>
                <ul>
                  <li>
                    <a href="#">{item1}</a>
                  </li>
                  <li>
                    <a href="#">{item2}</a>
                  </li>
                  <li>
                    <a href="#">{item3}</a>
                  </li>
                  <li>
                    <a href="#">{item4}</a>
                  </li>
                </ul>
              </div>
            );
          })}

          <div className="foolow__us">
            <h4>FOLLOW US</h4>
            <ul className="social__icon">
              <li>
                <a href="#">
                  <FacebookIcon className="social-icon" style={{width: '14.6px'}} />
                </a>
              </li>
              <li>
                <a href="#">
                  <TwitterIcon className="social-icon" style={{width: '14.6px'}} />
                </a>
              </li>
              <li>
                <a href="#">
                  <PlayCircleOutlineIcon className="social-icon" style={{width: '14.6px'}} />
                </a>
              </li>
              <li>
                <a href="#">
                  <InstagramIcon className="social-icon" style={{width: '14.6px'}} />
                </a>
              </li>
            </ul>
            <div className="download__app__option">
                <img src={images} alt="App Store" width="100px" />
                <img src={image1} alt="Google Play" width="100px" />
                <img src={image2} alt="AppGallery" width="100px" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>Free Classifieds in Pakistan</p>
        <p className="copyright">© 2006-2022 OLX</p>
      </div>
    </section>
  );
}

export default Footer;