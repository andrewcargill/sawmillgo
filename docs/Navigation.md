# Navigation

## Overview

The `Navigation` component is responsible for rendering the top navigation bar of the application. It handles user authentication status, navigation links, and user-specific actions such as logging out.

## Component Relationships

### Navigation
- Displays the top navigation bar.
- Handles user authentication status.
- Provides navigation links to various parts of the application.
- Allows users to log out.

## Functionality

- **User Authentication**: The `Navigation` component checks the user's authentication status and updates the navigation bar accordingly.
- **Navigation Links**: Provides links to different sections of the application such as Home, Trees, Logs, and Planks.
- **User Actions**: Allows users to log out and access their profile settings.

## Interactions

- **UserContext**: The `Navigation` component uses the `UserContext` to access user profile information and the logout function.
- **Firebase Auth**: Utilizes Firebase Authentication to manage user login status and handle logout functionality.
- **React Router**: Uses `Link`, `useNavigate`, and `useLocation` from `react-router-dom` to manage navigation within the application.

## Navigation Links

### Links for Authenticated Users

When a user is authenticated, the `Navigation` component displays the following links:

1. **Home**
   - Path: `/home`
   - Description: Navigates to the user's home page.

2. **Trees**
   - Path: `/trees`
   - Description: Navigates to the trees management page.

3. **Logs**
   - Path: `/logs`
   - Description: Navigates to the logs management page.

4. **Planks**
   - Path: `/planks`
   - Description: Navigates to the planks management page.

5. **Profile**
   - Path: `/profile`
   - Description: Navigates to the user's profile page.

6. **Logout**
   - Action: Logs the user out and navigates to the login page.

### Links for Unauthenticated Users

When a user is not authenticated, the `Navigation` component displays the following links:

1. **Home**
   - Path: `/`
   - Description: Navigates to the home page.

2. **Concept**
   - Path: `/concept`
   - Description: Navigates to the concept page.

3. **Features**
   - Path: `/features`
   - Description: Navigates to the features page.

4. **Sawmills**
   - Path: `/sawmills`
   - Description: Navigates to the sawmills page.

5. **Status**
   - Path: `/status`
   - Description: Navigates to the status page.

6. **About**
   - Path: `/about`
   - Description: Navigates to the about page.

7. **Login**
   - Path: `/login`
   - Description: Navigates to the login page.

8. **Sign Up**
   - Path: `/signup`
   - Description: Navigates to the sign-up page.

### Conditional Rendering

The `Navigation` component conditionally renders links based on the user's authentication status:

- **Authenticated Users**: Display links to Home, Trees, Logs, Planks, Profile, and Logout.
- **Unauthenticated Users**: Display links to Home, Concept, Features, Sawmills, Status, About, Login, and Sign Up.

## Summary

The `Navigation` component is a central part of the application's user interface, providing essential navigation and user management functionality. It dynamically updates the navigation links based on the user's authentication status, ensuring that users have access to the appropriate sections of the application. By understanding the navigation links and their conditional rendering, you can gain a comprehensive view of how the `Navigation` component fits into the overall application architecture.