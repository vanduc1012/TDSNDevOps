import React, { useState } from 'react';
import { authService } from '../api/services';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    // Chỉ lưu số, không lưu +84 trong state
    value = value.replace(/\D/g, ''); // Chỉ giữ lại số
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    setSuccess(false); // Clear previous success
    try {
      // Sử dụng số điện thoại làm username (phone đã không có +84)
      const submitData = {
        username: formData.username || formData.phone,
        password: formData.password,
        fullName: formData.fullName,
        email: formData.email || '',
        phone: '+84' + formData.phone, // Thêm +84 khi gửi lên server
      };
      const response = await authService.register(submitData);
      if (response.token) {
        // Đăng ký thành công, hiển thị thông báo và KHÔNG tự động chuyển trang
        setSuccess(true);
        // Xóa form sau khi đăng ký thành công (tùy chọn)
        // setFormData({ username: '', password: '', fullName: '', email: '', phone: '' });
      }
    } catch (err) {
      console.error('Registration error:', err);
      // Xử lý các loại lỗi khác nhau
      if (err.response) {
        // Lỗi từ server
        const errorMessage = err.response.data?.message || err.response.data?.error || err.response.data;
        if (typeof errorMessage === 'string') {
          // Kiểm tra nếu là lỗi trùng thông tin
          if (errorMessage.includes('already exists') || 
              errorMessage.includes('đã tồn tại') ||
              errorMessage.includes('Username already exists') ||
              errorMessage.includes('Email already exists')) {
            if (errorMessage.includes('Username')) {
              setError('Số điện thoại này đã được sử dụng. Vui lòng sử dụng số điện thoại khác.');
            } else if (errorMessage.includes('Email')) {
              setError('Email này đã được sử dụng. Vui lòng sử dụng email khác.');
            } else {
              setError('Thông tin đã tồn tại trong hệ thống. Vui lòng kiểm tra lại.');
            }
          } else {
            setError(errorMessage);
          }
        } else {
          setError('Đăng ký thất bại. Vui lòng thử lại.');
        }
      } else if (err.request) {
        // Không nhận được response từ server
        console.error('Network error:', err.request);
        setError('Không thể kết nối đến server. Vui lòng thử lại sau.');
      } else {
        // Lỗi khác
        setError('Đăng ký thất bại. Vui lòng thử lại.');
      }
    }
  };

  const handleFacebookRegister = () => {
    alert('Tính năng đăng ký bằng Facebook đang được phát triển');
  };

  const handleGoogleRegister = () => {
    alert('Tính năng đăng ký bằng Google đang được phát triển');
  };

  return (
    <div className="auth-container">
      <div className="login-wrapper">
        <div className="login-form-section">
          <h2 className="login-title">Tạo tài khoản mới đăng tin</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.</div>}
            <div className="form-group">
              <label>Họ tên của bạn(*)</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email(*)</label>
              <input
                type="email"
                name="email"
                placeholder="Email tài khoản"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại(*)</label>
              <div className="phone-input-group">
                <span className="phone-prefix">+84</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Nhập số điện thoại"
                  required
                  className="phone-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Tạo mật khẩu(*)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-register-account">
                <span className="btn-icon">👤</span>
                ĐĂNG KÝ TÀI KHOẢN
              </button>
              <Link to="/login" className="btn btn-primary btn-login">
                <span className="btn-icon">👤</span>
                ĐĂNG NHẬP
              </Link>
            </div>
            <p className="terms-text">
              Bấm vào nút đăng ký tức là bạn đã đồng ý với{' '}
              <Link to="/terms" className="link-blue">quy định sử dụng</Link> của chúng tôi
            </p>
          </form>
        </div>
        <div className="login-divider">
          <span>Hoặc</span>
        </div>
        <div className="social-login-section">
          <h3>Đăng nhập tài khoản mới bằng Facebook / Google</h3>
          <button type="button" className="btn btn-facebook" onClick={handleFacebookRegister}>
            <span className="social-icon">f</span>
            Đăng ký bằng Facebook
          </button>
          <button type="button" className="btn btn-google" onClick={handleGoogleRegister}>
            <span className="social-icon">G+</span>
            Đăng ký bằng Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
