import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../api/services';

function AdminDashboard() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const adminMenuItems = [
    {
      title: 'Quản Lý Phòng Trọ',
      description: 'Thêm, sửa, xóa, ẩn/hiện phòng trọ. Cập nhật giá, diện tích, tiện nghi, ảnh',
      icon: '🏠',
      path: '/admin/rooms',
      color: '#2196F3'
    },
    {
      title: 'Duyệt Bài Đăng',
      description: 'Duyệt bài đăng, kiểm duyệt nội dung, xử lý spam và vi phạm',
      icon: '✅',
      path: '/admin/posts',
      color: '#4CAF50'
    },
    {
      title: 'Quản Lý Người Dùng',
      description: 'Xem danh sách, khóa tài khoản, reset mật khẩu',
      icon: '👥',
      path: '/admin/users',
      color: '#FF5722'
    },
    {
      title: 'Quản Lý Đặt Phòng',
      description: 'Xem đơn đặt phòng, duyệt/từ chối, xử lý giao dịch',
      icon: '📋',
      path: '/admin/bookings',
      color: '#FF9800'
    },
    {
      title: 'Quản Lý Đánh Giá',
      description: 'Xóa đánh giá vi phạm, xử lý báo cáo xấu',
      icon: '⭐',
      path: '/admin/reviews',
      color: '#FFC107'
    },
    {
      title: 'Quản Lý Sản Phẩm/Dịch Vụ',
      description: 'Thêm, sửa, xóa các sản phẩm và dịch vụ',
      icon: '📦',
      path: '/admin/menu',
      color: '#9C27B0'
    },
    {
      title: 'Quản Lý Tin Tức',
      description: 'Thêm bài viết, hướng dẫn, nội dung SEO',
      icon: '📰',
      path: '/admin/news',
      color: '#00BCD4'
    },
    {
      title: 'Báo Cáo & Thống Kê',
      description: 'Xem báo cáo doanh thu, thống kê người dùng, xu hướng',
      icon: '📊',
      path: '/admin/reports',
      color: '#9C27B0'
    }
  ];

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Trang Quản Trị</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Chào mừng, <strong>{user?.fullName || user?.username}</strong>! 
          Bạn đang quản lý hệ thống Quản Lý Trọ.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {adminMenuItems.map((item, index) => (
          <Link 
            key={index}
            to={item.path}
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div 
              className="card"
              style={{
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: `2px solid ${item.color}`,
                borderRadius: '12px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #fff 0%, #f5f5f5 100%)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              <div>
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {item.icon}
                </div>
                <h2 style={{ 
                  color: item.color, 
                  marginBottom: '0.5rem',
                  fontSize: '1.5rem'
                }}>
                  {item.title}
                </h2>
                <p style={{ 
                  color: '#666', 
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {item.description}
                </p>
              </div>
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: `1px solid ${item.color}`,
                textAlign: 'center',
                color: item.color,
                fontWeight: 'bold'
              }}>
                Truy cập →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem', background: '#f8f9fa' }}>
        <h3 style={{ marginBottom: '1rem' }}>Thông Tin Tài Khoản</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <strong>Tên đăng nhập:</strong>
            <p>{user?.username}</p>
          </div>
          <div>
            <strong>Họ tên:</strong>
            <p>{user?.fullName || 'Chưa cập nhật'}</p>
          </div>
          <div>
            <strong>Email:</strong>
            <p>{user?.email || 'Chưa cập nhật'}</p>
          </div>
          <div>
            <strong>Vai trò:</strong>
            <p>
              <span className="badge badge-available" style={{ fontSize: '0.9rem' }}>
                {user?.role === 'ADMIN' ? 'Quản trị viên' : 'Người dùng'}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem', background: '#fff3cd', border: '1px solid #ffc107' }}>
        <h3 style={{ marginBottom: '0.5rem', color: '#856404' }}>💡 Hướng Dẫn Sử Dụng</h3>
        <ul style={{ color: '#856404', lineHeight: '1.8' }}>
          <li><strong>Quản Lý Sản Phẩm/Dịch Vụ:</strong> Thêm các dịch vụ như internet, điện, nước, giặt ủi...</li>
          <li><strong>Quản Lý Phòng Trọ:</strong> Thêm thông tin các phòng trọ, số phòng, giá thuê, trạng thái...</li>
          <li><strong>Quản Lý Đơn Hàng:</strong> Xem và xử lý các đơn đặt phòng của khách hàng</li>
          <li><strong>Báo Cáo:</strong> Xem thống kê doanh thu, số lượng đơn hàng theo ngày/tháng</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;

