import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../redux/slices/wishlistSlice";
import { addTocart } from "../redux/slices/cartSlice";


const Wishlist = () => {
      const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const userWishlist = useSelector((state) => state.wishlistReducer);

   const handleCart=(product)=>{
    dispatch(removeItem(product.id))
      dispatch(addTocart(product))
      const existingProduct = userCart?.find(item=>item?.id==product.id)
      if(existingProduct){
        alert("Product Quantity Incremented!!!")
      }else{ 
        alert("Product Added to Cart")
      }
    }
    

  return (
    <>
      <Header />
      <div style={{ paddingTop: "100px" }} className="px-5">
        {userWishlist?.length > 0 ? (
          <>
            <h1 className="text-4xl font-bold text-red-600 mb-5">
              My Wishlist
            </h1>
            <div className="grid grid-cols-4 gap-4">
              {userWishlist?.map((product) => (
                <div key={product?.id} className="rounded border p-2 shadow border-blue-500 shadow-blue-800">
                  <img
                    width={"100%"}
                    height={"200px"}
                    src={product?.thumbnail}
                    alt=""
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{product?.title}</h3>
                    <div className="flex justify-evenly mt-3">
                      <button onClick={()=>dispatch(removeItem(product?.id))} className="text-xl">
                        {" "}
                        <i className="fa-solid fa-heart-circle-xmark text-red-600"></i>
                      </button>
                      <button onClick={()=>handleCart(product)} className="text-xl">
                        {" "}
                        <i className="fa-solid fa-cart-plus text-green-600"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <img
              src="https://grocarto.com/assets/images/User/gif/cartGif.gif"
              alt=""
            />
            <h1 className="text-3xl text-red-600">Your wishlist is empty!!!</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
