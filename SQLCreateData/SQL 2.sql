DELETE FROM public."Samples";

INSERT INTO public."GroupOfOrganisms" (logo, goo_name)
VALUES 
('UMinhThuong-BioDB/frontend/src/assets/images/a19.png', 'Ngành Thú'),
('UMinhThuong-BioDB/frontend/src/assets/images/a18.png', 'Ngành Chim'),
('UMinhThuong-BioDB/frontend/src/assets/images/a17.png', 'Ngành Bò sát'),
('UMinhThuong-BioDB/frontend/src/assets/images/a16.png', 'Ngành Lưỡng cư'),
('UMinhThuong-BioDB/frontend/src/assets/images/a15.png', 'Ngành Cá'),
('UMinhThuong-BioDB/frontend/src/assets/images/a21.png', 'Động vật không xương sống'),
('UMinhThuong-BioDB/frontend/src/assets/images/a22.png', 'Khuyến thực vật'),
('UMinhThuong-BioDB/frontend/src/assets/images/a23.png', 'Thực vật hạt kính'),
('UMinhThuong-BioDB/frontend/src/assets/images/a15.png', 'Ngành Côn trùng'),
('UMinhThuong-BioDB/frontend/src/assets/images/a14.png', 'Ngành Nhuyễn thể'),
('UMinhThuong-BioDB/frontend/src/assets/images/a13.png', 'Ngành Xương sống'),
('UMinhThuong-BioDB/frontend/src/assets/images/a12.png', 'Ngành Vô tuyến'),
('UMinhThuong-BioDB/frontend/src/assets/images/a11.png', 'Ngành Nấm mốc'),
('UMinhThuong-BioDB/frontend/src/assets/images/a10.png', 'Ngành Hoa đỏ'),
('UMinhThuong-BioDB/frontend/src/assets/images/a9.png', 'Ngành Rêu tản'),
('UMinhThuong-BioDB/frontend/src/assets/images/a8.png', 'Ngành Tảo'),
('UMinhThuong-BioDB/frontend/src/assets/images/a7.png', 'Ngành Rêu'),
('UMinhThuong-BioDB/frontend/src/assets/images/a6.png', 'Ngành Thực vật phù du'),
('UMinhThuong-BioDB/frontend/src/assets/images/a5.png', 'Ngành Động vật nguyên sinh'),
('UMinhThuong-BioDB/frontend/src/assets/images/a4.png', 'Ngành Vi khuẩn'),
('UMinhThuong-BioDB/frontend/src/assets/images/a3.png', 'Ngành Nấm'),
('UMinhThuong-BioDB/frontend/src/assets/images/a2.png', 'Ngành Thực vật'),
('UMinhThuong-BioDB/frontend/src/assets/images/a1.png', 'Ngành Động vật');


INSERT INTO public."ConservationStatus" 
("iucnRedList", "iucnRedListVersion", "citesSpecies", "vietnamRedList", "decree81", "decree64", "endemic", "circular35")
VALUES
(true, '2022', true, true, 'N/A', 'N/A', false, 'N/A'),
(false, '2021', false, false, 'N/A', 'N/A', true, 'N/A'),
(true, '2023', true, true, '81/2021/NĐ-CP', '64/2019/NĐ-CP', false, '35/2018/TT-BTNMT'),
(null, 'N/A', null, null, 'N/A', 'N/A', true, '35/2018/TT-BTNMT'),
(false, '2022', true, false, 'N/A', 'N/A', false, 'N/A'),
(true, '2020', true, true, 'N/A', '64/2019/NĐ-CP', true, 'N/A'),
(true, '2021', true, false, '81/2021/NĐ-CP', 'N/A', true, '35/2018/TT-BTNMT'),
(false, '2021', false, true, 'N/A', 'N/A', false, 'N/A'),
(true, '2022', true, true, 'N/A', '64/2019/NĐ-CP', false, '35/2018/TT-BTNMT'),
(null, 'N/A', null, null, 'N/A', 'N/A', true, 'N/A');


-- Insert an organism record
INSERT INTO public."Organisms" (
    cultivated, "hostPlantAnimal", "generalNotes", "museumNotes", "informationSource", 
    "speciesNameLevel1", "firstAuthor", "subspeciesLevel1", "speciesNameLevel2", "secondAuthor", 
    "subspeciesLevel2", "speciesNameLevel3", "thirdAuthor", "nomenclatureStatus", "nomenclatureLevel", 
    "scientificName", "authorName", "commonName", "publicationReference", "yearOfAuthorName", 
    "synonymName", "treeForm", "lifeForm", "ecologicalNiche", "speciesDescription", habitat, 
    "distributionArea", ethnobotany, "usageGroup", "endangeredRareSpecies", "createdAt", "updatedAt", 
    conservationstatus_id, groupoforganisms_id, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id
)
VALUES (
    true, 'Plant', 'No significant notes', 'Museum specimen notes', 'Published article', 
    'Species A', 'Author A', 'Subspecies A1', 'Species B', 'Author B', 
    'Subspecies B1', 'Species C', 'Author C', 'Accepted', 'Level 2', 
    'Scientific Name A', 'Author Name A', 'Common Name A', 'Reference A', 2023, 
    'Synonym A', 'Tree', 'Herbaceous', 'Tropical forest', 'This species is native to tropical regions.', 
    'Tropical Rainforest', 'Southeast Asia', 'Used in traditional medicine', 'Medicinal', 
    true, '2024-12-19 10:00:00+00', '2024-12-19 10:00:00+00', 
    1, 2, 3, 1, 1, 1, 1, 1
);


INSERT INTO public."Organisms" (
    cultivated, "hostPlantAnimal", "generalNotes", "museumNotes", "informationSource", 
    "speciesNameLevel1", "firstAuthor", "subspeciesLevel1", "speciesNameLevel2", "secondAuthor", 
    "subspeciesLevel2", "speciesNameLevel3", "thirdAuthor", "nomenclatureStatus", "nomenclatureLevel", 
    "scientificName", "authorName", "commonName", "publicationReference", "yearOfAuthorName", 
    "synonymName", "treeForm", "lifeForm", "ecologicalNiche", "speciesDescription", habitat, 
    "distributionArea", ethnobotany, "usageGroup", "endangeredRareSpecies", "createdAt", "updatedAt", 
    conservationstatus_id, groupoforganisms_id, kingdom_id, phylum_id, class_id, order_id, family_id, genus_id
)
VALUES 
    -- 1
    (false, 'Động vật hoang dã', 'Động vật ăn thịt', 'Mẫu vật trong viện bảo tàng', 'Nguồn nghiên cứu về động vật', 
    'Hổ Bengal', 'Lê Minh Q', 'Subspecies A1', 'Hổ trắng', 'Nguyễn Thị R', 
    'Subspecies B1', 'Hổ vàng', 'Trần Thiện S', 'Được chấp nhận', 'Mức độ 1', 
    'Panthera tigris', 'Lê Minh Q', 'Hổ Bengal', 'Tạp chí Động vật, 2021', 2021, 
    'Hổ giống', 'Động vật ăn thịt', 'Động vật hoang dã', 'Rừng nhiệt đới', 'Loài động vật ăn thịt, nguy cơ tuyệt chủng.', 
    'Rừng U Minh Thượng', 'Việt Nam', 'Bảo vệ động vật hoang dã', 'Động vật quý hiếm', 
    true, '2024-12-19 10:00:00+00', '2024-12-19 10:00:00+00', 
    2, 2, 1, 2, 6, 3, 3, 1);
--Thêm động vật


--Thêm thực vật