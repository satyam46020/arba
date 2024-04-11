# FullStack E-Commerce Application

This E-commerce app provides a detailed overview of the FullStack E-Commerce Application developed based user specific products and give smooth exploring experience.

## Deployed Link

**Frontend** https://arba-chi.vercel.app//

**Backend** https://arba-u5ed.onrender.com/

## Demo Credential

**Email** satyam46020@gmail.com
**Password** 123

## Setup Instructions

1. Clone the repository from GitHub.
2. Navigate to the project directory in the terminal.
3. Install dependencies:

```bash
npm install
```  
4. Start the frontend development server:

```bash
npm start
```

5. Start the backend server:

```bash
npm run start
```

6. Access the application in your web browser.

## Backend

### Technology Used

- *Framework:* React.js (backend framework)
- *Database:* MongoDB (NoSQL database)

### APIs Developed

1. *Auth Flow*
   - User Schema: fullName, userName, email, password, avatar
   - *Endpoints:*
     - Login
     - Register (with validation)
     - Forgot password
     - UpdateProfile
   
2. *Category CRUD*
   - Schema: name, slug, image, owner
   - *Endpoints:*
     - Create Category
     - Update Category
     - Read Categories
     - Delete Category
   
3. *Product CRUD*
   - Schema: title, description, price, category, image, owner
   - *Endpoints:*
     - Create Product
     - Update Product
     - Read Products
     - Delete Product

## Frontend

### Designs Implemented

1. *Login & Signup*
   - User authentication with username and password
   - Redirect to Signup page on click
   - Persistent login state using normal JavaScript fetch API
   
2. *Home Page Terms & Condition Dialog*
   - Show dialog immediately after page load
   - Accept or Cancel options
   
3. *User Profile Menu*
   - Menu with options: My Store, Profile, Logout
   - Logout redirects to login
   - Profile redirects to Profile page
   - My Store redirects to My Store page
   
4. *Profile Page*
   - Display user image, username, and email
   - Button to view Terms & Conditions
   - Buttons for updating profile and changing password
   
5. *Product Home Page*
   - Carousel section with at least 3 items
   - Display products from API
   - Add to cart functionality
   
6. *All Products Page*
   - Similar to Product Home Page
   
7. *My Store*
   - CURD operations for categories and products

### Frameworks & Libraries Used

- *React JS with Javascript:* Developed frontend components using Javascript for type-safety
- *Redux Toolkit:* State management for managing user authentication, cart, and other global states
- *React Router DOM v5:* Routing for navigating between different pages

## Notes

- Utilized Chakra UI for UI components
- Code shared on GitHub for collaboration and version control

## Screenshots

**Login Page**
![Login Page](/frontend/src/Assets/login.png)

**Signup Page**
![Login Page](/frontend/src/Assets/login.png)

**Terms and Conditions**
![T&C](/frontend/src/Assets/t&c.png)

**Home page**
![Home page ](/frontend/src/Assets/Homepage.png)

**Navbar**
![Navbar ](/frontend/src/Assets/navbar.png)

**Product**
![Product ](/frontend/src/Assets/Product.png)

**profile**
![profile ](/frontend/src/Assets/profile.png)

**Update profile Modal**
![Update profile Modal ](/frontend/src/Assets/update_profile.png)

**Update password Modal**
![Update password Modal ](/frontend/src/Assets/update_password.png)

**Category Table**
![Category Table ](/frontend/src/Assets/category_table.png)

**Product Table**
![Product Table ](/frontend/src/Assets/product_table.png)


