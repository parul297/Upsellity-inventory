# Upsellit Inventory Management System - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [API Documentation](#api-documentation)
3. [Database Schema](#database-schema)
4. [Frontend Components](#frontend-components)
5. [Backend Controllers](#backend-controllers)
6. [State Management](#state-management)
7. [Error Handling](#error-handling)
8. [Development Guide](#development-guide)

---

## Architecture Overview

### System Architecture

The application follows a three-tier architecture:

```
┌─────────────────────────────────────────┐
│         React Frontend (Vite)            │
│  - UI Components                        │
│  - Pages (Products, Analytics)          │
│  - State Management                     │
└────────────┬────────────────────────────┘
             │ HTTP/REST API
             ↓
┌─────────────────────────────────────────┐
│       Express.js Backend (Node.js)      │
│  - API Routes                           │
│  - Controllers                          │
│  - Business Logic                       │
└────────────┬────────────────────────────┘
             │ Prisma ORM
             ↓
┌─────────────────────────────────────────┐
│       PostgreSQL Database               │
│  - Product Data                         │
│  - Persistent Storage                   │
└─────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 19.2.0 - Component-based UI library
- Vite 7.2.4 - Lightning-fast build tool
- Tailwind CSS 4.1.18 - Utility-first styling
- React Router 7.13.0 - Client-side routing
- Axios - HTTP client for API calls
- Radix UI + Shadcn UI - Accessible component library

**Backend:**
- Express.js 5.2.1 - Web application framework
- Prisma 7.3.0 - Next-generation ORM
- PostgreSQL - Relational database
- Node.js - JavaScript runtime

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Currently, no authentication is implemented. All endpoints are publicly accessible.

### Response Format

All API responses follow a consistent JSON format:

**Success Response:**
```json
{
  "message": "Operation successful",
  "data": {},
  "product": {}
}
```

**Error Response:**
```json
{
  "message": "Error description"
}
```

### HTTP Status Codes
- `200` - OK (Successful GET, PATCH)
- `201` - Created (Successful POST)
- `400` - Bad Request (Validation error)
- `404` - Not Found (Resource not found)
- `500` - Internal Server Error (Server error)

---

## API Endpoints

### Products Endpoints

#### 1. Get All Products
```
GET /api/products
```

**Query Parameters:**
- `search` (string, optional) - Search by product name or SKU
- `status` (string, optional) - Filter by status: `ALL`, `IN_STOCK`, `LOW_STOCK`, `OUT_OF_STOCK`
- `price` (string, optional) - Sort by price: `asc` or `desc` (default: `desc`)

**Example Request:**
```bash
GET /api/products?search=laptop&status=IN_STOCK&price=asc
```

**Response:**
```json
{
  "message": "Products fetched successfully",
  "total": 5,
  "products": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Laptop Pro",
      "sku": "LAP-001",
      "price": 999.99,
      "stock": 15,
      "minStock": 5,
      "createdAt": "2026-01-27T18:53:02.000Z",
      "updatedAt": "2026-01-27T18:53:02.000Z"
    }
  ]
}
```

**Stock Status Logic:**
- `IN_STOCK` - stock > minStock
- `LOW_STOCK` - stock > 0 AND stock <= minStock
- `OUT_OF_STOCK` - stock === 0

---

#### 2. Get Product by ID
```
GET /api/products/:id
```

**URL Parameters:**
- `id` (string, required) - UUID of the product

**Example Request:**
```bash
GET /api/products/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "message": "Product fetched successfully",
  "product": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Laptop Pro",
    "sku": "LAP-001",
    "price": 999.99,
    "stock": 15,
    "minStock": 5,
    "createdAt": "2026-01-27T18:53:02.000Z",
    "updatedAt": "2026-01-27T18:53:02.000Z"
  }
}
```

---

#### 3. Create Product
```
POST /api/products
```

**Request Body:**
```json
{
  "name": "Laptop Pro",
  "sku": "LAP-001",
  "price": 999.99,
  "stock": 15,
  "minStock": 5
}
```

**Validation Rules:**
- `name` (required, string) - Product name
- `sku` (required, string, unique) - Stock keeping unit
- `price` (required, number) - Product price
- `stock` (required, number) - Current stock quantity
- `minStock` (required, number) - Minimum stock threshold

**Response:**
```json
{
  "message": "Product added successfully",
  "product": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Laptop Pro",
    "sku": "LAP-001",
    "price": 999.99,
    "stock": 15,
    "minStock": 5,
    "createdAt": "2026-01-27T18:53:02.000Z",
    "updatedAt": "2026-01-27T18:53:02.000Z"
  }
}
```

**Error Responses:**
- 400 - All fields are required
- 500 - Internal Server Error

---

#### 4. Update Product
```
PATCH /api/products/:id
```

**URL Parameters:**
- `id` (string, required) - UUID of the product

**Request Body:**
```json
{
  "name": "Laptop Pro Max",
  "price": 1299.99,
  "stock": 20,
  "minStock": 8
}
```

**Note:** Only include fields you want to update. SKU cannot be changed after creation.

**Response:**
```json
{
  "message": "Product updated successfully",
  "product": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Laptop Pro Max",
    "sku": "LAP-001",
    "price": 1299.99,
    "stock": 20,
    "minStock": 8,
    "createdAt": "2026-01-27T18:53:02.000Z",
    "updatedAt": "2026-01-29T10:15:45.000Z"
  }
}
```

---

#### 5. Delete Product
```
DELETE /api/products/:id
```

**URL Parameters:**
- `id` (string, required) - UUID of the product

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

**Error Responses:**
- 404 - Product not found
- 500 - Internal Server Error

---

### Analytics Endpoints

#### Get Analytics
```
GET /api/analytics
```

**Description:** Retrieve comprehensive inventory analytics

**Response:**
```json
{
  "message": "analytics fetch successfully",
  "data": {
    "totalProducts": 25,
    "totalInventoryValue": 45678.90,
    "outOfStockProducts": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Out of Stock Item",
        "sku": "OSI-001",
        "price": 99.99,
        "stock": 0,
        "minStock": 5,
        "createdAt": "2026-01-27T18:53:02.000Z",
        "updatedAt": "2026-01-27T18:53:02.000Z"
      }
    ],
    "lowStockProduct": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Low Stock Item",
        "sku": "LSI-001",
        "price": 49.99,
        "stock": 3,
        "minStock": 5,
        "createdAt": "2026-01-27T18:53:02.000Z",
        "updatedAt": "2026-01-27T18:53:02.000Z"
      }
    ],
    "outOfStockCount": 3,
    "lowStockCount": 5
  }
}
```

**Metrics Explained:**
- `totalProducts` - Total number of products in inventory
- `totalInventoryValue` - Sum of (price × stock) for all products
- `outOfStockProducts` - Array of products with stock = 0
- `lowStockProduct` - Array of products where stock <= minStock
- `outOfStockCount` - Count of out of stock products
- `lowStockCount` - Count of low stock products

---

## Database Schema

### Prisma Schema File Location
`server/prisma/schema.prisma`

### Product Model

```prisma
model Product {
  id        String   @id @default(uuid())
  name      String
  sku       String   @unique
  price     Float
  stock     Int
  minStock  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
}
```

### Field Descriptions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | String | Primary Key, UUID | Unique identifier for each product |
| `name` | String | Required | Product name |
| `sku` | String | Required, Unique | Stock keeping unit for inventory tracking |
| `price` | Float | Required | Product price |
| `stock` | Int | Required | Current quantity in stock |
| `minStock` | Int | Required | Minimum stock level threshold |
| `createdAt` | DateTime | Auto-generated | Timestamp of product creation |
| `updatedAt` | DateTime | Auto-updated | Timestamp of last update |

### Migrations

Migrations are stored in `server/prisma/migrations/`

**Current Migration:** `20260127185302_product_table`

To create new migrations:
```bash
npx prisma migrate dev --name description_of_change
```

---

## Frontend Components

### Page Components

#### 1. Products.jsx
**Location:** `client/src/pages/Products.jsx`

Main products management page with features:
- Display all products in a table
- Search products by name or SKU
- Filter by stock status (ALL, IN_STOCK, LOW_STOCK, OUT_OF_STOCK)
- Sort by price (ascending/descending)
- Delete products with confirmation dialog

**State Variables:**
```javascript
- allProducts: Array of products
- loading: Boolean for loading state
- search: Search query string
- statusFilter: Selected stock status filter
- priceFilter: Price sort order
- open: Confirmation dialog visibility
- deleteId: ID of product to delete
```

**Key Functions:**
- `fetAllProducts()` - Fetches products with current filters
- `handleDeleteClick()` - Opens confirmation dialog
- `handleConfirmDelete()` - Confirms and executes deletion
- `onSearch()` - Triggers product fetch on search

---

#### 2. Analytics.jsx
**Location:** `client/src/pages/Analytics.jsx`

Analytics dashboard displaying:
- Total products count
- Total inventory value
- Out of stock products list
- Low stock products list
- Summary cards with key metrics

---

#### 3. ProductDetails.jsx
**Location:** `client/src/pages/ProductDetails.jsx`

Displays detailed information for a single product.

---

### Component Components

#### Layout Components

**1. Navbar.jsx**
Navigation bar with links to Products and Analytics pages.

**2. SearchBar.jsx**
Search input component for searching products by name or SKU.

**3. DropdownFilter.jsx**
Dropdown component for selecting filters (status or price sort).

---

#### Product Components

**1. ProductTable.jsx**
Table component displaying all products with columns:
- Name
- SKU
- Price
- Stock
- Status Badge
- Actions (Edit, Delete)

**2. ProductForm.jsx**
Form component for creating and updating products.

**3. StockBadge.jsx**
Badge component displaying stock status with color coding:
- Green: IN_STOCK
- Yellow: LOW_STOCK
- Red: OUT_OF_STOCK

---

#### Analytics Components

**1. SummaryCard.jsx**
Card component displaying analytics metrics.

**2. ProductStockTable.jsx**
Table displaying products with stock issues.

---

#### Common Components

**1. ConfirmDialog.jsx**
Reusable confirmation dialog for delete operations.

**2. Loader.jsx**
Loading spinner component shown during data fetching.

---

### UI Components (Shadcn/UI)

Located in `client/src/components/ui/`:
- `alert-dialog.jsx` - Alert dialog component
- `badge.jsx` - Badge component
- `button.jsx` - Button component
- `card.jsx` - Card container component
- `dialog.jsx` - Modal dialog component
- `dropdown-menu.jsx` - Dropdown menu component
- `field.jsx` - Form field wrapper
- `input.jsx` - Input field component
- `label.jsx` - Label component
- `separator.jsx` - Visual separator
- `table.jsx` - Table component

---

## Backend Controllers

### Product Controllers
**Location:** `server/src/controllers/productControllers.js`

#### 1. addProduct(req, res)
Creates a new product.

**Validation:**
- All fields required: name, sku, price, stock, minStock
- Price, stock, minStock converted to numbers
- SKU must be unique

**Error Handling:**
- 400 - Missing fields
- 500 - Database error

---

#### 2. getAllProducts(req, res)
Retrieves all products with optional filtering and sorting.

**Query Parameters:**
- search (string)
- status (string)
- price (string - asc/desc)

**Processing:**
1. Fetch from database with search filter
2. Apply status filter in-memory
3. Sort by price

---

#### 3. getProductById(req, res)
Fetches a single product by ID.

**Error Handling:**
- 404 - Product not found

---

#### 4. updateProduct(req, res)
Updates product fields.

**Allowed Updates:**
- name
- price
- stock
- minStock

**Note:** SKU cannot be updated

---

#### 5. deleteProduct(req, res)
Deletes a product by ID.

**Error Handling:**
- 404 - Product not found

---

### Analytics Controller
**Location:** `server/src/controllers/analyticsController.js`

#### getAnalytics(req, res)
Calculates and returns analytics metrics.

**Metrics Calculated:**
1. Total products count
2. Total inventory value (sum of price × stock)
3. Out of stock products filter
4. Low stock products filter
5. Counts for each category

---

## State Management

### Frontend State Management

The application uses React's built-in hooks for state management:

**useState Hook Usage:**
```javascript
// Products page
const [allProducts, setAllProducts] = useState([])
const [loading, setLoading] = useState(true)
const [search, setSearch] = useState('')
const [statusFilter, setStatusFilter] = useState('ALL')
const [priceFilter, setPriceFilter] = useState('desc')
```

**useEffect Hook Usage:**
- Fetches products when filters change
- Manages side effects for API calls

---

## Error Handling

### Backend Error Handling

**Try-Catch Blocks:**
All controller functions wrap database operations in try-catch blocks.

**Status Codes:**
```javascript
- 201 - Created (POST success)
- 200 - OK (GET/PATCH success)
- 400 - Bad Request (Validation failure)
- 404 - Not Found (Resource doesn't exist)
- 500 - Server Error (Unexpected error)
```

### Frontend Error Handling

**API Error Handling:**
```javascript
try {
  const response = await api.get('/', { params: {...} });
  return response.data;
} catch (error) {
  console.error('Error fetching products:', error);
  throw error;
}
```

**User Feedback:**
- Loading states prevent multiple submissions
- Confirmation dialogs prevent accidental deletions
- Error console logging for debugging

---

## Development Guide

### Setting Up Development Environment

#### 1. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Set up environment variables
# Create .env file with DATABASE_URL

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

#### 2. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Create .env.local with VITE_API_BASE_URL

# Start development server
npm run dev
```

---

### Development Workflow

#### Adding a New Product Field

**1. Update Database Schema:**
```prisma
model Product {
  // ... existing fields
  newField String  // Add new field
}
```

**2. Create Migration:**
```bash
npx prisma migrate dev --name add_new_field
```

**3. Update API:**
- Add field to addProduct validation
- Include field in updateProduct
- Update response formatting

**4. Update Frontend:**
- Add field to ProductForm
- Update ProductTable columns
- Update StockBadge if needed

---

### Testing API Endpoints

#### Using cURL

**Get All Products:**
```bash
curl http://localhost:5000/api/products?search=laptop&status=IN_STOCK
```

**Create Product:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "sku": "TEST-001",
    "price": 99.99,
    "stock": 10,
    "minStock": 2
  }'
