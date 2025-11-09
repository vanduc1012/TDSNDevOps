import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../api/services';

function Header() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const isAdmin = authService.isAdmin();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <h1>Alonhatro</h1>
          <p className="header-tagline">Nâng tầm giá trị cuộc sống</p>
        </div>
        {!user ? (
          <nav className="header-nav">
            <Link to="/">Trang chủ</Link>
            <Link to="/rooms">Cho thuê phòng trọ</Link>
            <Link to="/houses">Nhà cho thuê</Link>
            <Link to="/apartments">Cho thuê căn hộ</Link>
            <Link to="/login" className="btn-header">
              <span>👤</span> Đăng nhập
            </Link>
            <Link to="/register" className="btn-header">
              <span>➕</span> Đăng ký
            </Link>
          </nav>
        ) : (
          <nav className="header-nav">
            <Link to="/">Trang chủ</Link>
            <Link to="/rooms">Cho thuê phòng trọ</Link>
            <Link to="/houses">Nhà cho thuê</Link>
            <Link to="/apartments">Cho thuê căn hộ</Link>
            {isAdmin && (
              <>
                <Link to="/admin/menu">Quản lý Menu</Link>
                <Link to="/admin/tables">Quản lý Bàn</Link>
                <Link to="/admin/orders">Quản lý Order</Link>
                <Link to="/admin/reports">Báo cáo</Link>
              </>
            )}
            {!isAdmin && (
              <>
                <Link to="/book-table">Đặt bàn</Link>
                <Link to="/my-orders">Đơn hàng của tôi</Link>
              </>
            )}
            <span style={{ color: '#fff' }}>{user.fullName}</span>
            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              Đăng xuất
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
