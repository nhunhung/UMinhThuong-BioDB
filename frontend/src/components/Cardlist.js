import React, { useState, useEffect } from "react";
import '../StyleCSS/Cardlist.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import L from 'leaflet';
import '../StyleCSS/leaflet.css';
import b1 from '../assets/images/b1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Cardlist = ({ selectedImageId, decree64, decree81, endemic, vietnamRedList, iucnRedList }) => {
    const [viewMode, setViewMode] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPageGrid, setCurrentPageGrid] = useState(1);
    const [currentPageList, setCurrentPageList] = useState(1);
    const [data, setData] = useState([]);
    const [speciesData, setSpeciesData] = useState([]);
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00c49f', '#ffbb28', '#ff8042'];
    const [handleImageClick, sethandleImageClick] = useState(null);

    useEffect(() => {
        fetchData("http://127.0.0.1:3001/api/organism/all-organism?page=1&limit=20");
    }, []);
    console.log("cart list decree81", decree81)
    console.log("cart list decree64", decree64)
    console.log("cart list veitnam", vietnamRedList)
    console.log("cart list iucnRedlist", iucnRedList)
    console.log("cart list endemic", endemic)

    useEffect(() => {
        console.log('Image ID cl:', selectedImageId);
        if (selectedImageId) {
            fetchData(`http://127.0.0.1:3001/api/organism?groupOfOrganismId=${selectedImageId}`);
        }
    }, [selectedImageId]);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(url.includes("groupOfOrganismId") ? result.data : result.organisms);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        const fetchSpeciesData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:3001/api/organism/statics?groupOfOrganismId=1&groupOfOrganismId=2&groupOfOrganismId=3&groupOfOrganismId=4&groupOfOrganismId=5&groupOfOrganismId=6&groupOfOrganismId=7&groupOfOrganismId=8");
                const result = await response.json();
                setSpeciesData(result.map(item => ({
                    name: item.goo_name || 'Unknown',
                    Ghinhan: parseInt(item.Ghinhan) || 0,
                    Loai: parseInt(item.Loai) || 0
                })));
            } catch (error) {
                console.error('Error fetching species data:', error);
                setSpeciesData([]);
            }
        };
        fetchSpeciesData();
    }, []);

    const itemsPerPageGrid = 20;
    const itemsPerPageList = 20;

    const totalPagesGrid = Math.ceil(data.length / itemsPerPageGrid);
    const indexOfLastItemGrid = currentPageGrid * itemsPerPageGrid;
    const indexOfFirstItemGrid = indexOfLastItemGrid - itemsPerPageGrid;
    const currentItemsGrid = data.slice(indexOfFirstItemGrid, indexOfLastItemGrid);

    const totalPagesList = Math.ceil(data.length / itemsPerPageList);
    const indexOfLastItemList = currentPageList * itemsPerPageList;
    const indexOfFirstItemList = indexOfLastItemList - itemsPerPageList;
    const currentItemsList = data.slice(indexOfFirstItemList, indexOfLastItemList);

    const renderGridView = () => (
        <div>
            <div className="card-grid-user">
                {currentItemsGrid.map((item, index) => (
                    <div className="card-user" key={index}>
                        <a href={`/details/${item.organism_id}`} className="card-link">
                            <img src={b1} alt="Hình đại diện" className="card-avatar-user" />
                        </a>
                        <h4>{item.order || "N/A"}</h4>
                        <p>{item.scientificName || "N/A"}</p>
                        <p>{item.goo || "N/A"}</p>
                        <p>(1 ghi nhận)</p>
                    </div>
                ))}
            </div>

            <div className="pagination-user">
                <button
                    onClick={() => setCurrentPageGrid(currentPageGrid - 1)}
                    disabled={currentPageGrid === 1}
                >
                    Previous
                </button>
                <span>{`Page ${currentPageGrid} of ${totalPagesGrid}`}</span>
                <button
                    onClick={() => setCurrentPageGrid(currentPageGrid + 1)}
                    disabled={currentPageGrid === totalPagesGrid}
                >
                    Next
                </button>
            </div>
        </div>
    );

    const renderListView = () => (
        <div>
            <table className="card-list-view-user">
                <thead>
                    <tr>
                        <th>Chi tiết</th>
                        <th>Hình đại diện</th>
                        <th>Nhóm sinh vật</th>
                        <th>Bộ</th>
                        <th>Họ</th>
                        <th>Chi</th>
                        <th>Tên khoa học</th>
                        <th>Tên tác giả</th>
                        <th>Tên địa phương</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItemsList.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <a href={`/details/${item.organism_id}`} className="link-icon">
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                            </td>

                            <td>
                                <img src={b1} alt="Hình đại diện" className="table-avatar-user" />
                            </td>
                            <td>{item.goo || "N/A"}</td>
                            <td>{item.order || "N/A"}</td>
                            <td>{item.family || "N/A"}</td>
                            <td>{item.genus || "N/A"}</td>
                            <td>{item.scientificName || "N/A"}</td>
                            <td>{item.authorName || "N/A"}</td>
                            <td>{item.commonName || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-user">
                <button
                    onClick={() => setCurrentPageList(currentPageList - 1)}
                    disabled={currentPageList === 1}
                >
                    Previous
                </button>
                <span>{`Page ${currentPageList} of ${totalPagesList}`}</span>
                <button
                    onClick={() => setCurrentPageList(currentPageList + 1)}
                    disabled={currentPageList === totalPagesList}
                >
                    Next
                </button>
            </div>
        </div>
    );

    const renderStatsView = () => {
        if (speciesData.length === 0) {
            return <div>Không có dữ liệu thống kê</div>;
        }

        const totalSpecies = speciesData.reduce((acc, item) => acc + (item.Loai ? parseInt(item.Loai) : 0), 0);
        const totalObservations = speciesData.reduce((acc, item) => acc + (item.Ghinhan ? parseInt(item.Ghinhan) : 0), 0);

        return (
            <div className="card-stats-user" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <h3>Tổng loài: {totalSpecies}</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={speciesData}
                            dataKey="Loai"
                            nameKey="goo_name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        >
                            {speciesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div>
                    <h3>Tổng ghi nhận: {totalObservations}</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={speciesData}
                            dataKey="Ghinhan"
                            nameKey="goo_name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        >
                            {speciesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        );
    };

    const renderMapView = () => (
        <div className="card-map-user">
            <div id="map-user" style={{ height: "100%" }}></div>
        </div>
    );

    useEffect(() => {
        const mapContainer = document.getElementById("map-user");

        if (mapContainer && !mapContainer._leaflet_id) {
            const map = L.map("map-user").setView([9.58739, 105.0552], 10);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker([9.58739, 105.0552])
                .addTo(map)
                .bindPopup("Đây là vị trí mẫu")
                .openPopup();

            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }
    }, []);

    useEffect(() => {
        if (searchTerm.trim() !== "") {
            const fetchSearchResults = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:3001/api/organism/search?kw=${encodeURIComponent(searchTerm)}`);
                    const result = await response.json();
                    setSearchResults(result.data || []); // Assuming API returns data array
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            };

            fetchSearchResults();
        } else {
            setSearchResults([]); // Clear results when searchTerm is empty
        }
    }, [searchTerm]);

    const renderView = () => {
        switch (viewMode) {
            case "grid":
                return renderGridView();
            case "list":
                return renderListView();
            case "stats":
                return renderStatsView();
            case "map":
                return renderMapView();
            default:
                return renderGridView();
        }
    };

    return (
        <div className="card-list-container-user">
            <div className="search-and-buttons-row-user">
                <input
                    type="text"
                    placeholder="Tìm theo tên khoa học, tên thông thường..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar-user"
                />
                <div className="view-mode-buttons-user">
                    <button onClick={() => setViewMode("grid")}>Lưới</button>
                    <button onClick={() => setViewMode("list")}>Danh sách</button>
                    <button onClick={() => setViewMode("stats")}>Thống kê</button>
                    <button onClick={() => setViewMode("map")}>Bản đồ</button>
                </div>
            </div>
            {renderView()}
        </div>
    );
};

export default Cardlist;
