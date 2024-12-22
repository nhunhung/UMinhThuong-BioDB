const Footer = () => {
    return (
        <>
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
        </>
    );
};

export default Footer;