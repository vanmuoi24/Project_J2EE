# ----- Giai đoạn 1: Build ứng dụng React -----
# Sử dụng image Node.js 20 (bản Alpine cho nhẹ)
# Đây là thay đổi chính để phù hợp với phiên bản v20.19.0 của bạn
FROM node:20-alpine AS builder

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Copy file package.json và package-lock.json (hoặc yarn.lock)
COPY package*.json ./

# Cài đặt các thư viện (dependencies)
# Sử dụng 'npm ci' thay vì 'npm install' để build ổn định hơn
RUN npm ci

# Copy toàn bộ mã nguồn của dự án vào container
COPY . .

# Chạy lệnh build (Vite sẽ build ra thư mục 'dist')
RUN npm run build

# ----- Giai đoạn 2: Serve ứng dụng bằng Nginx -----
# Sử dụng một image Nginx chính thức (bản Alpine cho nhẹ)
FROM nginx:1.25-alpine

# Copy các file tĩnh đã được build ở Giai đoạn 1
# từ thư mục /app/dist của 'builder'
# vào thư mục mặc định của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# (Tùy chọn) Nếu bạn có file cấu hình Nginx riêng (ví dụ: nginx.conf)
# Bạn có thể copy nó vào đây.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng 80 (cổng web mặc định)
EXPOSE 80

# Lệnh để khởi chạy Nginx khi container bắt đầu
CMD ["nginx", "-g", "daemon off;"]    
