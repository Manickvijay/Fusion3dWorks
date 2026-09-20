# Fusion3D Works — Java Spring Boot Backend

Robust, enterprise-grade Java Spring Boot REST API for the **Fusion3D Works** 3D printing e-commerce platform and 3D print farm management system.

---

## 🚀 Key Features

1. **Auto-Configured Database (Neon PostgreSQL)**:
   - Automated Hibernate schema generation (`spring.jpa.hibernate.ddl-auto=update`)
   - Automatic seeding of default 3D printers (Bambu Lab, Prusa, Creality, Elegoo), demo users (Customer & Admin), products (Keychains, Cake Toppers, Lithophane Lamps), and order pipelines upon startup.

2. **Neon S3-Compatible Storage Integration**:
   - AWS SDK v2 client connected to Neon Storage (`https://br-blue-bar-b5l8v16s.storage.c-7.us-east-2.aws.neon.tech`)
   - Dedicated `/api/storage/upload` endpoint supporting 3D CAD models (`.stl`, `.obj`, `.3mf`, `.step`), customer photo uploads, and design proof previews.
   - Multipart file upload limits configured up to 50MB.

3. **10-Step Order Production Pipeline**:
   - `Order Placed` ➔ `Design Stage` ➔ `Preview Design Sent` ➔ `Ready for Printing` ➔ `Printing Started` ➔ `Printing Complete` ➔ `QA Testing the Product` ➔ `Packing` ➔ `Shipping to Delivery Partner` ➔ `Delivered`
   - Customer design proof approval and revision workflows (`/approve-proof` and `/request-proof-changes`).
   - Order cancellation with state tracking.

4. **Print Farm Monitoring & Scheduling**:
   - Real-time printer telemetry: status (`Idle`, `Printing`, `Paused`, `Maintenance`), nozzle/bed temperatures, extruder progress, and active spool color arrays.
   - Intelligent job allocation with daytime quick turnaround and nighttime batch queues.

5. **Automated Unit & Integration Test Suite**:
   - H2 in-memory test profile with Spring Boot MockMvc integration tests.

---

## 🛠 Tech Stack

- **Java**: 17 LTS
- **Framework**: Spring Boot 3.2.4
- **Persistence**: Spring Data JPA & Hibernate
- **Database**: PostgreSQL (Neon Serverless with SSL & Channel Binding)
- **Object Storage**: AWS SDK for Java v2 (S3 Client)
- **Validation**: Jakarta Validation / Hibernate Validator
- **Testing**: JUnit 5, Mockito, Spring Boot Test, H2 In-Memory DB

---

## 📡 REST API Reference

### 1. Authentication & Users (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate user (e.g. `user@gmail.com` / `Pass1234` or `admin@gmail.com` / `Pass1234`) |
| `POST` | `/api/auth/register` | Register a new customer |
| `GET` | `/api/auth/users` | List all users (Admin view) |
| `GET` | `/api/auth/users/{id}` | Get user profile by ID |
| `PUT` | `/api/auth/users/{id}` | Update customer shipping details, favorite colors, etc. |

### 2. Products Catalog (`/api/products`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | List all products (supports `?category=` and `?search=`) |
| `GET` | `/api/products/{id}` | Get product details with customizable sections & gallery |
| `POST` | `/api/products` | Create a new 3D printed product |
| `PUT` | `/api/products/{id}` | Update product information |
| `PATCH` | `/api/products/{id}/discount` | Apply flash sale discount percent and original price |
| `DELETE` | `/api/products/{id}` | Remove product from catalog |
| `POST` | `/api/products/{id}/reviews` | Submit verified customer review with photos and rating |

### 3. Order Management (`/api/orders`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | List all orders or filter by `?customerEmail=` |
| `GET` | `/api/orders/{id}` | Fetch full order details including 10-step timeline |
| `POST` | `/api/orders` | Place new order with custom text and color selections |
| `PATCH` | `/api/orders/{id}/status` | Advance pipeline stage, update delivery tracking & notes |
| `POST` | `/api/orders/{id}/cancel` | Cancel order with specified reason |
| `POST` | `/api/orders/{id}/approve-proof` | Customer approves 3D proof (advances to Ready for Printing) |
| `POST` | `/api/orders/{id}/request-proof-changes`| Customer requests design revision |
| `POST` | `/api/orders/{id}/assign-printer` | Assign order to a 3D printer in the fleet |

### 4. 3D Print Farm (`/api/printers`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/printers` | Get real-time printer telemetry and active jobs |
| `GET` | `/api/printers/{id}` | Get specific printer state |
| `PUT` | `/api/printers/{id}` | Update machine status, temperatures, and spools |
| `POST` | `/api/printers` | Add a new 3D printer to the farm |
| `DELETE` | `/api/printers/{id}` | Decommission printer |

### 5. Cloud Storage (`/api/storage`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/storage/upload` | Upload `.stl`, `.obj`, `.3mf`, or `.png` to Neon S3 Storage |
| `DELETE` | `/api/storage/delete` | Delete file from Neon S3 Storage |

### 6. Custom Quotes & Inquiries (`/api/inquiries`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/inquiries` | List all custom print requests |
| `POST` | `/api/inquiries` | Submit custom CAD file with print settings (infill, material) |
| `PATCH` | `/api/inquiries/{id}/status` | Update quote status (`Quoted`, `Approved`, etc.) |

### 7. Farm Analytics (`/api/dashboard`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/stats` | Aggregate total revenue, orders by status, and fleet utilization |

---

## 🏃‍♂️ Running the Backend

### Build and Run
```bash
cd backend
mvn clean package -DskipTests
mvn spring-boot:run
```

### Run Automated Tests
```bash
cd backend
mvn test
```
