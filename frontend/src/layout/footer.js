const Footer = () => {
    return (
        <>
            <footer className="bg-[rgb(16,62,78)] text-white py-6">
                <div className="container mx-auto flex flex-col items-center space-y-4">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-bold">Cơ sở dữ liệu đa dạng sinh học Vườn Quốc gia U Minh Thượng</h2>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-lg">Phiên bản 1.0</h2>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-lg">Ngã tư Công Sự, xã An Minh Bắc, huyện U Minh Thượng, Kiên Giang</h2>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-lg">Số điện thoại: 0290.3870.545 | Di động: 0856.883.646 (Quản trị kỹ thuật)</h2>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-lg">Email:</h2>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-lg">Website:</h2>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
