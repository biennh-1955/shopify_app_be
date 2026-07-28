## Công nghệ sử dụng
- Node.js + TypeScript
- Express.js
- TypeORM
- MySQL
- JWT
- class-validator / class-transformer
## Yêu cầu hệ thống
- Node.js: 20.14.0
- MySQL
- npm

## Cài đặt

1. Clone project:
git clone <repository-url>
cd shopify-app-be
2. Cài đặt dependencies:
npm install
3. Tạo file môi trường `.env` ở thư mục gốc:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD="....."
DB_NAME=shopify_app_be

SECRET_KEY="....."


4. Tạo database MySQL trước khi chạy:
CREATE DATABASE shopify_app_be;

5. Chạy migration:
npm run migration:run
## Chạy project

### Env Dev

npm run dev

Server sẽ chạy tại:
http://localhost:3000

### Build production
npm run build

### Chạy bản build


npm start

## Cấu trúc API

Base URL mặc định:

http://localhost:3000

### 1. Tạo shop

- Method: `POST`
- Path: `/`
- Không cần token

Request body:

```json
{
  "shopify_domain": "demo-store.myshopify.com",
  "shop_owner": "Nguyen Van A"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "shopify_domain": "demo-store.myshopify.com",
    "shop_owner": "Nguyen Van A"
  },
  "token": "<jwt_token>"
}
```

### 2. Get shop

- Method: `GET`
- Path: `/`
- Cần token trong header `Authorization: Bearer <token>`

```bash
curl -X GET http://localhost:4000/ \
  -H "Authorization: Bearer <token>"
```

### 3. Update customization

- Method: `PUT`
- Path: `/customization`
- Cần token

Request body ví dụ:

```json
{
  "input_width": "300px",
  "input_height": "45px",
  "input_border": "solid",
  "button_variant": "primary",
  "button_background_color": "#000000",
  "button_text_color": "#ffffff"
}
```

### 4. Post translation

- Method: `POST`
- Path: `/translation`
- Cần token

Request body:

```json
{
  "locale": "fr",
  "translate": {
    "placeholder_text": "Entrez votre texte",
    "button_text": "Soumettre"
  }
}
```

### 5. Update Translation

- Method: `PUT`
- Path: `/translation/:locale`
- Cần token

Ví dụ:

```bash
curl -X PUT http://localhost:4000/translation/fr \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "translate": {
      "placeholder_text": "Saisissez votre texte",
      "button_text": "Envoyer"
    }
  }'
```

### 6. Delete Translation

- Method: `DELETE`
- Path: `/translation/:locale`
- Cần token

```bash
curl -X DELETE http://localhost:4000/translation/fr \
  -H "Authorization: Bearer <token>"

