import React, { useState, useEffect, useRef } from "react";
import Logo from '../assets/logo1.png';
import { MdSearch } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCart from "./shoppingcart";
import { CiMenuBurger } from "react-icons/ci";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { logout, fetchCurrentUser } from '../redux/userSlice';

function Testpage() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const carts = useSelector(store => store.cart.items);
    const [searchSidebarOpen, setSearchSidebarOpen] = useState(false);
    useEffect(() => {
        setTotalQuantity(carts.reduce((total, item) => total + item.quantity, 0));
    }, [carts]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleCategory = () => {
        setIsCategoryOpen(!isCategoryOpen);
    };

    const categories = [
        { name: "Thời trang", path: "fashion" },
        { name: "Giày dép - Túi sách", path: "shoes" },
        { name: "Điện tử", path: "electronics" }, 
        { name: "Sức khỏe - Làm đẹp", path: "health-and-beauty" }, 
        { name: "Đồ gia dụng", path: "housewares" },
        { name: "Đồ trang trí", path: "decoration" },
        { name: "Mẹ và bé", path: "mother-and-baby" },
        { name: "Sách", path: "book" },
        { name: "Văn phòng phẩm", path: "stationery" }
      ];

    const toggleSearchSidebar = () => setSearchSidebarOpen(!searchSidebarOpen);
    const { isLoggedIn, user } = useSelector((state) => state.user);
    console.log(user, isLoggedIn)
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái dropdown

    const dropdownRef = useRef(null); // Tham chiếu đến phần tử dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev); // Bật/Tắt dropdown
    };
    // Đóng dropdown khi nhấn bên ngoài
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false); // Đóng dropdown
            }
        };

        // Lắng nghe sự kiện click toàn cục
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    useEffect(() => {
        if (isLoggedIn && !user) {
            // Lấy thông tin người dùng nếu đã đăng nhập
            dispatch(fetchCurrentUser());
        }
    }, [isLoggedIn, user, dispatch]);
    const handleLogout = () => {
        dispatch(logout()); // Cập nhật trạng thái đăng xuất  
    };


    
    return (
        <div className="w-full h-24 sticky top-0 bg-white text-black z-50 shadow-lg">
            <div className="flex justify-between items-center px-12 h-full">
                {/* Menu icon for small screens */}
                <button
                    className="lg:hidden text-black"
                    onClick={toggleMenu}
                >
                    <CiMenuBurger size={30} />
                </button>

                {/* Logo - Centered on small screens */}
                <div className="flex justify-center lg:justify-start">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="w-24 h-auto max-w-full" />
                    </Link>
                </div>

                {/* Left side menu (Home, Danh mục, etc.) */}
                <div className="flex items-center space-x-10 lg:flex hidden">
                    <a href="/" className="text-lg hover:text-gray-300">Trang Chủ</a>
                    <div className="relative group">
                        <a href="/" className="text-lg hover:text-gray-300">Danh Mục</a>
                        {/* Dropdown */}
                        <div className="hidden group-hover:block absolute top-[60%] left-0 w-80 bg-white border border-gray-300 mt-2 shadow-lg">
                            {categories.map((item, idx) => (
                                <Link key={idx} to={`/category/${item.path}`} className="block px-4 py-2 hover:bg-gray-600 hover:text-gray-100">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <a href="/" className="text-lg hover:text-gray-300">Giá Ưu Đãi</a>
                    <a href="/" className="text-lg hover:text-gray-300">Sản Phẩm Bán Chạy</a>
                </div>

                {/* Right side icons (Search, Heart, Cart, User) */}
                <div className="flex items-center space-x-6">
                    {/* Search */}
                    <button className="lg:hidden text-xl cursor-pointer" onClick={toggleSearchSidebar}>
                        <MdSearch />
                    </button>
                    <div className="relative hidden lg:block">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-80 h-10 px-4 pr-10 rounded-full border border-gray-400 focus:border-gray-300 focus:outline-none"
                        />
                        <MdSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    </div>

                    {/* Heart (Favorites) */}
                    <Link to="/love">
                        <div className="text-xl cursor-pointer">
                            <CiHeart />
                        </div>
                    </Link>

                    {/* Cart */}
                    <div className="relative">
                        <div className="flex text-xl cursor-pointer" onClick={() => setSidebarVisible(true)}>
                            <CiShoppingCart size={25} color="black" />
                            <span className="absolute h-4 w-4 left-4 top-[-20%] bg-gray-600 text-white text-sm rounded-full flex justify-center items-center ">{totalQuantity}</span>
                        </div>
                        {sidebarVisible && (
                            <>
                                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-full" onClick={() => setSidebarVisible(false)}></div>
                                <div className="fixed top-0 right-0 h-full w-[300px] lg:w-[350px] bg-gray-900 text-white z-50 shadow-lg p-4">
                                    <button className="absolute top-4 right-4 text-white text-xl" onClick={() => setSidebarVisible(false)}>X</button>
                                    <h3 className="text-xl border-b border-gray-700 pb-2">Giỏ hàng của bạn</h3>
                                    <p className="mt-4 text-gray-400">Danh sách sản phẩm</p>
                                    <div className="grid grid-rows p-1 gap-1">
                                        {carts.map((item, key) => <ShoppingCart key={key} data={item} />)}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 absolute bottom-10 left-0 w-full p-4">
                                        <Link to="/cart">
                                            <button className="bg-red-500 text-white py-2 px-2 rounded-md w-full">Xem giỏ hàng</button>
                                        </Link>
                                        <Link to="/payments">
                                            <button className="bg-red-500 text-white py-2 px-2 rounded-md w-full">Thanh toán</button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        {/* Biểu tượng tài khoản */}
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={toggleDropdown} // Nhấn để bật/tắt dropdown
                        >
                            <AiOutlineUser className="text-xl" />
                            {isLoggedIn && user?.username && (
                                <span className="ml-2">{user.username}</span>
                            )}
                        </div>
                        {/* Dropdown */}
                        {isDropdownOpen && (
                            <div
                                className="absolute top-[120%] -left-3 transform -translate-x-1/2 w-40 bg-white border border-gray-300 mt-2 shadow-lg z-10"
                                onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click thoát dropdown
                            >
                                {!isLoggedIn ? (
                                    <>
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                                            onClick={() => setIsDropdownOpen(false)} // Đóng dropdown khi chuyển trang
                                        >
                                            Đăng nhập
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                                            onClick={() => setIsDropdownOpen(false)} // Đóng dropdown khi chuyển trang
                                        >
                                            Đăng ký
                                        </Link>
                                    </>
                                ) : (
                                    <div>
                                        <Link
                                            to="/account"
                                            onClick={() => {
                                                setIsDropdownOpen(false); // Đóng dropdown khi chuyển trang
                                            }}
                                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                                        >
                                            Thông tin tài khoản
                                        </Link>
                                        <span
                                            onClick={handleLogout}
                                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                                        >
                                            Đăng xuất
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Sidebar menu (menu that slides in from the right) */}
            {isMenuOpen && (
                <div>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-full" onClick={closeMenu}></div>
                    <div className="fixed top-0 left-0 w-2/5 h-full bg-white text-black z-50 shadow-lg p-4 transform transition-transform duration-300 ease-in-out" style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                        <button className="absolute top-4 right-4 text-black text-xl" onClick={closeMenu}>X</button>
                        {/* Menu Header */}
                        <div className="text-xl font-semibold mb-2">Menu</div>
                        <hr className="border-gray-400 mb-4" />

                        {/* Menu Items */}
                        <div className="space-y-6">
                            <div>
                                <a href="/" className="text-lg hover:text-gray-300">Home</a>
                            </div>
                            {/* Category with dropdown */}
                            <div>
                                <div
                                    className="flex items-center justify-between text-lg cursor-pointer hover:text-gray-300"
                                    onClick={toggleCategory}
                                >
                                    <span>Danh mục</span>
                                    {isCategoryOpen ? (
                                        <BsChevronDown size={20} />
                                    ) : (
                                        <BsChevronRight size={20} />
                                    )}
                                </div>
                                {isCategoryOpen && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        {categories.map((item, idx) => (
                                            <Link key={idx} to={`/category/${item.path}`} className="block px-4 py-2 hover:bg-gray-600 hover:text-gray-100">
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <a href="/" className="text-lg hover:text-gray-300">Giá ưu đãi</a>
                            </div>
                            <div>
                                <a href="/" className="text-lg hover:text-gray-300">Sản phẩm bán chạy</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {searchSidebarOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-full" onClick={toggleSearchSidebar}></div>
                    <div className="fixed top-0 right-0 w-2/5 h-full bg-white text-black z-50 shadow-lg p-4 transform transition-transform duration-300 ease-in-out" style={{ transform: searchSidebarOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full h-10 px-4 rounded-full border border-gray-400 focus:border-gray-300 focus:outline-none"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Testpage;
