import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [searchType, setSearchType] = useState('Phòng trọ - Cho thuê phòng trọ');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [filteredPrice, setFilteredPrice] = useState('');
  const [filteredCity, setFilteredCity] = useState('');
  const [filteredDistrict, setFilteredDistrict] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Districts data by city
  const districtsByCity = {
    hcm: [
      { value: 'quan1', label: 'Quận 1' },
      { value: 'quan3', label: 'Quận 3' },
      { value: 'quan7', label: 'Quận 7' },
      { value: 'quan12', label: 'Quận 12' },
      { value: 'binhthanh', label: 'Quận Bình Thạnh' },
      { value: 'tanbinh', label: 'Quận Tân Bình' },
      { value: 'phunhuan', label: 'Quận Phú Nhuận' },
      { value: 'govap', label: 'Quận Gò Vấp' }
    ],
    hanoi: [
      { value: 'caugiay', label: 'Quận Cầu Giấy' },
      { value: 'tayho', label: 'Quận Tây Hồ' },
      { value: 'bactuliem', label: 'Huyện Bắc Từ Liêm' },
      { value: 'dongda', label: 'Quận Đống Đa' },
      { value: 'haibatrung', label: 'Quận Hai Bà Trưng' },
      { value: 'hoankiem', label: 'Quận Hoàn Kiếm' },
      { value: 'thanhxuan', label: 'Quận Thanh Xuân' },
      { value: 'longbien', label: 'Quận Long Biên' }
    ],
    danang: [
      { value: 'haichau', label: 'Quận Hải Châu' },
      { value: 'thanhkhe', label: 'Quận Thanh Khê' },
      { value: 'sontra', label: 'Quận Sơn Trà' },
      { value: 'nguhanhson', label: 'Quận Ngũ Hành Sơn' },
      { value: 'lienchieu', label: 'Quận Liên Chiểu' },
      { value: 'camle', label: 'Quận Cẩm Lệ' },
      { value: 'hoavang', label: 'Huyện Hòa Vang' }
    ]
  };
  
  // Get districts for selected city
  const getDistrictsForCity = (cityValue) => {
    return districtsByCity[cityValue] || [];
  };
  
  // Handle city change
  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    setDistrict(''); // Reset district when city changes
  };
  
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
  
  // Listings data
  const allListings = [
    {
      id: 1,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh1.jpg',
      imageCount: 8,
      alt: 'Hot 2025!! Cho thuê phòng trọ sinh viên ĐH Công Nghiệp CS3',
      title: 'Hot 2025!! Cho thuê phòng trọ sinh viên ĐH Công Nghiệp CS3 - Ninh Bình (Hà Nam cũ)',
      description: '- Nhà trọ mới, đẹp, khép kín, thoáng mát, sạch sẽ, tiện nghi- Điện nước giá nhà nước, công tơ riêng từng phòng, chủ động theo dõi (Điện nước giá dân)-...',
      author: '👤 Bác Duyết',
      date: '🕒 2 tháng',
      price: 1.8,
      priceText: '1.8 Triệu/Tháng',
      area: 16,
      areaText: '16 m²',
      location: 'Thành Phố Phủ Lý, Hà Nam',
      city: '',
      district: ''
    },
    {
      id: 2,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh2.jpg',
      imageCount: 4,
      alt: 'Phòng trọ T5 Chung Thang Bộ với chủ',
      title: 'Phòng trọ T5 Chung Thang Bộ với chủ 3 triệu/30m2 Điện Nước giá Nhà Nước',
      description: 'Phòng trọ Xuân Đỉnh tầng 5 chung thang bộ với chủ nhà, gần công viên Hòa Bình 3 triệu/30m2, điện-nước giá nhà nước Cho TỐI ĐA 2 NGƯỜI (+ 1 TRẺ EM)...',
      author: '👤 ĐỖ ANH LỢI',
      date: '🕒 29/07/2025',
      price: 3,
      priceText: '3 Triệu/Tháng',
      area: 30,
      areaText: '30 m²',
      location: 'Huyện Bắc Từ Liêm, Hà Nội',
      city: 'hanoi',
      district: 'bactuliem'
    },
    {
      id: 3,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh3.jpg',
      imageCount: 4,
      alt: 'Cho NỮ thuê 02 căn Studio trống sẵn tại Vạn Xuân Villa Riverview',
      title: 'Cho NỮ thuê 02 căn Studio trống sẵn tại Vạn Xuân Villa Riverview 3Tr',
      description: '👉 Cho NỮ thuê 02 căn Studio tại VẠN XUÂN VILLA RIVERVIEW 💰 3Tr Chủ thân thiện dễ tính, giá thật tình CHỐT, TẾT KHÔNG TÍNH TIỀN, Free Dịch VỤ 03...',
      author: '👤 Mr Phúc',
      date: '🕒 20/12/2024',
      price: 3,
      priceText: '3 Triệu/Tháng',
      area: 30,
      areaText: '30 m²',
      location: 'Quận 12, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan12'
    },
    {
      id: 4,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh4.jpg',
      imageCount: 6,
      alt: 'Chính chủ cần cho thuê căn hộ tòa v3 - Home city 177 Trung Kính',
      title: 'Chính chủ cần cho thuê căn hộ tòa v3 - Home city 177 Trung Kính trung tâm Cầu Giấy',
      description: 'Chính chủ nhà mình cần cho thuê căn hộ 1402 - V3 Home city 177 Trung Kính vị trí đắc địa gần tòa Keangnam, đại học Phương Đông, THCS Cầu Giấy. Diện...',
      author: '👤 HOÀNG ĐỖ',
      date: '🕒',
      price: 16,
      priceText: '16 Triệu/Tháng',
      area: 69,
      areaText: '69 m²',
      location: 'Quận Cầu Giấy, Hà Nội',
      city: 'hanoi',
      district: 'caugiay'
    },
    {
      id: 5,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh5.jpg',
      imageCount: 5,
      alt: 'cho thuê căn hộ 75m2 ngay phố đi bộ Q.1',
      title: 'cho thuê căn hộ 75m2 ngay phố đi bộ Q.1',
      description: 'Địa Chỉ : 39/11 Mạc Thị Bưởi, phường Bến Nghé, Quận 1. >>> Căn Hộ Nằm Trong Hẻm Ngay Ngã 4 Mạc Thị Bưởi – Đồng Khởi Khu Vực Trung Tâm Quận 1, Sau...',
      author: '👤 Bao Tran',
      date: '🕒 1 năm',
      price: 8,
      priceText: '8 Triệu/Tháng',
      area: 75,
      areaText: '75 m²',
      location: 'Quận 1, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan1'
    },
    {
      id: 6,
      vip: 'vip-5',
      vipLevel: 'VIP 5',
      image: '/images/room/anh6.jpg',
      imageCount: 3,
      alt: 'Cho thuê nhà 5 tầng – ngõ ô tô tránh, vỉa hè rộng – 282 Lạc Long Quân',
      title: 'Cho thuê nhà 5 tầng – ngõ ô tô tránh, vỉa hè rộng – 282 Lạc Long Quân',
      description: 'CHO THUÊ NHÀ 5 TẦNG – NGÕ Ô TÔ RỘNG, CÓ VỈA HÈ – 282 LẠC LONG QUÂN, PHƯỜNG TÂY HỒ, HÀ NỘI. Vị trí cực đẹp: Cách mặt nước Hồ Tây chỉ 50m, nhà 2...',
      author: '👤 Hoàng Gia Nguyễn',
      date: '🕒 3 ngày',
      price: null, // Thoả thuận
      priceText: 'Thoả thuận Triệu/Tháng',
      area: 36,
      areaText: '36 m²',
      location: 'Quận Tây Hồ, Hà Nội',
      city: 'hanoi',
      district: 'tayho'
    },
    {
      id: 7,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh7.jpg',
      imageCount: 7,
      alt: 'Cho thuê phòng trọ đẹp, tiện nghi, giá rẻ',
      title: 'Cho thuê phòng trọ đẹp, tiện nghi, giá rẻ tại trung tâm thành phố',
      description: 'Phòng trọ mới xây, đầy đủ tiện nghi, gần trường học, bệnh viện, chợ. Điện nước giá dân, wifi miễn phí, an ninh tốt. Phù hợp cho sinh viên, công nhân...',
      author: '👤 Nguyễn Văn A',
      date: '🕒 5 ngày',
      price: 2.5,
      priceText: '2.5 Triệu/Tháng',
      area: 25,
      areaText: '25 m²',
      location: 'Quận 1, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan1'
    },
    {
      id: 8,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh8.jpg',
      imageCount: 8,
      alt: 'Cho thuê căn hộ studio hiện đại, view đẹp',
      title: 'Cho thuê căn hộ studio hiện đại, view đẹp, nội thất đầy đủ',
      description: 'Căn hộ studio mới, nội thất đầy đủ, view đẹp, gần trung tâm thương mại, siêu thị. Phù hợp cho người đi làm, cặp đôi. Giá cả hợp lý, chủ nhà dễ tính...',
      author: '👤 Trần Thị B',
      date: '🕒 1 tuần',
      price: 5,
      priceText: '5 Triệu/Tháng',
      area: 35,
      areaText: '35 m²',
      location: 'Quận 3, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan3'
    },
    {
      id: 9,
      vip: 'vip-5',
      vipLevel: 'VIP 5',
      image: '/images/room/anh9.jpg',
      imageCount: 9,
      alt: 'Cho thuê nhà nguyên căn 2 tầng, sân vườn rộng',
      title: 'Cho thuê nhà nguyên căn 2 tầng, sân vườn rộng, thoáng mát',
      description: 'Nhà nguyên căn 2 tầng, 3 phòng ngủ, 2 phòng tắm, sân vườn rộng, thoáng mát. Gần trường học, bệnh viện, chợ. Phù hợp cho gia đình có trẻ nhỏ...',
      author: '👤 Lê Văn C',
      date: '🕒 2 tuần',
      price: 12,
      priceText: '12 Triệu/Tháng',
      area: 80,
      areaText: '80 m²',
      location: 'Quận 7, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan7'
    },
    {
      id: 10,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh10.jpg',
      imageCount: 5,
      alt: 'Cho thuê phòng trọ giá rẻ Quận 1',
      title: 'Cho thuê phòng trọ giá rẻ Quận 1, gần trung tâm',
      description: 'Phòng trọ sạch sẽ, thoáng mát, có điều hòa, wifi miễn phí. Gần chợ, siêu thị, bệnh viện. Phù hợp cho sinh viên, công nhân...',
      author: '👤 Nguyễn Thị D',
      date: '🕒 1 ngày',
      price: 1.5,
      priceText: '1.5 Triệu/Tháng',
      area: 20,
      areaText: '20 m²',
      location: 'Quận 1, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan1'
    },
    {
      id: 11,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh11.jpg',
      imageCount: 6,
      alt: 'Cho thuê phòng trọ Quận 3',
      title: 'Cho thuê phòng trọ Quận 3, đường rộng, xe máy vào được',
      description: 'Phòng trọ mới, có gác lửng, điều hòa, nóng lạnh. Gần trường học, bệnh viện. Điện nước giá dân, wifi miễn phí...',
      author: '👤 Trần Văn E',
      date: '🕒 3 ngày',
      price: 2.2,
      priceText: '2.2 Triệu/Tháng',
      area: 22,
      areaText: '22 m²',
      location: 'Quận 3, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan3'
    },
    {
      id: 12,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh12.jpg',
      imageCount: 4,
      alt: 'Cho thuê căn hộ mini Quận 7',
      title: 'Cho thuê căn hộ mini Quận 7, nội thất đầy đủ',
      description: 'Căn hộ mini mới, nội thất đầy đủ, có ban công, view đẹp. Gần trung tâm thương mại, siêu thị. Phù hợp cho cặp đôi...',
      author: '👤 Lê Thị F',
      date: '🕒 4 ngày',
      price: 4.5,
      priceText: '4.5 Triệu/Tháng',
      area: 32,
      areaText: '32 m²',
      location: 'Quận 7, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan7'
    },
    {
      id: 13,
      vip: 'vip-5',
      vipLevel: 'VIP 5',
      image: '/images/room/anh13.jpg',
      imageCount: 7,
      alt: 'Cho thuê nhà nguyên căn Hà Nội',
      title: 'Cho thuê nhà nguyên căn 3 tầng, ngõ rộng, ô tô vào được',
      description: 'Nhà nguyên căn 3 tầng, 4 phòng ngủ, 3 phòng tắm, sân thượng. Gần trường học, bệnh viện. Phù hợp cho gia đình...',
      author: '👤 Phạm Văn G',
      date: '🕒 5 ngày',
      price: 15,
      priceText: '15 Triệu/Tháng',
      area: 100,
      areaText: '100 m²',
      location: 'Quận Cầu Giấy, Hà Nội',
      city: 'hanoi',
      district: 'caugiay'
    },
    {
      id: 14,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh14.jpg',
      imageCount: 5,
      alt: 'Cho thuê phòng trọ Hà Nội',
      title: 'Cho thuê phòng trọ Quận Tây Hồ, view hồ đẹp',
      description: 'Phòng trọ view hồ, thoáng mát, có điều hòa, nóng lạnh. Gần công viên, khu vui chơi. Phù hợp cho người đi làm...',
      author: '👤 Hoàng Thị H',
      date: '🕒 6 ngày',
      price: 2.8,
      priceText: '2.8 Triệu/Tháng',
      area: 28,
      areaText: '28 m²',
      location: 'Quận Tây Hồ, Hà Nội',
      city: 'hanoi',
      district: 'tayho'
    },
    {
      id: 15,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh15.jpg',
      imageCount: 6,
      alt: 'Cho thuê căn hộ Đà Nẵng',
      title: 'Cho thuê căn hộ Đà Nẵng, gần biển',
      description: 'Căn hộ gần biển, view đẹp, nội thất đầy đủ. Gần bãi biển, nhà hàng, khách sạn. Phù hợp cho du lịch, nghỉ dưỡng...',
      author: '👤 Võ Văn I',
      date: '🕒 1 tuần',
      price: 6,
      priceText: '6 Triệu/Tháng',
      area: 40,
      areaText: '40 m²',
      location: 'Quận Sơn Trà, Đà Nẵng',
      city: 'danang',
      district: 'sontra'
    },
    {
      id: 16,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh16.jpg',
      imageCount: 4,
      alt: 'Cho thuê phòng trọ Đà Nẵng',
      title: 'Cho thuê phòng trọ Đà Nẵng, trung tâm thành phố',
      description: 'Phòng trọ trung tâm, gần chợ, siêu thị, bệnh viện. Có điều hòa, wifi miễn phí. Phù hợp cho sinh viên, công nhân...',
      author: '👤 Đặng Thị K',
      date: '🕒 2 tuần',
      price: 1.8,
      priceText: '1.8 Triệu/Tháng',
      area: 18,
      areaText: '18 m²',
      location: 'Quận Hải Châu, Đà Nẵng',
      city: 'danang',
      district: 'haichau'
    },
    {
      id: 17,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh17.jpg',
      imageCount: 5,
      alt: 'Cho thuê phòng trọ Quận 12',
      title: 'Cho thuê phòng trọ Quận 12, giá rẻ, tiện nghi',
      description: 'Phòng trọ giá rẻ, có điều hòa, nóng lạnh, wifi. Gần trường học, chợ. Phù hợp cho sinh viên, công nhân...',
      author: '👤 Bùi Văn L',
      date: '🕒 3 tuần',
      price: 1.2,
      priceText: '1.2 Triệu/Tháng',
      area: 15,
      areaText: '15 m²',
      location: 'Quận 12, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan12'
    },
    {
      id: 18,
      vip: 'vip-5',
      vipLevel: 'VIP 5',
      image: '/images/room/anh18.jpg',
      imageCount: 8,
      alt: 'Cho thuê căn hộ cao cấp Quận 1',
      title: 'Cho thuê căn hộ cao cấp Quận 1, view đẹp',
      description: 'Căn hộ cao cấp, nội thất sang trọng, có hồ bơi, gym. Gần trung tâm thương mại, nhà hàng. Phù hợp cho người đi làm...',
      author: '👤 Ngô Thị M',
      date: '🕒 1 tháng',
      price: 18,
      priceText: '18 Triệu/Tháng',
      area: 85,
      areaText: '85 m²',
      location: 'Quận 1, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan1'
    },
    {
      id: 19,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh19.jpg',
      imageCount: 5,
      alt: 'Cho thuê phòng trọ Bình Thạnh',
      title: 'Cho thuê phòng trọ Bình Thạnh, gần đại học',
      description: 'Phòng trọ gần đại học, có điều hòa, wifi miễn phí. Gần chợ, siêu thị. Phù hợp cho sinh viên...',
      author: '👤 Đỗ Văn N',
      date: '🕒 2 tháng',
      price: 1.6,
      priceText: '1.6 Triệu/Tháng',
      area: 19,
      areaText: '19 m²',
      location: 'Quận Bình Thạnh, Hồ Chí Minh',
      city: 'hcm',
      district: 'binhthanh'
    },
    {
      id: 20,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh20.jpg',
      imageCount: 6,
      alt: 'Cho thuê căn hộ Quận 3',
      title: 'Cho thuê căn hộ Quận 3, nội thất đầy đủ',
      description: 'Căn hộ mới, nội thất đầy đủ, có ban công. Gần trường học, bệnh viện. Phù hợp cho cặp đôi, gia đình nhỏ...',
      author: '👤 Vũ Thị O',
      date: '🕒 3 tháng',
      price: 4.8,
      priceText: '4.8 Triệu/Tháng',
      area: 38,
      areaText: '38 m²',
      location: 'Quận 3, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan3'
    },
    {
      id: 21,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh21.jpg',
      imageCount: 4,
      alt: 'Cho thuê phòng trọ Hà Nội',
      title: 'Cho thuê phòng trọ Hà Nội, Quận Đống Đa',
      description: 'Phòng trọ sạch sẽ, có điều hòa, nóng lạnh. Gần trường học, chợ. Phù hợp cho sinh viên, công nhân...',
      author: '👤 Lý Văn P',
      date: '🕒 4 tháng',
      price: 2.3,
      priceText: '2.3 Triệu/Tháng',
      area: 24,
      areaText: '24 m²',
      location: 'Quận Đống Đa, Hà Nội',
      city: 'hanoi',
      district: 'dongda'
    },
    {
      id: 22,
      vip: 'vip-5',
      vipLevel: 'VIP 5',
      image: '/images/room/anh22.jpg',
      imageCount: 7,
      alt: 'Cho thuê nhà nguyên căn Hà Nội',
      title: 'Cho thuê nhà nguyên căn 2 tầng, Quận Hai Bà Trưng',
      description: 'Nhà nguyên căn 2 tầng, 3 phòng ngủ, 2 phòng tắm. Gần trường học, bệnh viện. Phù hợp cho gia đình...',
      author: '👤 Trương Thị Q',
      date: '🕒 5 tháng',
      price: 14,
      priceText: '14 Triệu/Tháng',
      area: 95,
      areaText: '95 m²',
      location: 'Quận Hai Bà Trưng, Hà Nội',
      city: 'hanoi',
      district: 'haibatrung'
    },
    {
      id: 23,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh23.jpg',
      imageCount: 5,
      alt: 'Cho thuê căn hộ Đà Nẵng',
      title: 'Cho thuê căn hộ Đà Nẵng, Quận Thanh Khê',
      description: 'Căn hộ mới, nội thất đầy đủ, có ban công. Gần chợ, siêu thị. Phù hợp cho cặp đôi...',
      author: '👤 Phan Văn R',
      date: '🕒 6 tháng',
      price: 5.5,
      priceText: '5.5 Triệu/Tháng',
      area: 42,
      areaText: '42 m²',
      location: 'Quận Thanh Khê, Đà Nẵng',
      city: 'danang',
      district: 'thanhkhe'
    },
    {
      id: 24,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh24.jpg',
      imageCount: 6,
      alt: 'Cho thuê phòng trọ Quận 7',
      title: 'Cho thuê phòng trọ Quận 7, giá rẻ',
      description: 'Phòng trọ giá rẻ, có điều hòa, wifi. Gần chợ, siêu thị. Phù hợp cho sinh viên, công nhân...',
      author: '👤 Hồ Thị S',
      date: '🕒 1 tuần',
      price: 1.9,
      priceText: '1.9 Triệu/Tháng',
      area: 21,
      areaText: '21 m²',
      location: 'Quận 7, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan7'
    },
    {
      id: 25,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh25.jpg',
      imageCount: 4,
      alt: 'Cho thuê căn hộ Quận 1',
      title: 'Cho thuê căn hộ Quận 1, trung tâm',
      description: 'Căn hộ trung tâm, nội thất đầy đủ. Gần trung tâm thương mại, nhà hàng. Phù hợp cho người đi làm...',
      author: '👤 Tôn Văn T',
      date: '🕒 2 tuần',
      price: 7.5,
      priceText: '7.5 Triệu/Tháng',
      area: 50,
      areaText: '50 m²',
      location: 'Quận 1, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan1'
    },
    {
      id: 26,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh26.jpg',
      imageCount: 5,
      alt: 'Cho thuê phòng trọ Hà Nội',
      title: 'Cho thuê phòng trọ Hà Nội, Quận Hoàn Kiếm',
      description: 'Phòng trọ gần hồ Hoàn Kiếm, có điều hòa, wifi. Gần trường học, chợ. Phù hợp cho sinh viên...',
      author: '👤 Đinh Thị U',
      date: '🕒 3 tuần',
      price: 2.5,
      priceText: '2.5 Triệu/Tháng',
      area: 26,
      areaText: '26 m²',
      location: 'Quận Hoàn Kiếm, Hà Nội',
      city: 'hanoi',
      district: 'hoankiem'
    },
    {
      id: 27,
      vip: 'vip-5',
      vipLevel: 'VIP 5',
      image: '/images/room/anh27.jpg',
      imageCount: 8,
      alt: 'Cho thuê căn hộ cao cấp Đà Nẵng',
      title: 'Cho thuê căn hộ cao cấp Đà Nẵng, view biển',
      description: 'Căn hộ cao cấp view biển, nội thất sang trọng. Gần bãi biển, nhà hàng. Phù hợp cho du lịch, nghỉ dưỡng...',
      author: '👤 Vương Văn V',
      date: '🕒 1 tháng',
      price: 9,
      priceText: '9 Triệu/Tháng',
      area: 60,
      areaText: '60 m²',
      location: 'Quận Sơn Trà, Đà Nẵng',
      city: 'danang',
      district: 'sontra'
    },
    {
      id: 28,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh28.jpg',
      imageCount: 5,
      alt: 'Cho thuê phòng trọ Quận Bình Thạnh',
      title: 'Cho thuê phòng trọ Quận Bình Thạnh, giá rẻ',
      description: 'Phòng trọ giá rẻ, có điều hòa, wifi. Gần chợ, siêu thị. Phù hợp cho sinh viên, công nhân...',
      author: '👤 Lưu Thị W',
      date: '🕒 2 tháng',
      price: 1.4,
      priceText: '1.4 Triệu/Tháng',
      area: 17,
      areaText: '17 m²',
      location: 'Quận Bình Thạnh, Hồ Chí Minh',
      city: 'hcm',
      district: 'binhthanh'
    },
    {
      id: 29,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh29.jpg',
      imageCount: 6,
      alt: 'Cho thuê căn hộ Quận 3',
      title: 'Cho thuê căn hộ Quận 3, nội thất đầy đủ',
      description: 'Căn hộ mới, nội thất đầy đủ, có ban công. Gần trường học, bệnh viện. Phù hợp cho cặp đôi...',
      author: '👤 Châu Văn X',
      date: '🕒 3 tháng',
      price: 4.2,
      priceText: '4.2 Triệu/Tháng',
      area: 36,
      areaText: '36 m²',
      location: 'Quận 3, Hồ Chí Minh',
      city: 'hcm',
      district: 'quan3'
    },
    {
      id: 30,
      vip: 'vip-4',
      vipLevel: 'VIP 4',
      image: '/images/room/anh30.jpg',
      imageCount: 4,
      alt: 'Cho thuê phòng trọ Hà Nội',
      title: 'Cho thuê phòng trọ Hà Nội, Quận Thanh Xuân',
      description: 'Phòng trọ sạch sẽ, có điều hòa, nóng lạnh. Gần trường học, chợ. Phù hợp cho sinh viên, công nhân...',
      author: '👤 Mai Thị Y',
      date: '🕒 4 tháng',
      price: 2.1,
      priceText: '2.1 Triệu/Tháng',
      area: 23,
      areaText: '23 m²',
      location: 'Quận Thanh Xuân, Hà Nội',
      city: 'hanoi',
      district: 'thanhxuan'
    }
  ];
  
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

  // Filter listings by price
  const filterListingsByPrice = (listings, priceFilter) => {
    if (!priceFilter) return listings;
    
    return listings.filter(listing => {
      if (listing.price === null) return false; // Skip "Thoả thuận"
      
      switch(priceFilter) {
        case '1-2':
          return listing.price >= 1 && listing.price <= 2;
        case '2-3':
          return listing.price > 2 && listing.price <= 3;
        case '3-5':
          return listing.price > 3 && listing.price <= 5;
        case '5+':
          return listing.price > 5;
        default:
          return true;
      }
    });
  };

  // Filter listings by city and district
  const filterListingsByLocation = (listings, cityFilter, districtFilter) => {
    let filtered = listings;
    
    // Filter by city
    if (cityFilter) {
      filtered = filtered.filter(listing => listing.city === cityFilter);
    }
    
    // Filter by district
    if (districtFilter) {
      filtered = filtered.filter(listing => listing.district === districtFilter);
    }
    
    return filtered;
  };

  // Get filtered listings
  const listingsFilteredByLocation = filterListingsByLocation(allListings, filteredCity, filteredDistrict);
  const filteredListings = filterListingsByPrice(listingsFilteredByLocation, filteredPrice);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPrice, filteredCity, filteredDistrict]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);
  
  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Apply all filters
    setFilteredPrice(price);
    setFilteredCity(city);
    setFilteredDistrict(district);
    setCurrentPage(1); // Reset to first page when searching
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
            onChange={handleCityChange}
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
            disabled={!city}
          >
            <option value="">Quận, huyện</option>
            {getDistrictsForCity(city).map((districtOption) => (
              <option key={districtOption.value} value={districtOption.value}>
                {districtOption.label}
              </option>
            ))}
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
            loading="eager"
            decoding="async"
            fetchpriority="high"
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
          {currentListings.length > 0 ? (
            currentListings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <div className={`listing-badge vip ${listing.vip}`}>{listing.vipLevel}</div>
                <div className="listing-image-wrapper">
                  <div className="listing-image">
                    <img src={listing.image} alt={listing.alt} />
                  </div>
                  <span className="listing-image-count">{listing.imageCount}</span>
                </div>
                <div className="listing-content">
                  <h3>{listing.title}</h3>
                  <p className="listing-description">{listing.description}</p>
                  <div className="listing-meta">
                    <span className="listing-author">{listing.author}</span>
                    <span className="listing-date">{listing.date}</span>
                  </div>
                  <div className="listing-footer">
                    <span className="listing-price">{listing.priceText}</span>
                    <span className="listing-area">{listing.areaText}</span>
                    <span className="listing-location">{listing.location}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>Không tìm thấy kết quả phù hợp với tiêu chí tìm kiếm của bạn.</p>
            </div>
          )}

          {/* Pagination */}
          {filteredListings.length > 0 && totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn" 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="pagination-ellipsis">...</span>;
                }
                return null;
              })}
              <button 
                className="pagination-btn" 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                »
              </button>
            </div>
          )}
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
