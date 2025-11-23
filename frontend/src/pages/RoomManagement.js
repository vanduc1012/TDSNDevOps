import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    title: '',
    description: '',
    price: '',
    area: '',
    address: '',
    district: '',
    city: '',
    ward: '',
    amenities: [],
    images: [],
    status: 'AVAILABLE',
    isActive: true,
    capacity: '',
    direction: '',
    floor: '',
    hasElevator: false,
    hasParking: false
  });
  const [newAmenity, setNewAmenity] = useState('');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const response = await api.get('/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error loading rooms:', error);
      alert('Lỗi khi tải danh sách phòng');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area),
        capacity: parseInt(formData.capacity),
        floor: formData.floor ? parseInt(formData.floor) : null
      };

      if (editingRoom) {
        await api.put(`/rooms/${editingRoom.id}`, submitData);
      } else {
        await api.post('/rooms', submitData);
      }
      setShowModal(false);
      resetForm();
      loadRooms();
      alert('Lưu phòng thành công!');
    } catch (error) {
      alert('Lỗi khi lưu phòng: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNumber: room.roomNumber || '',
      title: room.title || '',
      description: room.description || '',
      price: room.price?.toString() || '',
      area: room.area?.toString() || '',
      address: room.address || '',
      district: room.district || '',
      city: room.city || '',
      ward: room.ward || '',
      amenities: room.amenities || [],
      images: room.images || [],
      status: room.status || 'AVAILABLE',
      isActive: room.isActive !== undefined ? room.isActive : true,
      capacity: room.capacity?.toString() || '',
      direction: room.direction || '',
      floor: room.floor?.toString() || '',
      hasElevator: room.hasElevator || false,
      hasParking: room.hasParking || false
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa phòng này?')) {
      try {
        await api.delete(`/rooms/${id}`);
        loadRooms();
        alert('Xóa phòng thành công!');
      } catch (error) {
        alert('Lỗi khi xóa phòng');
      }
    }
  };

  const handleToggleVisibility = async (id) => {
    try {
      await api.patch(`/rooms/${id}/toggle-visibility`);
      loadRooms();
    } catch (error) {
      alert('Lỗi khi cập nhật trạng thái');
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, newAmenity.trim()]
      });
      setNewAmenity('');
    }
  };

  const removeAmenity = (index) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index)
    });
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImage.trim()]
      });
      setNewImage('');
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const resetForm = () => {
    setFormData({
      roomNumber: '',
      title: '',
      description: '',
      price: '',
      area: '',
      address: '',
      district: '',
      city: '',
      ward: '',
      amenities: [],
      images: [],
      status: 'AVAILABLE',
      isActive: true,
      capacity: '',
      direction: '',
      floor: '',
      hasElevator: false,
      hasParking: false
    });
    setEditingRoom(null);
    setNewAmenity('');
    setNewImage('');
  };

  const getStatusBadge = (status) => {
    const badges = {
      AVAILABLE: { text: 'Còn trống', class: 'badge-available' },
      OCCUPIED: { text: 'Đã thuê', class: 'badge-cancelled' },
      RESERVED: { text: 'Đã đặt', class: 'badge-warning' },
      MAINTENANCE: { text: 'Bảo trì', class: 'badge-warning' },
      UNAVAILABLE: { text: 'Không cho thuê', class: 'badge-cancelled' }
    };
    const badge = badges[status] || badges.AVAILABLE;
    return <span className={`badge ${badge.class}`}>{badge.text}</span>;
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <Link to="/admin" style={{ color: '#666', textDecoration: 'none', marginRight: '1rem' }}>
              ← Quay lại Trang Quản Trị
            </Link>
            <h2 style={{ marginTop: '0.5rem' }}>Quản Lý Phòng Trọ</h2>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            + Thêm Phòng Mới
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Số phòng</th>
                <th>Tiêu đề</th>
                <th>Giá/tháng</th>
                <th>Diện tích</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th>Hiển thị</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.title}</td>
                  <td>{room.price?.toLocaleString('vi-VN')} ₫</td>
                  <td>{room.area} m²</td>
                  <td>{room.address}</td>
                  <td>{getStatusBadge(room.status)}</td>
                  <td>
                    <span className={`badge ${room.isActive ? 'badge-available' : 'badge-cancelled'}`}>
                      {room.isActive ? 'Hiển thị' : 'Ẩn'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => handleEdit(room)} style={{ marginRight: '0.5rem' }}>
                      Sửa
                    </button>
                    <button 
                      className="btn btn-warning" 
                      onClick={() => handleToggleVisibility(room.id)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      {room.isActive ? 'Ẩn' : 'Hiện'}
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(room.id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2>{editingRoom ? 'Sửa Phòng Trọ' : 'Thêm Phòng Trọ Mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Số phòng *</label>
                  <input
                    type="text"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Giá thuê/tháng (₫) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tiêu đề *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mô tả chi tiết</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Diện tích (m²) *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số người ở tối đa</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Tầng</label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Địa chỉ *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Phường/Xã</label>
                  <input
                    type="text"
                    value={formData.ward}
                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Quận/Huyện</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Thành phố</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Hướng phòng</label>
                <select
                  value={formData.direction}
                  onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                >
                  <option value="">Chọn hướng</option>
                  <option value="Đông">Đông</option>
                  <option value="Tây">Tây</option>
                  <option value="Nam">Nam</option>
                  <option value="Bắc">Bắc</option>
                  <option value="Đông Nam">Đông Nam</option>
                  <option value="Đông Bắc">Đông Bắc</option>
                  <option value="Tây Nam">Tây Nam</option>
                  <option value="Tây Bắc">Tây Bắc</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tiện nghi</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="VD: Wifi, Điều hòa, Máy nước nóng..."
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="btn btn-secondary" onClick={addAmenity}>
                    Thêm
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {formData.amenities.map((amenity, index) => (
                    <span key={index} className="badge badge-available" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {amenity}
                      <button
                        type="button"
                        onClick={() => removeAmenity(index)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>URL Ảnh</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Nhập URL ảnh"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="btn btn-secondary" onClick={addImage}>
                    Thêm
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' }}>
                  {formData.images.map((image, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img src={image} alt={`Room ${index + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="AVAILABLE">Còn trống</option>
                    <option value="OCCUPIED">Đã thuê</option>
                    <option value="RESERVED">Đã đặt</option>
                    <option value="MAINTENANCE">Bảo trì</option>
                    <option value="UNAVAILABLE">Không cho thuê</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      style={{ marginRight: '0.5rem' }}
                    />
                    Hiển thị trên website
                  </label>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.hasElevator}
                      onChange={(e) => setFormData({ ...formData, hasElevator: e.target.checked })}
                      style={{ marginRight: '0.5rem' }}
                    />
                    Có thang máy
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.hasParking}
                      onChange={(e) => setFormData({ ...formData, hasParking: e.target.checked })}
                      style={{ marginRight: '0.5rem' }}
                    />
                    Có chỗ để xe
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomManagement;

