# Sucket Electronic - Frontend

A modern, responsive e-commerce frontend built with Next.js for the Sucket Electronic platform. This application provides a complete user interface for browsing products, managing shopping carts, and processing orders.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Product Catalog**: Browse products by categories with search functionality
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Secure login/signup with NextAuth.js
- **Order Management**: Complete order processing and tracking
- **Content Management**: Articles and blog posts
- **Contact System**: Contact forms and messaging
- **Persian Language Support**: RTL layout and Persian text support
- **Interactive Maps**: Location services with Neshan Map integration
- **Social Media Integration**: Social sharing and connectivity
- **Stripe Integration**: Secure payment processing

## 🛠️ Tech Stack

- **Next.js 15.1.7**: React framework with App Router
- **React 19**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **NextAuth.js**: Authentication solution
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Stripe**: Payment processing
- **Neshan Map**: Interactive maps
- **React Social Icons**: Social media integration

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Backend API running (Django backend)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SucketElectronic/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   BACKEND_API_URL=http://localhost:8000
   STRIPE_PUBLIC_KEY=your-stripe-public-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product API routes
│   │   ├── categories/    # Category API routes
│   │   └── checkout/      # Checkout API routes
│   ├── components/        # Reusable components
│   │   ├── header/        # Navigation components
│   │   ├── footer/        # Footer components
│   │   ├── main/          # Main page components
│   │   └── products/      # Product-related components
│   ├── pages/             # Page components
│   │   ├── products/      # Product pages
│   │   ├── articles/      # Article pages
│   │   ├── auth/          # Authentication pages
│   │   └── users/         # User management pages
│   ├── lib/               # Utility libraries
│   ├── libs/              # API and database utilities
│   ├── state/             # State management (Jotai)
│   ├── styles/            # Global styles
│   └── utils/             # Utility functions
├── public/                # Static assets
│   ├── images/            # Image assets
│   └── fonts/             # Custom fonts
└── components/            # Additional components
```

## 🎨 Key Components

### Header & Navigation
- Responsive navigation menu
- User authentication status
- Shopping cart indicator
- Search functionality

### Product Components
- Product cards with images and details
- Product sliders and carousels
- Category-based product filtering
- Special product highlights

### Shopping Cart
- Cart item management
- Quantity controls
- Price calculations
- Checkout integration

### User Management
- Login/signup forms
- User profile management
- Order history
- Admin panel for administrators

### Content Management
- Article display and management
- Contact forms
- FAQ sections
- Interactive maps

## 🔗 Backend Integration

This frontend connects to the Django REST API backend:

- **API Base URL**: `http://localhost:8000`
- **Authentication**: Session-based with NextAuth.js
- **Data Fetching**: Server-side and client-side rendering
- **File Uploads**: Image uploads for products and articles

### API Endpoints Used

- `/api/products/` - Product management
- `/api/categories/` - Category management
- `/api/cart/` - Shopping cart operations
- `/api/orders/` - Order processing
- `/api/auth/` - User authentication
- `/api/articles/` - Content management
- `/api/messages/` - Contact form submissions

## 🎯 Features in Detail

### Product Management
- Browse products by category
- Product search and filtering
- Product details with images
- Related products suggestions

### Shopping Experience
- Add/remove items from cart
- Quantity management
- Price calculations
- Secure checkout process

### User Features
- User registration and login
- Profile management
- Order history and tracking
- Wishlist functionality

### Admin Features
- Product management
- Order management
- User management
- Content management
- Analytics dashboard

## 🎨 Styling & Design

- **Tailwind CSS**: Utility-first styling
- **RTL Support**: Persian language layout
- **Responsive Design**: Mobile-first approach
- **Custom Fonts**: Persian typography support
- **Animations**: Smooth transitions with Framer Motion

## 🔐 Authentication

- **NextAuth.js**: Secure authentication
- **Session Management**: Persistent user sessions
- **Role-based Access**: Admin and user roles
- **Protected Routes**: Secure page access

## 💳 Payment Integration

- **Stripe**: Secure payment processing
- **Multiple Payment Methods**: Credit cards, digital wallets
- **Order Confirmation**: Email notifications
- **Payment Security**: PCI compliance

## 🗺️ Map Integration

- **Neshan Map**: Interactive location services
- **Store Locations**: Physical store mapping
- **Delivery Areas**: Service area visualization
- **Contact Information**: Location-based contact details

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure environment variables
4. Set up reverse proxy if needed

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- ESLint configuration for code quality
- Prettier for code formatting
- TypeScript support (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Sucket Electronic e-commerce platform.

## 🔗 Backend Repository

The backend API is available in the `backend/` directory of this repository. See the backend README.md for setup instructions and API documentation.

## 🆘 Support

For support and questions:
- Check the backend API documentation
- Review the component documentation
- Open an issue on GitHub
