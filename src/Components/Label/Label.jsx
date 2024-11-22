import label1 from '../../assets/label1.webp';
import images from '../../assets/images.png';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';

import './Label.css';

function Label() {
  return (
    <section className="label-container">
      <div className="label-left">
        <img src={label1} alt="Label" />
      </div>
      <div className="label-right">
        <div className="label-heading">
          <h1>GET YOUR APP TODAY</h1>
        </div>
        <div className="label-social-icons">
          <a href="#">
            <img src={images} alt="Social Icon 1" className="social-icon" />
          </a>
          <a href="#">
            <img src={image1} alt="Social Icon 2" className="social-icon center-icon" />
          </a>
          <a href="#">
            <img src={image2} alt="Social Icon 3" className="social-icon" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Label;