```

#### Using Postman
1. Create collection for the API
2. Set base URL to `http://localhost:5000/api`
3. Create requests for each endpoint
4. Use environment variables for flexibility

---

### Debugging

#### Frontend Debugging
- Use browser DevTools (F12)
- React DevTools extension
- Console logging and breakpoints
- Network tab for API calls

#### Backend Debugging
- Console logs in controllers
- Prisma Studio: `npx prisma studio`
- Node debugger with --inspect flag

---

### Performance Optimization

#### Frontend
- Lazy loading components with React.lazy()
- Memoization with useMemo/useCallback
- Image optimization
- Code splitting

#### Backend
- Database indexing on frequently queried fields (SKU)
- Query optimization with Prisma
- Caching strategies
- Pagination for large datasets (future enhancement)

---

### Security Considerations

#### Current Implementation
- CORS enabled for all origins (configure for production)
- Input validation on backend
- Type safety with Prisma

#### Recommendations
- Implement authentication (JWT)
- Add authorization middleware
- Validate on both client and server
- Use HTTPS in production
- Add rate limiting
- Sanitize all user inputs

---

### Deployment

#### Environment Variables for Production

**Server .env:**
```env
DATABASE_URL="postgresql://prod_user:prod_pass@prod_host:5432/upsellit_prod"
PORT=3000
NODE_ENV=production
```

