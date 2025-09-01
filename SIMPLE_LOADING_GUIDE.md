# Simple Loading System - How to Use

## 🎯 **What You Get:**

**ALL pages show the SAME loading** - `l-trio` loader with "لطفا منتظر باشید..." text

## 🚀 **How to Use in ANY Page:**

```javascript
import { usePageSpecificLoading } from '@/app/hooks/usePageSpecificLoading';

const YourPage = () => {
  // Use any key you want - it's just a name
  const { isLoading, startLoading, stopLoading, handleError } = usePageSpecificLoading('yourKey');

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading(); // Shows loading globally
        // Your API call here
        const data = await fetch('/api/your-data');
        stopLoading(); // Hides loading
      } catch (error) {
        handleError('خطا در بارگذاری...');
      }
    };

    fetchData();
  }, []);

  // Loading is handled globally - just return null
  if (isLoading) return null;

  return (
    // Your page content
  );
};
```

## 🔑 **Available Keys (use any you want):**

- `products` - for products
- `articles` - for articles  
- `contactInfo` - for contact
- `userProfile` - for users
- `productsPage` - for products page
- `mainContent` - for main content
- `cart` - for cart
- **Or make up your own key!**

## ✨ **Result:**

- **Loading shows**: When ANY page calls `startLoading()`
- **Loading hides**: When ALL pages call `stopLoading()`
- **Same style**: Every page shows the exact same loading
- **Automatic reset**: When you navigate to another page

## 🎨 **What Users See:**

```
┌─────────────────────────────────┐
│                                 │
│           [l-trio loader]       │
│                                 │
│        لطفا منتظر باشید...      │
│                                 │
└─────────────────────────────────┘
```

That's it! Simple and clean! 🎯 