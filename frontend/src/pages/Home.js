import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [searchType, setSearchType] = useState('Phòng trọ - Cho thuê phòng trọ');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  
  // Banner carousel state
  const banners = [
    '/images/banners/banner1.jpg',
    '/images/banners/banner2.jpg',
    '/images/banners/banner3.jpg',
    '/images/banners/banner4.jpg',
    '/images/banners/banner5.jpg',
    '/images/banners/banner6.jpg'
  ];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // Auto-play banner carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // Chuyển banner mỗi 5 giây
    
    return () => clearInterval(interval);
  }, [banners.length]);
  
  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  };
  
  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };
  
  const goToBanner = (index) => {
    setCurrentBannerIndex(index);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', { searchType, city, district, price, area });
  };

  return (
    <div className="home-container">
      {/* Search Bar */}
      <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
            className="search-select"
          >
            <option>Phòng trọ - Cho thuê phòng trọ</option>
            <option>Nhà cho thuê</option>
            <option>Căn hộ cho thuê</option>
            <option>Mặt bằng cho thuê</option>
          </select>
          <select 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            className="search-select"
          >
            <option value="">Tỉnh, thành phố</option>
            <option value="hcm">Hồ Chí Minh</option>
            <option value="hanoi">Hà Nội</option>
            <option value="danang">Đà Nẵng</option>
          </select>
          <select 
            value={district} 
            onChange={(e) => setDistrict(e.target.value)}
            className="search-select"
          >
            <option value="">Quận, huyện</option>
          </select>
          <select 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            className="search-select"
          >
            <option value="">Mức giá</option>
            <option value="1-2">1 - 2 triệu/tháng</option>
            <option value="2-3">2 - 3 triệu/tháng</option>
            <option value="3-5">3 - 5 triệu/tháng</option>
            <option value="5+">Trên 5 triệu/tháng</option>
          </select>
          <select 
            value={area} 
            onChange={(e) => setArea(e.target.value)}
            className="search-select"
          >
            <option value="">Diện tích</option>
            <option value="15-20">15 - 20 m²</option>
            <option value="20-25">20 - 25 m²</option>
            <option value="25-30">25 - 30 m²</option>
            <option value="30+">Trên 30 m²</option>
          </select>
          <button type="submit" className="btn-search">
            🔍 TÌM KIẾM
          </button>
        </form>
        <Link to="/post" className="btn-post">
          ✏️ ĐĂNG TIN
        </Link>
      </div>

      {/* Banner Carousel */}
      <div className="banner-carousel">
        <div className="banner-slide">
          <img 
            key={currentBannerIndex}
            src={banners[currentBannerIndex]} 
            alt={`Banner ${currentBannerIndex + 1}`} 
            className="banner-image"
            onError={(e) => {
              // Fallback nếu không có ảnh
              e.target.style.display = 'none';
            }}
          />
        </div>
        <div className="banner-arrow banner-arrow-left" onClick={prevBanner} aria-label="Previous banner">‹</div>
        <div className="banner-arrow banner-arrow-right" onClick={nextBanner} aria-label="Next banner">›</div>
        <div className="banner-indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`banner-indicator ${index === currentBannerIndex ? 'active' : ''}`}
              onClick={() => goToBanner(index)}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Introduction */}
      <div className="intro-section">
        <h2>AloNha Tro - Kênh thông tin cho thuê bất động sản nhà trọ, phòng trọ hàng đầu Việt Nam</h2>
        <p>
          AloNha Tro là nền tảng kết nối người cho thuê và người tìm thuê phòng trọ, nhà trọ uy tín nhất Việt Nam. 
          Với hơn <strong>20.000+ tin đăng</strong> và <strong>1.000.000+ lượt truy cập</strong> mỗi tháng, 
          chúng tôi giúp bạn tìm được nơi ở phù hợp nhất với nhu cầu và ngân sách của mình.
        </p>
      </div>

      {/* Featured Cities */}
      <div className="featured-cities">
        <div className="city-card">
          <div className="city-label">Phòng trọ</div>
          <div className="city-image hcm-image"></div>
          <h3>HỒ CHÍ MINH</h3>
        </div>
        <div className="city-card">
          <div className="city-label">Phòng trọ</div>
          <div className="city-image hanoi-image"></div>
          <h3>HÀ NỘI</h3>
        </div>
        <div className="city-card">
          <div className="city-label">Phòng trọ</div>
          <div className="city-image danang-image"></div>
          <h3>ĐÀ NẴNG</h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-left">
          <div className="section-header">
            <h2 className="section-title">Tin đăng cho thuê mới nhất</h2>
            <div className="filter-tabs">
              <button className="tab active">Mặc định</button>
              <button className="tab">Mới nhất</button>
              <button className="tab">Giá từ thấp đến cao</button>
              <button className="tab">Giá từ cao đến thấp</button>
            </div>
          </div>

          {/* Listings */}
          <div className="listing-card">
            <div className="listing-badge vip vip-4">VIP 4</div>
            <div className="listing-image-wrapper">
              <div className="listing-image"></div>
              <span className="listing-image-count">8</span>
            </div>
            <div className="listing-content">
              <h3>Hot 2025!! Cho thuê phòng trọ sinh viên ĐH Công Nghiệp CS3 - Ninh Bình (Hà Nam cũ)</h3>
              <p className="listing-description">
                - Nhà trọ mới, đẹp, khép kín, thoáng mát, sạch sẽ, tiện nghi- Điện nước giá nhà nước, công tơ riêng từng phòng, chủ động theo dõi (Điện nước giá dân)-...
              </p>
              <div className="listing-meta">
                <span className="listing-author">👤 Bác Duyết</span>
                <span className="listing-date">🕒 2 tháng</span>
              </div>
              <div className="listing-footer">
                <span className="listing-price">1.8 Triệu/Tháng</span>
                <span className="listing-area">16 m²</span>
                <span className="listing-location">Thành Phố Phủ Lý, Hà Nam</span>
              </div>
            </div>
          </div>

          <div className="listing-card">
            <div className="listing-badge vip vip-4">VIP 4</div>
            <div className="listing-image-wrapper">
              <div className="listing-image"></div>
              <span className="listing-image-count">4</span>
            </div>
            <div className="listing-content">
              <h3>Phòng trọ T5 Chung Thang Bộ với chủ 3 triệu/30m2 Điện Nước giá Nhà Nước</h3>
              <p className="listing-description">
                Phòng trọ Xuân Đỉnh tầng 5 chung thang bộ với chủ nhà, gần công viên Hòa Bình 3 triệu/30m2, điện-nước giá nhà nước Cho TỐI ĐA 2 NGƯỜI (+ 1 TRẺ EM)...
              </p>
              <div className="listing-meta">
                <span className="listing-author">👤 ĐỖ ANH LỢI</span>
                <span className="listing-date">🕒 29/07/2025</span>
              </div>
              <div className="listing-footer">
                <span className="listing-price">3 Triệu/Tháng</span>
                <span className="listing-area">30 m²</span>
                <span className="listing-location">Huyện Bắc Từ Liêm, Hà Nội</span>
              </div>
            </div>
          </div>

          <div className="listing-card">
            <div className="listing-badge vip vip-4">VIP 4</div>
            <div className="listing-image-wrapper">
              <div className="listing-image"></div>
              <span className="listing-image-count">4</span>
            </div>
            <div className="listing-content">
              <h3>Cho NỮ thuê 02 căn Studio trống sẵn tại Vạn Xuân Villa Riverview 3Tr</h3>
              <p className="listing-description">
                👉 Cho NỮ thuê 02 căn Studio tại VẠN XUÂN VILLA RIVERVIEW 💰 3Tr Chủ thân thiện dễ tính, giá thật tình CHỐT, TẾT KHÔNG TÍNH TIỀN, Free Dịch VỤ 03...
              </p>
              <div className="listing-meta">
                <span className="listing-author">👤 Mr Phúc</span>
                <span className="listing-date">🕒 20/12/2024</span>
              </div>
              <div className="listing-footer">
                <span className="listing-price">3 Ngàn/tháng</span>
                <span className="listing-area">30 m²</span>
                <span className="listing-location">Quận 12, Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          <div className="listing-card">
            <div className="listing-badge vip vip-4">VIP 4</div>
            <div className="listing-image-wrapper">
              <div className="listing-image"></div>
              <span className="listing-image-count">6</span>
            </div>
            <div className="listing-content">
              <h3>Chính chủ cần cho thuê căn hộ tòa v3 - Home city 177 Trung Kính trung tâm Cầu Giấy</h3>
              <p className="listing-description">
                Chính chủ nhà mình cần cho thuê căn hộ 1402 - V3 Home city 177 Trung Kính vị trí đắc địa gần tòa Keangnam, đại học Phương Đông, THCS Cầu Giấy. Diện...
              </p>
              <div className="listing-meta">
                <span className="listing-author">👤 HOÀNG ĐỖ</span>
                <span className="listing-date">🕒</span>
              </div>
              <div className="listing-footer">
                <span className="listing-price">16 Triệu/Tháng</span>
                <span className="listing-area">69 m²</span>
                <span className="listing-location">Quận Cầu Giấy, Hà Nội</span>
              </div>
            </div>
          </div>

          <div className="listing-card">
            <div className="listing-badge vip vip-4">VIP 4</div>
            <div className="listing-image-wrapper">
              <div className="listing-image"></div>
              <span className="listing-image-count">5</span>
            </div>
            <div className="listing-content">
              <h3>cho thuê căn hộ 75m2 ngay phố đi bộ Q.1</h3>
              <p className="listing-description">
                Địa Chỉ : 39/11 Mạc Thị Bưởi, phường Bến Nghé, Quận 1. >>> Căn Hộ Nằm Trong Hẻm Ngay Ngã 4 Mạc Thị Bưởi – Đồng Khởi Khu Vực Trung Tâm Quận 1, Sau...
              </p>
              <div className="listing-meta">
                <span className="listing-author">👤 Bao Tran</span>
                <span className="listing-date">🕒 1 năm</span>
              </div>
              <div className="listing-footer">
                <span className="listing-price">8 Triệu/Tháng</span>
                <span className="listing-area">75 m²</span>
                <span className="listing-location">Quận 1, Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          <div className="listing-card">
            <div className="listing-badge vip vip-5">VIP 5</div>
            <div className="listing-image-wrapper">
              <div className="listing-image"></div>
              <span className="listing-image-count">3</span>
            </div>
            <div className="listing-content">
              <h3>Cho thuê nhà 5 tầng – ngõ ô tô tránh, vỉa hè rộng – 282 Lạc Long Quân</h3>
              <p className="listing-description">
                CHO THUÊ NHÀ 5 TẦNG – NGÕ Ô TÔ RỘNG, CÓ VỈA HÈ – 282 LẠC LONG QUÂN, PHƯỜNG TÂY HỒ, HÀ NỘI. Vị trí cực đẹp: Cách mặt nước Hồ Tây chỉ 50m, nhà 2...
              </p>
              <div className="listing-meta">
                <span className="listing-author">👤 Hoàng Gia Nguyễn</span>
                <span className="listing-date">🕒 3 ngày</span>
              </div>
              <div className="listing-footer">
                <span className="listing-price">Thoả thuận Triệu/Tháng</span>
                <span className="listing-area">36 m²</span>
                <span className="listing-location">Quận Tây Hồ, Hà Nội</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-sidebar">
          <div className="sidebar-section">
            <h3>Danh mục cho thuê</h3>
            <ul className="category-list">
              <li><Link to="/rooms">Cho thuê vỉa hè</Link></li>
              <li><Link to="/rooms">Phòng trọ - Cho thuê phòng trọ</Link></li>
              <li><Link to="/houses">Cho thuê nhà nguyên căn</Link></li>
              <li><Link to="/apartments">Cho thuê căn hộ</Link></li>
              <li><Link to="/spaces">Cho thuê mặt bằng</Link></li>
              <li><Link to="/share">Tìm người ở ghép</Link></li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>TIN MỚI ĐĂNG</h3>
            <div className="new-posts-container">
              {/* Phần này sẽ được thêm sau khi có chức năng đăng tin */}
              <p className="empty-message">Chưa có tin đăng mới</p>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-header-with-icon">
              <span className="header-icon">⚙️</span>
              TIN MỚI NHẤT
            </h3>
            <ul className="latest-news-list">
              <li className="news-item">
                <div className="news-thumbnail"></div>
                <div className="news-content">
                  <h4 className="news-title">Có nên mua nhà với giá cao hơn giá thị trường?</h4>
                  <div className="news-meta">
                    <span className="news-category">Chia sẻ kinh nghiệm</span>
                    <span className="news-timestamp">2024-10-04 10:10:40</span>
                  </div>
                </div>
              </li>
              <li className="news-item">
                <div className="news-thumbnail"></div>
                <div className="news-content">
                  <h4 className="news-title">Khu công nghiệp Tân Bình (Thông tin cập nhật mới)</h4>
                  <div className="news-meta">
                    <span className="news-category">Chia sẻ kinh nghiệm</span>
                    <span className="news-timestamp">2024-05-25 13:10:33</span>
                  </div>
                </div>
              </li>
              <li className="news-item">
                <div className="news-thumbnail"></div>
                <div className="news-content">
                  <h4 className="news-title">Nằm lòng bí quyết tìm thuê phòng trọ 1 người ở giá rẻ</h4>
                  <div className="news-meta">
                    <span className="news-category">Chia sẻ kinh nghiệm</span>
                    <span className="news-timestamp">2024-05-25 13:10:33</span>
                  </div>
                </div>
              </li>
              <li className="news-item">
                <div className="news-thumbnail"></div>
                <div className="news-content">
                  <h4 className="news-title">Đường vành đai là gì? Đường vành đai có Chức Năng Mục Đích Gì</h4>
                  <div className="news-meta">
                    <span className="news-category">Thị trường nhà đất</span>
                    <span className="news-timestamp">2024-05-25 13:10:33</span>
                  </div>
                </div>
              </li>
              <li className="news-item">
                <div className="news-thumbnail"></div>
                <div className="news-content">
                  <h4 className="news-title">Mách Bạn Bí Quyết hướng đặt giường ngủ Giường Ngủ Đúng Phong Thủy</h4>
                  <div className="news-meta">
                    <span className="news-category">Phong thuỷ</span>
                    <span className="news-timestamp">2024-05-25 13:10:33</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-header-with-icon">BÀI VIẾT BẠN NÊN QUAN TÂM</h3>
            <ul className="latest-news-list">
              <li className="news-item">
                <div className="news-thumbnail"></div>
                <div className="news-content">
                  <h4 className="news-title">Hợp đồng thuê phòng trọ gồm những nội dung nào?</h4>
                  <div className="news-meta">
                    <span className="news-category">Thị trường nhà đất</span>
                    <span className="news-timestamp">2024-05-25 13:10:33</span>
                  </div>
                </div>
              </li>
              <li className="news-item">
                <div className="news-thumbnail"></div>
                <div className="news-content">
                  <h4 className="news-title">Thủ tục đăng ký tạm trú cho người ở nhà trọ đầy đủ, chi tiết nhất</h4>
                  <div className="news-meta">
                    <span className="news-category">Chia sẻ kinh nghiệm</span>
                    <span className="news-timestamp">2024-05-06 13:10:33</span>
                  </div>
                </div>
              </li>
              <li className="news-item">
                <div className="news-thumbnail"></div>
                <div className="news-content">
                  <h4 className="news-title">Cần Thân Các Kiểu Lừa Đảo Khi Thuê Phòng Trọ</h4>
                  <div className="news-meta">
                    <span className="news-category">Thị trường nhà đất</span>
                    <span className="news-timestamp">2024-05-06 13:10:33</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
