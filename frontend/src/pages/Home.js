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

          {/* Sample Listing */}
          <div className="listing-card">
            <div className="listing-badge vip">VIP 1</div>
            <div className="listing-image"></div>
            <div className="listing-content">
              <h3>PHÒNG TRỌ MỚI XÂY RẤT ĐẸP, GIỜ GIÁC TỰ DO, GẦN LOTTE Q.7</h3>
              <p className="listing-description">
                Thông tin chi tiết - Cho thuê phòng trọ mới xây ngay Khu dân cư Trung Sơn (khu biệt thự nên...
              </p>
              <div className="listing-meta">
                <span>👤 05/05/2023</span>
              </div>
              <div className="listing-footer">
                <span className="listing-price">2 Triệu/Tháng</span>
                <span className="listing-area">25 m²</span>
                <span className="listing-location">Quận 7, Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          {/* More listings can be added here */}
        </div>

        <div className="content-sidebar">
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
      </div>
    </div>
  );
}

export default Home;
