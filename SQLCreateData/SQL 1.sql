INSERT INTO "Role" (name) 
VALUES 
    ('admin'),
    ('editor'),
    ('guest');

-- Thêm tỉnh Kiên Giang vào bảng Provinces
INSERT INTO "Provinces" (province_name) 
VALUES 
    ('Kiên Giang');

-- Thêm huyện U Minh Thượng vào bảng Districts
INSERT INTO "Districts" (district_name, provinces_id) 
VALUES 
    ('U Minh Thượng', 1)
RETURNING districts_id;

-- Thêm xã An Minh Bắc vào bảng Wards
INSERT INTO "Wards" (ward_name, districts_id) 
VALUES 
    ('An Minh Bắc', 1);


-- Thêm các giới vào bảng Kingdom
INSERT INTO "Kingdom" (kingdom_name) 
VALUES 
    ('Animalia'),  -- Động vật
    ('Plantae'),   -- Thực vật
    ('Fungi'),     -- Nấm
    ('Protista'),  -- Nguyên sinh
    ('Monera');    -- Tiền nhân (vi khuẩn)

-- Giới Động vật (Animalia)
INSERT INTO "Phylum" (phylum_name, kingdom_id) 
VALUES 
    ('Chordata', 1),
    ('Arthropoda', 1),
    ('Mollusca', 1),
    ('Echinodermata', 1),
    ('Porifera', 1);

-- Giới Thực vật (Plantae)
INSERT INTO "Phylum" (phylum_name, kingdom_id) 
VALUES 
    ('Bryophyta', 2),
    ('Pteridophyta', 2),
    ('Coniferophyta', 2),
    ('Magnoliophyta', 2);

-- Giới Nấm (Fungi)
INSERT INTO "Phylum" (phylum_name, kingdom_id) 
VALUES 
    ('Zygomycota', 3),
    ('Ascomycota', 3),
    ('Basidiomycota', 3),
    ('Chytridiomycota', 3);

-- Giới Nguyên sinh (Protista)
INSERT INTO "Phylum" (phylum_name, kingdom_id) 
VALUES 
    ('Protozoa', 4),
    ('Chlorophyta', 4),
    ('Rhodophyta', 4);

-- Giới Tiền nhân (Monera)
INSERT INTO "Phylum" (phylum_name, kingdom_id) 
VALUES 
    ('Eubacteria', 5),
    ('Cyanobacteria', 5);

-- Giới Động vật, Ngành Chordata
INSERT INTO "Class" (class_name, phylum_id) 
VALUES 
    ('Mammalia', 1), -- Lớp Thú
    ('Aves', 1),     -- Lớp Chim
    ('Reptilia', 1), -- Lớp Bò sát
    ('Amphibia', 1), -- Lớp Lưỡng cư
    ('Actinopterygii', 1); -- Lớp Cá vây tia

-- Giới Thực vật, Ngành Magnoliophyta
INSERT INTO "Class" (class_name, phylum_id) 
VALUES 
    ('Magnoliopsida', 8), -- Lớp Hai lá mầm
    ('Liliopsida', 8);    -- Lớp Một lá mầm

-- Lớp Mammalia
INSERT INTO "Orders" (order_name, class_id) 
VALUES 
    ('Primates', 1),    -- Bộ Linh trưởng
    ('Carnivora', 1),   -- Bộ Ăn thịt
    ('Rodentia', 1);    -- Bộ Gặm nhấm

-- Lớp Aves
INSERT INTO "Orders" (order_name, class_id) 
VALUES 
    ('Passeriformes', 2), -- Bộ Sẻ
    ('Accipitriformes', 2); -- Bộ Cắt

-- Lớp Magnoliopsida
INSERT INTO "Orders" (order_name, class_id) 
VALUES 
    ('Rosales', 6),     -- Bộ Hoa hồng
    ('Fabales', 6);     -- Bộ Đậu

-- Bộ Primates
INSERT INTO "Family" (family_name, order_id) 
VALUES 
    ('Hominidae', 1), -- Họ Người
    ('Cebidae', 1);   -- Họ Khỉ Tân thế giới

-- Bộ Carnivora
INSERT INTO "Family" (family_name, order_id) 
VALUES 
    ('Felidae', 2),  -- Họ Mèo
    ('Canidae', 2);  -- Họ Chó

-- Bộ Rosales
INSERT INTO "Family" (family_name, order_id) 
VALUES 
    ('Rosaceae', 5), -- Họ Hoa hồng
    ('Moraceae', 5); -- Họ Dâu tằm

-- Họ Hominidae
INSERT INTO "Genus" (genus_name, family_id) 
VALUES 
    ('Homo', 1), -- Chi Người
    ('Pan', 1);  -- Chi Tinh tinh

-- Họ Felidae
INSERT INTO "Genus" (genus_name, family_id) 
VALUES 
    ('Panthera', 3), -- Chi Báo
    ('Felis', 3);    -- Chi Mèo

-- Họ Rosaceae
INSERT INTO "Genus" (genus_name, family_id) 
VALUES 
    ('Rosa', 5), -- Chi Hoa hồng
    ('Rubus', 5); -- Chi Mâm xôi








































