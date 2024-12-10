import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Map from "./Map";

const Home = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const slides = [
        {
            id: 1,
            image: "./assets/images/slide1.jpg"
        },
        {
            id: 2,
            image: "./assets/images/slide2.jpg"
        },
        {
            id: 3,
            image: "./assets/images/slide3.jpg"
        },
        {
            id: 4,
            image: "./assets/images/slide4.jpg"
        }
    ];
    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <>
            <div className="container mx-auto">
                {/* Slideshow */}
                <div className="relative w-full h-64 bg-gray-100 shadow-md mb-8 flex items-center justify-center">
                    {/* Fixed Title */}
                    <h2 className="absolute top-1/2 transform -translate-y-1/2 text-3xl font-bold text-center z-10 text-white">
                        Cơ sở dữ liệu đa dạng sinh học
                        <br />
                        Vườn Quốc gia U Minh Thượng
                    </h2>
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        />
                    ))}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Previous slide"
                    >
                        <FaChevronLeft className="text-gray-800 text-2xl" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Next slide"
                    >
                        <FaChevronRight className="text-gray-800 text-2xl" />
                    </button>
                </div>

                {/* Container */}
                <div className="content bg-white shadow-lg p-6 mb-8 mx-7">
                    <h3 className="text-2xl font-semibold mb-4 text-center">Giới thiệu nền tảng Web-GIS về đa dạng sinh học Vườn Quốc gia U Minh Thượng</h3>
                    <p className="mb-4 text-gray-600 text-lg leading-[30px]">
                        Vườn Quốc gia U Minh Thượng (VQG) được thành lập năm 2002,
                        trên cơ sở nâng cấp Khu bảo tồn thiên nhiên U Minh Thượng, có tổng diện tích 21.107 ha, bao gồm vùng lõi 8.038 ha và vùng đệm 13.069 ha.
                        Vùng đệm do Ủy ban nhân dân huyện U Minh Thượng trực tiếp quản lý.
                        VQG có 02 kiểu thảm thực vật chính: Rừng Tràm (chia thành rừng tràm trên đất than bùn, rừng tràm trên đất sét, rừng hỗn giao và rừng trồng)
                        và trảng cỏ ngập nước theo mùa. Đầm lầy và kênh rạch (bao gồm cả kênh rạch tự nhiên) là các hệ sinh thái thủy sinh khác của VQG.
                    </p>
                    <p className="mb-4 text-gray-600 text-lg leading-[30px]">
                        Theo thống kê, khu hệ thực vật VQG U Minh Thượng có 258 loài thuộc 87 họ của 2 bộ.
                        Hệ động vật có có xương sống của VQG với 32 loài thú, 184 loài chim, 56 loài bò sát và lưỡng cư,
                        64 loài cá, 209 loài côn trùng, trong đó có nhiều loài có giá trị bảo tồn, kinh tế cao. Tuy nhiên, nguồn tài nguyên đa dạng sinh học này vẫn chưa được nghiên cứu,
                        điều tra và đánh giá đầy đủ.
                    </p>
                    <p className="mb-4 text-gray-600 text-lg leading-[30px]">
                        Với mục đích hệ thống lại giá trị đa dạng sinh học về loài,
                        Viện Sinh thái học Miền Nam phối hợp với VQG U Minh Thượng xây dựng nền tảng WebGIS về đa dạng sinh học,
                        đây là một sản phẩm trong khuôn khổ Dự án
                    </p>
                    <p className="mb-4 text-gray-600 text-lg leading-[30px]">
                        Thông qua việc kế thừa có chọn lọc các số liệu nghiên cứu trước đây và một số đợt điều tra thực địa bổ sung, chúng tôi đã tổng hợp được danh sách
                        của các nhóm sinh vật chính được ghi nhận tại VQG U Minh Thượng như sau:
                    </p>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Nhóm</th>
                                <th className="border border-gray-300 px-4 py-2">Thực vật hạt kín</th>
                                <th className="border border-gray-300 px-4 py-2">Khuyết thực vật</th>
                                <th className="border border-gray-300 px-4 py-2">Thực vật hạt trần</th>
                                <th className="border border-gray-300 px-4 py-2">Chim</th>
                                <th className="border border-gray-300 px-4 py-2">Thú</th>
                                <th className="border border-gray-300 px-4 py-2">Bò sát</th>
                                <th className="border border-gray-300 px-4 py-2">Động vật không xương sống</th>
                                <th className="border border-gray-300 px-4 py-2">Lưỡng cư</th>
                                <th className="border border-gray-300 px-4 py-2">Cá</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-semibold">Loài</td>
                                <td className="border border-gray-300 px-4 py-2">339</td>
                                <td className="border border-gray-300 px-4 py-2">20</td>
                                <td className="border border-gray-300 px-4 py-2">0</td>
                                <td className="border border-gray-300 px-4 py-2">191</td>
                                <td className="border border-gray-300 px-4 py-2">32</td>
                                <td className="border border-gray-300 px-4 py-2">46</td>
                                <td className="border border-gray-300 px-4 py-2">15</td>
                                <td className="border border-gray-300 px-4 py-2">11</td>
                                <td className="border border-gray-300 px-4 py-2">110</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-semibold">Ghi nhận</td>
                                <td className="border border-gray-300 px-4 py-2">753</td>
                                <td className="border border-gray-300 px-4 py-2">50</td>
                                <td className="border border-gray-300 px-4 py-2">0</td>
                                <td className="border border-gray-300 px-4 py-2">502</td>
                                <td className="border border-gray-300 px-4 py-2">32</td>
                                <td className="border border-gray-300 px-4 py-2">46</td>
                                <td className="border border-gray-300 px-4 py-2">136</td>
                                <td className="border border-gray-300 px-4 py-2">12</td>
                                <td className="border border-gray-300 px-4 py-2">129</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mb-4 text-gray-600 text-lg leading-[30px]">
                        Dự án này đã đặt một trong những "viên gạch đầu tiên",
                        xây dựng "nền móng" cho việc tích hợp dữ liệu đa dạng sinh học tại VQG U Minh Thượng.
                        Do đó, vì những hạn chế về thời gian khảo sát nên số lượng loài và ghi nhận của một số nhóm sinh vật còn
                        chưa đầy đủ. Mong rằng, trong tương lai gần sẽ có thêm nhiều dữ liệu được cập nhật từ các khảo sát tiếp theo,
                        cũng như là các ghi nhận do chính cán bộ và nhân viên của VQG thực hiện,
                        cùng góp phần bổ sung đầy đủ hơn về tính đa dạng của các loài sinh vật tại VQG U Minh Thượng.
                    </p>
                </div>

            </div>
            <div className="map-container bg-white shadow-lg p-6 mx-7 mb-10">
                <Map />
            </div>
            <div className="flex justify-center items-center space-x-4 p-4">
                <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 w-1/4 min-h-[200px] transform transition-transform duration-300 hover:scale-110">
                    <div className="flex justify-center w-full mb-2">
                        <img
                            src="./assets/images/logo_wwf-d3294140.png"
                            alt="Sponsor 1"
                            className="w-full h-32 object-contain"
                        />
                    </div>
                    <p className="text-center font-semibold">Đơn vị tài trợ</p>
                </div>

                <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 w-1/4 min-h-[200px] transform transition-transform duration-300 hover:scale-110">
                    <div className="flex w-full mb-2 space-x-2">
                        <img
                            src="./assets/images/logo_ecology-4cc4fdbc.png"
                            alt="Sponsor 2"
                            className="flex-1 h-32 object-contain"
                        />
                        <img
                            src="./assets/images/logo_stac-fa78e5e1.jpg"
                            alt="Sponsor 2"
                            className="flex-1 h-32 object-contain"
                        />
                    </div>
                    <p className="text-center font-semibold">Đơn vị thực hiện</p>
                </div>

                <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 w-1/4 min-h-[200px] transform transition-transform duration-300 hover:scale-110">
                    <div className="flex justify-center w-full mb-2">
                        <img
                            src="./assets/images/logo-9478606c.png"
                            alt="Sponsor 3"
                            className="w-full h-32 object-contain"
                        />
                    </div>
                    <p className="text-center font-semibold">Đơn vị phối hợp</p>
                </div>
            </div>




        </>
    );
};

export default Home;
