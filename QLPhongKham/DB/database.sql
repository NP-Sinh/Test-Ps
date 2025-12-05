CREATE DATABASE DBPhongKham
ON 
(
    NAME = DBPhongKham_Data,
    FILENAME = 'D:\LapTrinh\Code\CodeWeb\PS-QLPhongKham\DB\DBPhongKham_Data.mdf',
    SIZE = 20MB,
    MAXSIZE = 1GB,
    FILEGROWTH = 10MB
)
LOG ON
(
    NAME = DBPhongKham_Log,
    FILENAME = 'D:\LapTrinh\Code\CodeWeb\PS-QLPhongKham\DB\DBPhongKham_Log_Log.ldf',
    SIZE = 10MB,
    MAXSIZE = 500MB,
    FILEGROWTH = 5MB
);
GO

USE DBPhongKham;
GO

-- =============================================
-- 1. QUẢN LÝ NGƯỜI DÙNG & PHÂN QUYỀN
-- =============================================

-- Bảng vai trò
CREATE TABLE VaiTro (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaVaiTro NVARCHAR(5) NOT NULL UNIQUE,
    TenVaiTro NVARCHAR(50) NOT NULL UNIQUE
);

-- Bảng người dùng
CREATE TABLE NguoiDung (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaNguoiDung NVARCHAR(10) NOT NULL UNIQUE,
    TenDangNhap NVARCHAR(50) NOT NULL UNIQUE,
    MatKhau NVARCHAR(255) NOT NULL,
    HoTen NVARCHAR(100) NOT NULL,
    SoDienThoai NVARCHAR(20),
    Email NVARCHAR(100),
    IdVaiTro INT FOREIGN KEY REFERENCES VaiTro(Id),
    DangHoatDong BIT DEFAULT 1,
    NgayTao DATETIME DEFAULT GETDATE()
);
-- Bảng RefreshToken
CREATE TABLE RefreshToken (
    Id INT PRIMARY KEY IDENTITY(1,1),
    IdNguoiDung INT FOREIGN KEY REFERENCES NguoiDung(Id),
    Token NVARCHAR(500) NOT NULL,
    JwtId NVARCHAR(100),  -- ID của JWT tương ứng
    IsUsed BIT DEFAULT 0,  -- Đã sử dụng hay chưa
    IsRevoked BIT DEFAULT 0,  -- Đã bị thu hồi chưa
    ExpiryDate DATETIME NOT NULL,  -- Thời gian hết hạn
    CreatedDate DATETIME DEFAULT GETDATE()
);
-- =============================================
-- 2. QUẢN LÝ DANH MỤC
-- =============================================

-- Bảng chuyên khoa
CREATE TABLE ChuyenKhoa (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaChuyenKhoa NVARCHAR(10) NOT NULL UNIQUE,
    TenChuyenKhoa NVARCHAR(100) NOT NULL UNIQUE
);

-- Bảng phòng khám
CREATE TABLE PhongKham (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaPhong NVARCHAR(10) NOT NULL UNIQUE,
    TenPhong NVARCHAR(100) NOT NULL UNIQUE,
    LoaiPhong NVARCHAR(50), -- Khám bệnh, Xét nghiệm, Thủ thuật
    Tang INT
);

-- Bảng dịch vụ
CREATE TABLE DichVu (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaDichVu NVARCHAR(10) NOT NULL UNIQUE,
    TenDichVu NVARCHAR(200) NOT NULL,
    LoaiDichVu NVARCHAR(50), -- Khám bệnh, Xét nghiệm, Thủ thuật
    IdChuyenKhoa INT FOREIGN KEY REFERENCES ChuyenKhoa(Id),
    DonGia DECIMAL(18,2) NOT NULL,
    ThoiLuong INT -- Phút
);

-- Bảng thuốc
CREATE TABLE Thuoc (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaThuoc NVARCHAR(10) NOT NULL UNIQUE,
    TenThuoc NVARCHAR(200) NOT NULL,
    HoatChat NVARCHAR(200),
    DonVi NVARCHAR(50), -- Viên, Vỉ, Hộp, Chai
    DonGia DECIMAL(18,2) NOT NULL,
    SoLuongTon INT DEFAULT 0,
    DangHoatDong BIT DEFAULT 1
);

-- =============================================
-- 3. QUẢN LÝ BÁC SĨ
-- =============================================

