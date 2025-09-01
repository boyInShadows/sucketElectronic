# Token Expiration System Documentation

## Overview

This document describes the implementation of a comprehensive token expiration system for the Sucket Electronic frontend application. The system automatically logs out users after 36 hours and provides warnings before expiration.

## Features

- **36-Hour Token Expiration**: Tokens automatically expire after 36 hours
- **Automatic Logout**: Users are automatically logged out when tokens expire
- **Warning System**: Warnings are shown 1 hour before expiration
- **Real-time Monitoring**: Continuous monitoring of token expiration status
- **Persian Language Support**: All messages and UI elements are in Persian
- **Responsive Design**: Works on both desktop and mobile devices

## Architecture

### Core Components

1. **Token Manager** (`app/libs/tokenManager.js`)
   - Centralized token management
   - Expiration time calculations
   - Warning level determination

2. **Token Expiration Hook** (`app/hooks/useTokenExpiration.js`)
   - React hook for monitoring token expiration
   - Automatic logout functionality
   - Background monitoring

3. **Enhanced Auth Utilities** (`app/libs/auth.js`)
   - Token validation with expiration checks
   - Automatic cleanup of expired tokens
   - Integration with existing auth system

4. **API Integration** (`app/libs/api.js`)
   - Automatic token validation before API calls
   - Graceful handling of expired tokens
   - Redirect to login on expiration

5. **UI Components**
   - Header with expiration timer
   - Warning banners
   - Reusable status components

## Implementation Details

### Token Storage

Tokens are stored in localStorage with the following structure:
```javascript
{
  token: "jwt_token_string",
  tokenExpiration: "timestamp_in_milliseconds",
  username: "user_username",
  is_admin: "true/false"
}
```

### Expiration Timeline

- **0-30 minutes remaining**: Critical warning (red)
- **30-60 minutes remaining**: Warning (amber)
- **60+ minutes remaining**: Normal status (green)
- **0 minutes**: Token expired, automatic logout

### Monitoring Intervals

- **Token expiration check**: Every minute
- **UI updates**: Every second (on test page)
- **Background monitoring**: Continuous with useTokenExpiration hook

## Usage

### Basic Integration

```javascript
import { useTokenExpiration } from '@/app/hooks/useTokenExpiration';

function MyComponent() {
  // Initialize token expiration monitoring
  useTokenExpiration();
  
  // Component logic...
}
```

### Token Management

```javascript
import { 
  getTokenInfo, 
  refreshTokenExpiration, 
  isTokenExpired 
} from '@/app/libs/tokenManager';

// Get comprehensive token information
const tokenInfo = getTokenInfo();

// Check if token is expired
if (isTokenExpired()) {
  // Handle expired token
}

// Refresh token expiration (reset to 36 hours)
refreshTokenExpiration();
```

### UI Components

```javascript
import TokenExpirationStatus from '@/app/components/TokenExpirationStatus';

// Show timer and warnings
<TokenExpirationStatus showWarning={true} showTimer={true} />

// Show only warnings
<TokenExpirationStatus showWarning={true} showTimer={false} />
```

## API Integration

The system automatically validates tokens before making API calls:

```javascript
// Before each API request, the system checks:
if (isTokenExpired()) {
  handleExpiredToken(); // Clear auth state and redirect
  return; // Don't make the API call
}
```

## Security Features

1. **Automatic Cleanup**: Expired tokens are automatically removed
2. **Session Validation**: Every authentication check validates token expiration
3. **Secure Redirects**: Users are redirected to login on expiration
4. **No Token Leakage**: Expired tokens are never sent in API requests

## Testing

A comprehensive test page is available at `/token-test` that shows:
- Real-time token status
- Expiration countdown
- Warning levels
- Authentication state
- Manual controls for testing

## Configuration

### Token Expiration Time

The expiration time is configurable in multiple files:
- `app/libs/tokenManager.js` - Main configuration
- `app/libs/auth.js` - Auth utilities
- `app/hooks/useTokenExpiration.js` - Hook configuration

```javascript
const TOKEN_EXPIRY_HOURS = 36; // Change this value to modify expiration time
```

### Warning Thresholds

Warning thresholds can be adjusted in the components:
- **Warning threshold**: 1 hour (3600000 ms)
- **Critical threshold**: 30 minutes (1800000 ms)

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Local Storage**: Required for token persistence
- **JavaScript**: ES6+ features required
- **React**: 18+ required for hooks

## Performance Considerations

- **Minimal Overhead**: Token checks are lightweight
- **Efficient Monitoring**: Uses intervals instead of continuous polling
- **Memory Management**: Proper cleanup of timeouts and intervals
- **Optimized Updates**: UI updates only when necessary

## Troubleshooting

### Common Issues

1. **Token not expiring**: Check if localStorage is working
2. **Warnings not showing**: Verify warning thresholds are set correctly
3. **Automatic logout not working**: Ensure useTokenExpiration hook is initialized

### Debug Mode

Enable console logging by checking the browser console for:
- Token expiration timestamps
- Warning level changes
- Automatic logout events

## Future Enhancements

1. **Refresh Token Support**: Implement refresh token mechanism
2. **Multiple Session Support**: Allow multiple concurrent sessions
3. **Advanced Warning System**: Customizable warning levels and messages
4. **Analytics Integration**: Track session duration and expiration patterns
5. **Offline Support**: Handle token expiration when offline

## Support

For technical support or questions about the token expiration system, please refer to:
- Code comments in the implementation files
- This documentation
- The test page at `/token-test`
- Console logs for debugging information 