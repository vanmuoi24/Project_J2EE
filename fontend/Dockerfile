# ----- Giai đoạn 1: Build ứng dụng React (Vite) -----
   FROM node:20-alpine AS builder

   WORKDIR /app
   
   # Copy & cài dependency
   COPY package*.json ./
   RUN npm ci --omit=dev
   
   # Copy toàn bộ source
   COPY . .
   
   # Build dự án (Vite → dist)
   RUN npm run build
   
   # ----- Giai đoạn 2: Serve bằng Nginx -----
   FROM nginx:1.25-alpine
   
   # Copy file build sang nginx
   COPY --from=builder /app/dist /usr/share/nginx/html
   
   # Nếu dùng router (SPA) thì bật cái này:
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   
   EXPOSE 80
   
   CMD ["nginx", "-g", "daemon off;"]
   