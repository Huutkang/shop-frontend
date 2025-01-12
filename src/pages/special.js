import React from 'react'
import Navbar from '../components/navbar'
import SpecialProducts from '../components/home/special'
import Banner from '../components/banner'
import { Link } from 'react-router-dom'
const Special = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <div className="mx-auto w-full">
        {/* Thanh điều hướng */}
        <nav className="text-gray-700 mb-3 border-t border-b py-3 bg-gray-200 w-full">
          <div className="mx-auto px-5">
            <Link to="/" className="hover:underline">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span>Giá ưu đãi</span>
          </div>
        </nav>

        {/* Tiêu đề và sản phẩm nổi bật */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-3 py-3 px-5">Giá ưu đãi</h1>
          <div className="flex justify-center items-center space-x-2 mb-3 py-3 px-5">
            <span className="text-lg font-semibold underline">Sản phẩm nổi bật</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <SpecialProducts />
    </div>
  )
}

export default Special