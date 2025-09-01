# Smart Loading System - Sucket Electronic

## 🚀 **Overview**

A comprehensive smart loading system for the Sucket Electronic frontend that implements **Option 2: Smart Loading with Fallbacks**. The system shows loading for critical data while loading non-critical data in the background, with graceful error handling.

## ✨ **Features**

- **Page-Specific Loading**: Loading states are reset when navigating between pages
- **Smart Loading Strategy**: Critical vs non-critical data loading
- **Beautiful Loading UI**: Using `ldrs` trio loader from [uiball.com/ldrs](https://uiball.com/ldrs/)
- **Persian Language Support**: All messages and UI elements in Persian
- **Automatic Error Handling**: Retry mechanisms and fallbacks
- **Progress Indicators**: Real-time loading progress
- **Responsive Design**: Works on all devices

## 🏗️ **Architecture**

### **Core Components**

1. **LoadingContext** (`app/context/LoadingContext.js`)
   - Centralized loading state management
   - Page-specific loading state reset
   - Critical vs non-critical data tracking
   - Error state management

2. **Loading Hooks** (`app/hooks/`)
   - `useSmartLoading.js` - Main smart loading hook
   - `usePageReady.js` - Page readiness monitoring (home page only)
   - `usePageLoading.js` - Simple page-specific loading

3. **Loading Components** (`app/components/loadingSamples/`)
   - `LoadingSpinner.js` - Reusable trio loader
   - `MainPageLoading.js` - Home page loading overlay
   - `PageLoading.js` - Simple page loading component
   - `SectionLoading.js` - Section-specific loading

4. **Integration** 
   - `page.js` - Home page with MainPageLoading
   - `main/index.js` - Smart loading implementation

## 📁 **File Structure**

```
app/
├── components/
│   └── loadingSamples/
│       ├── LoadingSpinner.js      # Reusable trio loader
│       ├── MainPageLoading.js     # Home page loading
│       ├── PageLoading.js         # Simple page loading
│       ├── SectionLoading.js      # Section loading
│       └── SmartLoadingExample.js # Usage examples
├── context/
│   └── LoadingContext.js          # Loading state management
├── hooks/
│   ├── useSmartLoading.js         # Smart loading hook
│   ├── usePageReady.js            # Page readiness hook
│   └── usePageLoading.js          # Simple page loading hook
└── loading-demo/
    └── page.js                    # Demo page for testing
```

## 🔧 **Implementation**

### **1. Home Page Loading (MainPageLoading)**

```javascript
// Only shows on home page when critical data is loading
<MainPageLoading />
```

### **2. Page-Specific Loading (PageLoading)**

```javascript
import PageLoading from '@/app/components/loadingSamples/PageLoading';
import { usePageLoading } from '@/app/hooks/usePageLoading';

const MyPage = () => {
  const { isLoading, startLoading, stopLoading } = usePageLoading();
  
  return (
    <div>
      <PageLoading isLoading={isLoading} text="در حال بارگذاری صفحه..." />
      {/* Page content */}
    </div>
  );
};
```

### **3. Smart Loading for Data**

```javascript
import { useCriticalData, useBackgroundData } from '@/app/hooks/useSmartLoading';

// Critical data - shows main page loading (home page only)
const { data: products, error, retry } = useCriticalData('products', fetchProducts);

// Non-critical data - loads in background
const { data: articles } = useBackgroundData('articles', fetchArticles);
```

## 🎯 **Loading Strategy**

### **Home Page (`/`)**
- Shows `MainPageLoading` overlay when critical data loads
- Critical data: products, main content
- Background data: articles, contact info

### **Other Pages**
- No global loading overlay
- Use `PageLoading` component for page-specific loading
- Use `SectionLoading` for section-specific loading

### **Navigation Behavior**
- Loading states reset when navigating between pages
- No interference between different pages
- Clean loading experience

## 🎨 **UI Components**

### **LoadingSpinner**

```javascript
import LoadingSpinner from '@/app/components/loadingSamples/LoadingSpinner';

<LoadingSpinner 
  size="40" 
  speed="1.3" 
  color="#6366f1"
  text="در حال بارگذاری..."
  showText={true}
/>
```

### **PageLoading**

```javascript
import PageLoading from '@/app/components/loadingSamples/PageLoading';

<PageLoading 
  isLoading={true}
  text="در حال بارگذاری صفحه..."
  size="40"
/>
```

### **SectionLoading**

```javascript
import SectionLoading from '@/app/components/loadingSamples/SectionLoading';

<SectionLoading 
  isLoading={true}
  error={errorMessage}
  onRetry={retryFunction}
  text="در حال بارگذاری بخش..."
/>
```

## 🚀 **Smart Loading Strategy**

### **Critical Data Loading (Home Page Only)**
- Shows full-page loading overlay
- Blocks page interaction until loaded
- Required for page functionality

### **Background Data Loading**
- Loads without blocking UI
- Shows section-specific loading states
- Handles failures gracefully

### **Page-Specific Loading**
- Simple loading states for other pages
- No interference with home page loading
- Clean navigation experience

### **Error Handling**
- Automatic retry for non-critical data
- User-friendly error messages
- Retry buttons for failed requests

## 📱 **Responsive Design**

- **Desktop**: Full loading overlay with progress bar (home page)
- **Mobile**: Optimized loading states
- **Tablet**: Adaptive loading UI

## 🧪 **Testing**

Visit `/loading-demo` to test the loading system:

- **Loading Simulation**: Test different loading durations
- **Error Simulation**: Test error handling
- **State Monitoring**: Real-time loading state display
- **Interactive Controls**: Manual loading state manipulation

## 🔄 **Integration with Existing Code**

### **Home Page**
```javascript
// Automatically handles loading for critical data
// No manual loading management needed
```

### **Other Pages**
```javascript
// Use simple page loading
const { isLoading, startLoading, stopLoading } = usePageLoading();

useEffect(() => {
  startLoading();
  fetchData().finally(() => stopLoading());
}, []);
```

## ⚡ **Performance Features**

- **Page-Specific Reset**: Loading states reset on navigation
- **Minimal Re-renders**: Efficient state updates
- **Background Loading**: Non-blocking data fetching
- **Smart Caching**: Avoids unnecessary API calls
- **Memory Management**: Proper cleanup of timeouts

## 🎯 **Best Practices**

1. **Use MainPageLoading Only on Home Page**
   - Critical data loading for main page content

2. **Use PageLoading for Other Pages**
   - Simple loading states for individual pages

3. **Use SectionLoading for Components**
   - Section-specific loading states

4. **Handle Navigation Properly**
   - Loading states reset automatically
   - No interference between pages

## 🐛 **Troubleshooting**

### **Common Issues**

1. **Loading Shows on Wrong Pages**
   - MainPageLoading only shows on home page (`/`)
   - Use PageLoading for other pages

2. **Loading States Don't Reset**
   - Loading states automatically reset on navigation
   - Check if pathname changes are detected

3. **Page Never Ready**
   - Only applies to home page
   - Other pages are ready immediately

### **Debug Mode**

Enable console logging to see:
- Loading state changes
- Page navigation events
- Error occurrences

## 🔮 **Future Enhancements**

1. **Loading Skeletons**: Show content structure while loading
2. **Progressive Loading**: Load content in chunks
3. **Offline Support**: Handle loading when offline
4. **Loading Analytics**: Track loading performance
5. **Custom Loaders**: More loader options from ldrs

## 📚 **References**

- [ldrs Package](https://uiball.com/ldrs/) - Beautiful loading animations
- [React Context](https://react.dev/reference/react/createContext) - State management
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) - Logic reuse

## 🤝 **Support**

For questions or issues with the loading system:
- Check the demo page at `/loading-demo`
- Review console logs for debugging
- Refer to this documentation
- Check component prop types and usage examples

---

**Built with ❤️ for Sucket Electronic** 