-- Bảng bác sĩ
CREATE TABLE BacSi (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaBacSi NVARCHAR(10) NOT NULL UNIQUE,
    IdNguoiDung INT FOREIGN KEY REFERENCES NguoiDung(Id),
    HoTen NVARCHAR(100) NOT NULL,
    NgaySinh DATE,
    GioiTinh NVARCHAR(10),
    SoDienThoai NVARCHAR(20),
    IdChuyenKhoa INT FOREIGN KEY REFERENCES ChuyenKhoa(Id),
    BangCap NVARCHAR(100),
    DangHoatDong BIT DEFAULT 1
);

-- Bảng lịch làm việc bác sĩ
CREATE TABLE LichLamViec (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaLich NVARCHAR(10) NOT NULL UNIQUE,
    IdBacSi INT FOREIGN KEY REFERENCES BacSi(Id),
    IdPhong INT FOREIGN KEY REFERENCES PhongKham(Id),
    ThuTrongTuan INT, -- 2-8 (Thứ 2 - Chủ nhật)
    GioBatDau TIME NOT NULL,
    GioKetThuc TIME NOT NULL,
    SoBenhNhanToiDa INT DEFAULT 20
);

-- =============================================
-- 4. QUẢN LÝ BỆNH NHÂN
-- =============================================

-- Bảng bệnh nhân
CREATE TABLE BenhNhan (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaBenhNhan NVARCHAR(10) NOT NULL UNIQUE,
    HoTen NVARCHAR(100) NOT NULL,
    NgaySinh DATE,
    GioiTinh NVARCHAR(10),
    SoDienThoai NVARCHAR(20),
    DiaChi NVARCHAR(255),
    CMND NVARCHAR(20),
    NhomMau NVARCHAR(5),
    DiUng NVARCHAR(500),
    NgayTao DATETIME DEFAULT GETDATE()
);

-- =============================================
-- 5. QUẢN LÝ LỊCH HẸN
-- =============================================

-- Bảng lịch hẹn
CREATE TABLE LichHen (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaLichHen NVARCHAR(10) NOT NULL UNIQUE,
    IdBenhNhan INT FOREIGN KEY REFERENCES BenhNhan(Id),
    IdBacSi INT FOREIGN KEY REFERENCES BacSi(Id),
    IdPhong INT FOREIGN KEY REFERENCES PhongKham(Id),
    NgayGioHen DATETIME NOT NULL,
    TrangThai NVARCHAR(50) DEFAULT N'Đã đặt', -- Đã đặt, Đã xác nhận, Hoàn thành, Hủy
    TrieuChung NVARCHAR(500),
    GhiChu NVARCHAR(500),
    NgayTao DATETIME DEFAULT GETDATE()
);

-- =============================================
-- 6. QUẢN LÝ KHÁM BỆNH
-- =============================================

-- Bảng phiếu khám bệnh
CREATE TABLE PhieuKhamBenh (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaPhieuKham NVARCHAR(10) NOT NULL UNIQUE,
    IdBenhNhan INT FOREIGN KEY REFERENCES BenhNhan(Id),
    IdBacSi INT FOREIGN KEY REFERENCES BacSi(Id),
    IdLichHen INT FOREIGN KEY REFERENCES LichHen(Id),
    NgayKham DATETIME DEFAULT GETDATE(),
    
    -- Thông tin khám
    TrieuChung NVARCHAR(MAX),
    
    -- Sinh hiệu
    CanNang DECIMAL(5,2), -- kg
    ChieuCao DECIMAL(5,2), -- cm
    NhietDo DECIMAL(4,2), -- °C
    HuyetAp NVARCHAR(20), -- mmHg
    NhipTim INT, -- bpm
    
    -- Chẩn đoán
    ChanDoan NVARCHAR(MAX) NOT NULL,
    
    -- Xử trí
    DieuTri NVARCHAR(MAX),
    LoiDan NVARCHAR(MAX),
    NgayTaiKham DATE,
    
    TrangThai NVARCHAR(50) DEFAULT N'Hoàn thành',
    GhiChu NVARCHAR(MAX)
);

-- Bảng dịch vụ trong phiếu khám
CREATE TABLE ChiTietDichVu (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaChiTiet NVARCHAR(10) NOT NULL UNIQUE,
    IdPhieuKham INT FOREIGN KEY REFERENCES PhieuKhamBenh(Id),
    IdDichVu INT FOREIGN KEY REFERENCES DichVu(Id),
    SoLuong INT DEFAULT 1,
    DonGia DECIMAL(18,2) NOT NULL,
    ThanhTien AS (SoLuong * DonGia)
);

