import React, { useState } from 'react';
import { authService } from '../api/services';
import { Link } from 'react-router-dom';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captcha.toLowerCase() !== captchaCode.toLowerCase()) {
      setError('Mã xác nhận không đúng. Vui lòng thử lại.');
      refreshCaptcha();
      return;
    }
    try {
      // Sử dụng phone làm username tạm thời (backend vẫn dùng username)
      await authService.login(phone, password);
      window.location.href = '/';
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      refreshCaptcha();
    }
  };

  const handleFacebookLogin = () => {
    alert('Tính năng đăng nhập bằng Facebook đang được phát triển');
  };

  const handleGoogleLogin = () => {
    alert('Tính năng đăng nhập bằng Google đang được phát triển');
  };

  return (
    <div className="auth-container">
      <div className="login-wrapper">
        <div className="login-form-section">
          <h2 className="login-title">Đăng nhập tài khoản đăng tin</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-group">
              <label>Số điện thoại (*)</label>
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Nhập mật khẩu (*)</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Mã xác nhận (*)</label>
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
              <button type="submit" className="btn btn-primary btn-login">
                <span className="btn-icon">👤</span>
                ĐĂNG NHẬP
              </button>
              <Link to="/register" className="btn btn-secondary btn-register">
                <span className="btn-icon">➕</span>
                ĐĂNG KÝ TÀI KHOẢN
              </Link>
            </div>
            <p className="forgot-password">
              Bạn quên mật khẩu? <Link to="/forgot-password" className="link-red">Lấy lại mật khẩu</Link>
            </p>
          </form>
        </div>
        <div className="login-divider">
          <span>Hoặc</span>
        </div>
        <div className="social-login-section">
          <h3>Đăng nhập tài khoản mới bằng Facebook / Google</h3>
          <button type="button" className="btn btn-facebook" onClick={handleFacebookLogin}>
            <span className="social-icon">f</span>
            Đăng nhập bằng Facebook
          </button>
          <button type="button" className="btn btn-google" onClick={handleGoogleLogin}>
            <span className="social-icon">G+</span>
            Đăng nhập bằng Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