**Client .env.production:**
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

---

## Common Issues & Solutions

### Database Connection Error
**Issue:** Cannot connect to PostgreSQL
**Solution:** 
- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database exists

### CORS Error
**Issue:** Frontend cannot reach backend
**Solution:**
- Check server CORS configuration
- Verify VITE_API_BASE_URL matches server URL
- Check if server is running

### Migration Failed
**Issue:** `prisma migrate dev` fails
**Solution:**
```bash
# Reset database (development only)
npx prisma migrate reset

# Or check migration files manually
npx prisma migrate status
```

---

## File Structure Reference

```
server/
├── src/
│   ├── app.js                      # Express app setup
│   ├── server.js                   # Server entry point
│   ├── config/
│   │   └── db.js                   # Prisma client initialization
│   ├── controllers/
│   │   ├── productControllers.js   # Product business logic
│   │   └── analyticsController.js  # Analytics logic
│   └── routes/
│       ├── productRoutes.js        # Product endpoints
│       └── analyticsRoutes.js      # Analytics endpoints
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── migrations/                 # Migration history
└── package.json

client/
├── src/
│   ├── api/
│   │   ├── productApi.js           # Product API calls
│   │   └── analyticsApi.js         # Analytics API calls
│   ├── component/
│   │   ├── products/               # Product components
│   │   ├── analytics/              # Analytics components
│   │   ├── layout/                 # Layout components
│   │   └── common/                 # Common components
│   ├── components/
│   │   └── ui/                     # Shadcn UI components
│   ├── pages/
│   │   ├── Products.jsx            # Products page
│   │   ├── Analytics.jsx           # Analytics page
│   │   └── ProductDetails.jsx      # Details page
│   ├── routes/
│   │   └── AppRoutes.jsx           # Route configuration
│   ├── lib/
│   │   └── utils.js                # Utility functions
│   ├── App.jsx                     # Main component
│   └── main.jsx                    # Entry point
└── package.json
```

---

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/)

---

**Last Updated:** January 29, 2026
**Version:** 1.0.0