-- =============================================
-- 7. QUẢN LÝ XÉT NGHIỆM
-- =============================================

-- Bảng phiếu xét nghiệm
CREATE TABLE PhieuXetNghiem (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaPhieuXN NVARCHAR(10) NOT NULL UNIQUE,
    IdPhieuKham INT FOREIGN KEY REFERENCES PhieuKhamBenh(Id),
    IdDichVu INT FOREIGN KEY REFERENCES DichVu(Id),
    NgayChiDinh DATETIME DEFAULT GETDATE(),
    IdBacSi INT FOREIGN KEY REFERENCES BacSi(Id),
    TrangThai NVARCHAR(50) DEFAULT N'Chờ xét nghiệm', -- Chờ xét nghiệm, Đang thực hiện, Hoàn thành
    GhiChu NVARCHAR(500)
);

-- Bảng kết quả xét nghiệm
CREATE TABLE KetQuaXetNghiem (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaKetQua NVARCHAR(10) NOT NULL UNIQUE,
    IdPhieuXN INT FOREIGN KEY REFERENCES PhieuXetNghiem(Id),
    TenChiSo NVARCHAR(200) NOT NULL,
    KetQua NVARCHAR(500),
    DonVi NVARCHAR(50),
    ChiSoBinhThuong NVARCHAR(100),
    NgayCoKetQua DATETIME DEFAULT GETDATE()
);

-- =============================================
-- 8. QUẢN LÝ ĐƠN THUỐC
-- =============================================

-- Bảng đơn thuốc
CREATE TABLE DonThuoc (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaDonThuoc NVARCHAR(10) NOT NULL UNIQUE,
    IdPhieuKham INT FOREIGN KEY REFERENCES PhieuKhamBenh(Id),
    IdBenhNhan INT FOREIGN KEY REFERENCES BenhNhan(Id),
    IdBacSi INT FOREIGN KEY REFERENCES BacSi(Id),
    NgayKeDon DATETIME DEFAULT GETDATE(),
    TrangThai NVARCHAR(50) DEFAULT N'Chờ cấp thuốc', -- Chờ cấp thuốc, Đã cấp thuốc
    GhiChu NVARCHAR(500)
);

-- Bảng chi tiết đơn thuốc
CREATE TABLE ChiTietDonThuoc (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaChiTiet NVARCHAR(10) NOT NULL UNIQUE,
    IdDonThuoc INT FOREIGN KEY REFERENCES DonThuoc(Id),
    IdThuoc INT FOREIGN KEY REFERENCES Thuoc(Id),
    SoLuong INT NOT NULL,
    LieuLuong NVARCHAR(100), -- 1 viên x 3 lần/ngày
    CachDung NVARCHAR(200), -- Sau ăn, trước ăn
    SoNgayDung INT
);

-- =============================================
-- 9. QUẢN LÝ HÓA ĐƠN
-- =============================================

-- Bảng hóa đơn
CREATE TABLE HoaDon (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaHoaDon NVARCHAR(10) NOT NULL UNIQUE,
    IdBenhNhan INT FOREIGN KEY REFERENCES BenhNhan(Id),
    IdPhieuKham INT FOREIGN KEY REFERENCES PhieuKhamBenh(Id),
    NgayLapHoaDon DATETIME DEFAULT GETDATE(),
    
    TongTien DECIMAL(18,2) NOT NULL,
    GiamGia DECIMAL(18,2) DEFAULT 0,
    ThanhToan DECIMAL(18,2) NOT NULL,
    
    PhuongThucThanhToan NVARCHAR(50), -- Tiền mặt, Chuyển khoản, Thẻ
    TrangThai NVARCHAR(50) DEFAULT N'Đã thanh toán',
    
    IdNguoiTao INT FOREIGN KEY REFERENCES NguoiDung(Id),
    GhiChu NVARCHAR(500)
);

-- Bảng chi tiết hóa đơn
CREATE TABLE ChiTietHoaDon (
	Id INT PRIMARY KEY IDENTITY(1,1),
    MaChiTiet NVARCHAR(10) NOT NULL UNIQUE,
    IdHoaDon INT FOREIGN KEY REFERENCES HoaDon(Id),
    LoaiMuc NVARCHAR(50), -- Dịch vụ, Thuốc
    TenMuc NVARCHAR(200),
    SoLuong INT DEFAULT 1,
    DonGia DECIMAL(18,2) NOT NULL,
    ThanhTien DECIMAL(18,2) NOT NULL
);