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
  const [verificationCode, setVerificationCode] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [error, setError] = useState('');

  function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptcha('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    // Tự động thêm +84 nếu chưa có
    if (value && !value.startsWith('+84')) {
      value = '+84' + value.replace(/^\+84/, '');
    }
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captcha.toLowerCase() !== captchaCode.toLowerCase()) {
      setError('Mã xác nhận không đúng. Vui lòng thử lại.');
      refreshCaptcha();
      return;
    }
    try {
      // Sử dụng phone làm username nếu không có username
      const submitData = {
        ...formData,
        username: formData.username || formData.phone.replace(/^\+84/, ''),
      };
      await authService.register(submitData);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
      refreshCaptcha();
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
          <p className="register-instruction">
            Bạn sẽ nhận được mã xác nhận gửi đến Email đăng ký để kích hoạt tài khoản
          </p>
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="alert alert-error">{error}</div>}
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
                  value={formData.phone.replace(/^\+84/, '')}
                  onChange={handlePhoneChange}
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
            <div className="form-group">
              <label>Mã xác nhận</label>
              <input
                type="text"
                placeholder="Mã xác nhận"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Captcha</label>
              <div className="captcha-group">
                <input
                  type="text"
                  placeholder="Captcha"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
                <div className="captcha-display" onClick={refreshCaptcha}>
                  <span>{captchaCode}</span>
                  <span className="captcha-refresh">🔄</span>
                </div>
              </div>
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
