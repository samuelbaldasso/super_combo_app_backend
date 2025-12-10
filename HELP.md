### Prompt to Generate Backend

**Role:** Act as a Senior Backend Engineer and Architect specializing in Node.js, NestJS, and TypeScript.

**Task:** Create a production-ready, modular REST API backend for a restaurant reservation and food ordering application called "Supercombo". The backend must explicitly match the API contracts expected by the existing Flutter mobile application.

**Tech Stack Requirements:**

  * **Framework:** NestJS (latest stable version).
  * **Language:** TypeScript.
  * **Database:** PostgreSQL.
  * **ORM:** TypeORM or Prisma (prefer TypeORM for this request).
  * **Authentication:** Passport.js (JWT Strategy) + Google/Apple OAuth stubs.
  * **Validation:** `class-validator` and `class-transformer`.
  * **Documentation:** Swagger (OpenAPI) auto-generated documentation.
  * **Environment:** Docker Compose setup (App + DB).

### 1\. Database Schema & Entities

Based on the Flutter models provided, define the following Entities with appropriate relationships (One-to-Many, Many-to-Many). Ensure UUIDs are used for IDs.

  * **User:** `id`, `name`, `email` (unique), `password` (hashed), `phone`, `photo_url`, `created_at`, `updated_at`.
  * **Restaurant:** `id`, `name`, `description`, `image_url`, `address`, `latitude`, `longitude`, `rating`, `review_count`, `cuisine_type`, `categories` (array of strings), `is_open` (boolean), `opening_hours`.
  * **Product (Menu Item):** `id`, `restaurant_id` (FK), `name`, `description`, `price` (decimal), `image_url`, `category` (e.g., 'Starters'), `is_available`, `allergens` (array).
  * **Reservation:** `id`, `user_id` (FK), `restaurant_id` (FK), `date_time`, `party_size` (int), `status` (pending, confirmed, cancelled), `special_requests`.
  * **Order:** `id`, `user_id` (FK), `restaurant_id` (FK), `subtotal`, `tax`, `delivery_fee`, `total`, `status` (pending, preparing, delivered, cancelled), `notes`.
  * **OrderItem:** `id`, `order_id` (FK), `product_id`, `product_name` (snapshot), `price` (snapshot), `quantity`, `notes`.
  * **CheckIn:** `id`, `user_id`, `restaurant_id`, `reservation_id` (optional), `order_id` (optional), `check_in_time`, `status`.
  * **Coupon:** `id`, `code`, `title`, `description`, `discount_percentage`, `min_purchase`, `expiry_date`, `is_active`.

### 2\. API Architecture & Modules

Structure the application into the following modules. Use standard NestJS patterns (Controller -\> Service -\> Repository).

#### A. Auth Module (`/auth`)

  * Implement JWT Guard for protected routes.
  * **POST /login**: Validate email/password, return User + Access Token + Refresh Token.
  * **POST /register**: Create user, hash password, return User + Tokens.
  * **POST /google** & **POST /apple**: Accept `id_token`, validate (mock this validation for now), find/create user, return Tokens.
  * **POST /logout**: Invalidate token (optional blacklist implementation).
  * **POST /forgot-password**: Mock sending an email.

#### B. Restaurant Module (`/restaurants`)

  * **GET /**: Support query params: `lat`, `lng`, `radius` (filter by Haversine distance), `category`, `page`, `limit`. Return paginated list.
  * **GET /:id**: Return full restaurant details.
  * **GET /:id/menu**: Return products grouped by category (e.g., `{ "categories": [{ "name": "Entradas", "items": [...] }] }`).

#### C. Reservation Module (`/reservations`)

  * **POST /**: Create reservation. Input: `restaurant_id`, `date_time`, `party_size`.
  * **GET /user**: List authenticated user's reservations (paginated).
  * **DELETE /:id/cancel**: Update status to 'cancelled'.

#### D. Order Module (`/orders`)

  * **POST /**: Create order. Input includes `items` array. Calculate `subtotal`, `tax` (10%), `total` server-side.
  * **GET /user**: List authenticated user's orders (paginated).

#### E. Check-in Module (`/checkin`)

  * **POST /**: Link a user location to a restaurant.

#### F. Coupon Module (`/coupons`)

  * **GET /active**: Return list of valid coupons.
  * **POST /:code/redeem**: Validate code and expiry. Return discount amount.

#### G. Recommendations Module (`/recommendations`)

  * **GET /personalized**: Mock logic that returns a list of restaurants based on `lat`/`lng`.

### 3\. Specific Response Formats (Strict Compliance)

The API must return JSON exactly matching these structures to prevent Flutter parsing errors:

  * **Pagination Wrapper:**
    ```json
    {
      "data": [...],
      "pagination": { "page": 1, "limit": 20, "total": 100, "total_pages": 5 }
    }
    ```
  * **Error Format:**
    ```json
    {
      "error": "Title",
      "message": "Detail",
      "code": 400
    }
    ```

### 4\. Seed Data

Create a `seed.ts` script that populates:

1.  5 Users.
2.  10 Restaurants (with valid lat/lng coordinates to test geolocation).
3.  30 Products (3 per restaurant).
4.  5 Active Coupons.

### 5\. Implementation Steps

Please generate the code in the following order:

1.  `docker-compose.yml` and `.env.example`.
2.  `app.module.ts` and Database Configuration (TypeORM).
3.  The **Entities** definitions.
4.  The **DTOs** (Data Transfer Objects) with validation decorators.
5.  The **Controllers** and **Services** for the modules listed above.

-----