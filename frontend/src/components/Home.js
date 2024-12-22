

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Map from "./Map";
import '../StyleCSS/Home.css';
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
        <div className="home">
            <div className="tw-container tw-mx-auto">
                {/* Slideshow */}
                <div className="tw-relative tw-w-full tw-h-64 tw-bg-gray-100 tw-shadow-md tw-mb-8 tw-flex tw-items-center tw-justify-center">
                    {/* Fixed Title */}
                    <h2 className="tw-absolute tw-top-1/2 tw-transform tw--translate-y-1/2 tw-text-3xl tw-font-bold tw-text-center tw-z-10 tw-text-white">
                        Cơ sở dữ liệu đa dạng sinh học
                        <br />
                        Vườn Quốc gia U Minh Thượng
                    </h2>
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-transition-opacity tw-duration-500 tw-ease-in-out ${index === currentSlide ? "tw-opacity-100" : "tw-opacity-0"}`}
                            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        />
                    ))}
                    <button
                        onClick={prevSlide}
                        className="tw-absolute tw-top-1/2 tw-left-4 tw-transform tw--translate-y-1/2 tw-bg-white tw-bg-opacity-50 tw-rounded-full tw-p-2 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500"
                        aria-label="Previous slide"
                    >
                        <FaChevronLeft className="tw-text-gray-800 tw-text-2xl" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="tw-absolute tw-top-1/2 tw-right-4 tw-transform tw--translate-y-1/2 tw-bg-white tw-bg-opacity-50 tw-rounded-full tw-p-2 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500"
                        aria-label="Next slide"
                    >
                        <FaChevronRight className="tw-text-gray-800 tw-text-2xl" />
                    </button>
                </div>

                {/* Container */}
                <div className="tw-content tw-bg-white tw-shadow-lg tw-p-6 tw-mb-8 tw-mx-7" style={{ width: '100%' }}>
                    <h3 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-center">Giới thiệu nền tảng Web-GIS về đa dạng sinh học Vườn Quốc gia U Minh Thượng</h3>
                    <p className="tw-mb-4 tw-text-gray-600 tw-text-lg tw-leading-[30px]">
                        Vườn Quốc gia U Minh Thượng (VQG UMT) nằm ở tỉnh Kiên Giang, Việt Nam. Được thành lập năm 2002 trên cơ sở nâng cấp Khu bảo tồn thiên nhiên U Minh Thượng, VQG UMT có tổng diện tích 21.107 ha, bao gồm vùng lõi 8.038 ha và vùng đệm 13.069 ha. Vùng đệm do Ủy ban nhân dân huyện U Minh Thượng quản lý. VQG UMT có hai kiểu thảm thực vật chính: rừng tràm (bao gồm rừng tràm trên đất than bùn, rừng tràm trên đất sét, rừng hỗn giao và rừng trồng) và trảng cỏ ngập nước theo mùa. Hệ sinh thái thủy sinh của VQG UMT bao gồm đầm lầy và hệ thống kênh rạch tự nhiên và nhân tạo.
                    </p>
                    <p className="tw-mb-4 tw-text-gray-600 tw-text-lg tw-leading-[30px]">
                        VQG UMT là nơi cư trú của hệ động thực vật phong phú. Hệ thực vật bao gồm 258 loài thuộc 87 họ và 2 bộ. Hệ động vật có xương sống gồm 32 loài thú, 184 loài chim, 56 loài bò sát và lưỡng cư, 64 loài cá. Ngoài ra, VQG UMT còn có 209 loài côn trùng và nhiều loài động vật không xương sống khác. Nhiều loài trong số này có giá trị bảo tồn và kinh tế cao, nhưng vẫn cần được nghiên cứu, điều tra và đánh giá đầy đủ hơn.
                    </p>
                    <p className="tw-mb-4 tw-text-gray-600 tw-text-lg tw-leading-[30px]">
                        Nhằm mục đích hệ thống hóa dữ liệu về đa dạng sinh học, Viện Sinh thái học Miền Nam phối hợp với VQG U Minh Thượng xây dựng nền tảng WebGIS về đa dạng sinh học. Đây là một sản phẩm trong khuôn khổ một dự án nhằm tổng hợp và công bố dữ liệu về các loài sinh vật trong VQG UMT.
                    </p>
                    <p className="tw-mb-4 tw-text-gray-600 tw-text-lg tw-leading-[30px]">
                        Dựa trên dữ liệu nghiên cứu trước đây và các đợt điều tra bổ sung, dự án đã tổng hợp danh sách các nhóm sinh vật chính tại VQG U Minh Thượng:
                    </p>
                    <table className="tw-table-auto tw-w-full tw-border-collapse tw-border tw-border-gray-300">
                        <thead>
                            <tr>
                                <th className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">Nhóm</th>
                                <th className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">Thực vật hạt kín</th>
                                <th className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">Khuyết thực vật</th>
                                <th className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">Thực vật hạt trần</th>
                                <th className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">Chim</th>
                                <th className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">Thú</th>
                                <th className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">Bò sát</th>
                                <th className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">Động vật không xương sống</th>
                                <th className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">Lưỡng cư</th>
                                <th className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">Cá</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2 tw-font-semibold">Loài</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">339</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">20</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">0</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">191</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">32</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">46</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">15</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">11</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">110</td>
                            </tr>
                            <tr>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2 tw-font-semibold">Ghi nhận</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">753</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">50</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">0</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">502</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">32</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">46</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">136</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">12</td>
                                <td className="tw-border tw-border-gray-300 tw-px-4 tw-py-2">129</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="tw-mb-4 tw-text-gray-600 tw-text-lg tw-leading-[30px]">
                        Dự án này là bước khởi đầu cho việc xây dựng cơ sở dữ liệu đa dạng sinh học tại VQG U Minh Thượng. Do hạn chế về thời gian, số liệu về một số nhóm sinh vật còn chưa đầy đủ.  Hy vọng trong tương lai, dữ liệu sẽ được cập nhật bổ sung từ các khảo sát tiếp theo, cũng như từ các ghi nhận của cán bộ VQG, để phản ánh chính xác hơn tính đa dạng sinh học của VQG U Minh Thượng.
                    </p>
                </div>

                <div className="tw-map-container tw-bg-white tw-shadow-lg tw-p-6 tw-mx-7 tw-mb-10">
                    <Map />
                </div>


                <div className="tw-flex tw-justify-center tw-items-center tw-space-x-4 tw-p-4">
                    <div className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-4 tw-w-1/4 tw-min-h-[200px] tw-transform tw-transition-transform tw-duration-300 hover:tw-scale-110">
                        <div className="tw-flex tw-justify-center tw-w-full tw-mb-2">
                            <img
                                src="./assets/images/logo_wwf-d3294140.png"
                                alt="WWF"
                                className="tw-w-full tw-h-32 tw-object-contain"
                            />
                        </div>
                        <p className="tw-text-center tw-font-semibold">Quỹ Quốc tế Bảo vệ Thiên nhiên (WWF)</p>
                    </div>

                    <div className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-4 tw-w-1/4 tw-min-h-[200px] tw-transform tw-transition-transform tw-duration-300 hover:tw-scale-110">
                        <div className="tw-flex tw-w-full tw-mb-2 tw-space-x-2">
                            <img
                                src="./assets/images/logo_ecology-4cc4fdbc.png"
                                alt="Viện Sinh thái học Miền Nam"
                                className="tw-flex-1 tw-h-32 tw-object-contain"
                            />
                            <img
                                src="./assets/images/logo_stac-fa78e5e1.jpg"
                                alt="Trung tâm Ứng dụng KH&CN Tiền Giang"
                                className="tw-flex-1 tw-h-32 tw-object-contain"
                            />
                        </div>
                        <p className="tw-text-center tw-font-semibold">Viện Sinh thái học Miền Nam<br />Trung tâm Ứng dụng KH&CN Tiền Giang</p>
                    </div>

                    <div className="tw-flex tw-flex-col tw-items-center tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-4 tw-w-1/4 tw-min-h-[200px] tw-transform tw-transition-transform tw-duration-300 hover:tw-scale-110">
                        <div className="tw-flex tw-justify-center tw-w-full tw-mb-2">
                            <img
                                src="./assets/images/logo-9478606c.png"
                                alt="Vườn Quốc gia U Minh Thượng"
                                className="tw-w-full tw-h-32 tw-object-contain"
                            />
                        </div>
                        <p className="tw-text-center tw-font-semibold">Vườn Quốc gia U Minh Thượng</p>
                    </div>
                </div>

            </div>
            <footer className="tw-bg-[rgb(16,62,78)] tw-text-white tw-py-6">
                <div className="tw-container tw-mx-auto tw-flex tw-flex-col tw-items-center tw-space-y-4">
                    <div className="tw-flex tw-flex-col tw-items-center">
                        <h2 className="tw-text-xl tw-font-bold tw-text-white tw-padding tw-p-0 tw-m-0">Cơ sở dữ liệu đa dạng sinh học Vườn Quốc gia U Minh Thượng</h2>
                    </div>

                    <div className="tw-flex tw-flex-col tw-items-center tw-mt-2">
                        <h2 className="tw-text-lg tw-text-white tw-p-0 tw-m-0">Phiên bản 1.0</h2>
                    </div>

                    <div className="tw-flex tw-flex-col tw-items-center tw-mt-2">
                        <h2 className="tw-text-lg tw-text-white tw-p-0 tw-m-0">Ngã tư Công Sự, xã An Minh Bắc, huyện U Minh Thượng, Kiên Giang</h2>
                    </div>

                    <div className="tw-flex tw-flex-col tw-items-center tw-mt-2">
                        <h2 className="tw-text-lg tw-text-white tw-p-0 tw-m-0">Số điện thoại: 0290.3870.545 | Di động: 0856.883.646 (Quản trị kỹ thuật)</h2>
                    </div>

                    <div className="tw-flex tw-flex-col tw-items-center tw-mt-2">
                        <h2 className="tw-text-lg tw-text-white tw-p-0 tw-m-0">
                            <a href="" className="tw-hover:tw-underline">Email: </a> {/* Added email link */}
                        </h2>
                    </div>

                    <div className="tw-flex tw-flex-col tw-items-center tw-mt-2">
                        <h2 className="tw-text-lg tw-text-white tw-p-0 tw-m-0">
                            <a href="" className="tw-hover:tw-underline">Website:</a> {/* Added website link */}
                        </h2>
                    </div>
                </div>
            </footer>



        </div>
    );
};

export default Home;