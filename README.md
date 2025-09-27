This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

✨ Features

Authentication

• Login, Register, Logout using NextAuth.

• Secure session handling with redirects for unauthorized users.

• Auto login after registration.

Products & Filtering

• Dynamic product listing with search, brand/category, and price filters.

• Sorting (ascending/descending).

• Dedicated single product page with multiple images.

Shopping Cart

• Add/Remove products with real-time updates from the server.

• Quantity management with + / - buttons.

• Loading spinners to prevent multiple clicks.

• Cart modal with total calculation & product indicators.

• Dynamic cart badge (appears only if items exist).

Wishlist

• Add/Remove products with a heart icon.

• Wishlist sync with server & loading state.

Orders

• Display user orders fetched from the server.

• Single order view with details.

UI/UX

• Fully responsive design for all screen sizes.

• Hover animations & smooth transitions.

• Toast notifications for success/error.

State Management

• Custom Context API for products, cart, wishlist, orders, filters.

• Loading states for cart, wishlist, login, register, orders, etc.

🛠️ Tech Stack

• Next.js

• React.js

• Tailwind CSS / Bootstrap

• NextAuth

• Axios

• React Hook Form

• Git & GitHub

📂 Pages Implemented

- Home Page

- All Products Page with filters & pagination

- Product Details Page

- Cart Page / Modal

- Wishlist Page

- Profile Page (user info + orders)

- Auth Pages: Login, Register, Reset Password, Verify Email

- Checkout Page (in progress)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
