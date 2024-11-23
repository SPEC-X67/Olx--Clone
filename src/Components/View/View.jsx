// import './View.css';
// import { useProduct } from '../../store/ProductContext';
// import { useFirebase } from '../../store/FirebaseContext';
// import { useEffect, useState } from 'react';
// import { doc, getDoc} from 'firebase/firestore';
// function View() {

//   const {selectedProduct} = useProduct();
//   const { db } = useFirebase();

//   const [seller, setSeller] = useState({
//     name: '',
//     phone: '',
//   })

//   const { 
//     name,
//     price, 
//     category, 
//     imageUrl, 
//     createdAt,
//     sellerId,
//   } = selectedProduct;

//   useEffect(() => {
//     const fetchSeller = async () => {
//       if(!sellerId) return;

//       try {
//         const sellerDoc = await getDoc(doc(db, 'users', sellerId));
//         if(sellerDoc.exists()) {
//           const {username, phone} = sellerDoc.data();
//           setSeller({name: username, phone: phone});
//         } else{
//           setSeller({name: "No name available", phone: "No contact available"});
//         }

//       } catch (error) {
//         console.error('Error fetching seller details:', error);
//         setSeller({ name: 'No name available', phone: 'No contact available' });
//       }
//     }
//     fetchSeller();
//   }, [db, sellerId])

//   return (
//     <div className="viewParentDiv">
//       <div className="imageShowDiv">
//           <img src={imageUrl} alt={name} />
//       </div>
//       <div className="rightSection">
//         <div className="productDetails">
//         <p>&#8377; {price}</p>
//           <span>{name}</span>
//           <p>{category}</p>
//           <span>{new Date(createdAt.seconds * 1000).toDateString()}</span>
//         </div>
//         <div className="contactDetails">
//         <p>Seller Details</p>
//           <p>{seller.name}</p>
//           <p>{seller.phone}</p>
//         </div>
//       <button className="chatButton">
//             Chat with Seller
//           </button>
//       </div>
//     </div>
//   );
// }
// export default View;

import './View.css';
import { useProduct } from '../../store/ProductContext';
import { useFirebase } from '../../store/FirebaseContext';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { FaHeart, FaShareAlt } from 'react-icons/fa'; // Importing icons

function View() {
  const { selectedProduct } = useProduct();
  const { db } = useFirebase();

  const [seller, setSeller] = useState({
    name: '',
    phone: '',
  });

  const {
    name,
    price,
    category,
    imageUrl,
    createdAt,
    sellerId,
  } = selectedProduct;

  useEffect(() => {
    const fetchSeller = async () => {
      if (!sellerId) return;

      try {
        const sellerDoc = await getDoc(doc(db, 'users', sellerId));
        if (sellerDoc.exists()) {
          const { username, phone } = sellerDoc.data();
          setSeller({ name: username, phone: phone });
        } else {
          setSeller({ name: 'No name available', phone: 'No contact available' });
        }
      } catch (error) {
        console.error('Error fetching seller details:', error);
        setSeller({ name: 'No name available', phone: 'No contact available' });
      }
    };
    fetchSeller();
  }, [db, sellerId]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={imageUrl} alt={name} />
        <div className="imageIcons">
          <FaHeart className="icon likeIcon" title="Like" />
          <FaShareAlt className="icon shareIcon" title="Share" />
        </div>
      </div>
      <div className="rightSection">
        <h2 style={{marginBottom: "10px"}}>Details</h2>
        <div className="productDetails">
        Price
          <p>&#8377; {price}</p>
          <span>{name}</span>
          <p>{category}</p>
          <span>{new Date(createdAt.seconds * 1000).toDateString()}</span>
        </div>
          <h4>Seller Details</h4>
        <div className="contactDetails">
          Name : <p style={{fontWeight: "bold"}}>{seller.name}</p>
          <p>{seller.phone}</p>

          
        </div>
        <button className="chatButton">Chat with Seller</button>
      </div>
    </div>
  );
}

export default View;
