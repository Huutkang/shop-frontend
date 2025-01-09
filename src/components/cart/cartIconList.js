import React from "react";
import CartIconItem from "./cartIconItem"; 
const CartIconList = ({ cartItems }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return <p className="text-center text-gray-600">Giỏ hàng của bạn đang trống.</p>;
  }

  return (
    <div>
      <div
        className="mb-5"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {cartItems.map((item) => (
          <CartIconItem key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-end items-center">
        <h3 className="text-xl font-bold text-gray-800">
          Tổng cộng: {new Intl.NumberFormat("vi-VN").format(calculateTotal())}đ
        </h3>
      </div>
    </div>
  );
};

export default CartIconList;
