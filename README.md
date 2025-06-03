# Yes Chef App - Richard version

Wanting an application that I build on my own while also being in full control of the organization and flow of the folder structure, I decided to take the DSD group project I worked on with the team and take full ownership of it while not changing the original repo.

The purpose of this documentation is to document my thought process and my planning, and make contributing back to this more efficient and more organized.

## Planning

MVP Features:

- Menu with choice of items

  - Selectable menu items by food category
  - Menu item quantity selection
  - When selected, the menu item, its quantity, and its total price should be displayed in the cart

- Cart

  - Menu item(s) quantity should be able to change by the users selection
  - Menu item(s) should be able to be removed
  - Menu item(s) should be able to have custom instructions for ingredients/others
  - When selecting the purchase button, all of the menu items in the cart should be sent to the kitchen

- Kitchen open tickets

  - User should be able to see the amount of items they need to order
    - Removing menu items being separated by category because the information doesn't seem necessary
  - User should be able to cross off a menu item when they complete cooking it
  - User should be able to click on a button that marks unstarted tickets as started
    - When the ticket is marked as started, the ticket UI changes to visually indicate to the user that the ticket has started
    - When ticket is marked as started, the started tickets are reordered as priority from left to right or top to bottom
  - User should be able to click on a button that marks started tickets as completed
    - When the ticket is marked as completed, the ticket is removed from the list of tickets
  - Removed displaying kitchen closed tickets because there doesn't seem there's a good reason to display them to the user specifically. But I can see displaying graphs as a nice to have for financial quarters.

- Kitchen Predictions

  - User should be able to receive menu item recommendation preparation based on the completed orders made throughout the kitchen order history.
    - ie. 2:00 - 3:00 prepare 2 more servings of fries because it's indicated from the order history that fries are ordered more than the average amount of ordered fries
  - Kitchen Predictions should update based on any new orders

- Inventory

  - List of ingredients stock and the quantity of each ingredient
    - User should be able to update the ingredient quantity, and when they update the ingredient quantity, the UI should display the updated ingredient quantity
  - Threshold level
    - When current ingredient quantity reaches or goes below threshold level, the ingredient item gets automatically ordered
    - When the item gets automatically ordered, the ingredient quantity gets automatically updated
  - Unit cost per ingredient
    - Maybe display a market price to compare current price
  - Next date of order
    - When the computer local date reaches the next date of order, the system will automatically make a set quantity of ingredients being ordered
    - When the computer makes the automatic order, the current ingredient quantity gets updated
    - When the computer makes the automatic order, the next date of order changes for a future date depending on the current quantity of ingredients and how frequently the ingredient gets ordered
  - Order additional ingredient items
    - User should be able to select quantity
    - Display order total based on the item quantity
    - When clicking the make order button, the ingredient quantity updates according to the amount ordered

- Profitability
  - Display menu item, ingredients, profits, and expenses
    - Displays each ingredient individual cost
    - Uses price of menu to calculate profit of menu item
    - Using restaurant order history, track the amount of profit this menu item has brought in
  - Waste management of ingredients
    - Maybe it makes more sense to have the waste management for each ingredient item in the Invnetory page
    - Displays each ingredient item, the amount wasted for the item today, the total amount of ingredients wasted in a month, and in a year, and the total amount of money lost in the item being wasted
    - When the ingredient item waste quantity gets updated, the inventory ingredient item should also be updated to reflect the waste

## Design

V0

![A dark-themed restaurant management dashboard shows active orders, kitchen predictions, inventory status, and revenue. It conveys an organized, efficient tone.](./client/src/assets/readme/v0Design.gif)

Lovable

![A Restaurant Manager app interface displaying a menu section with tabs for different food categories. Images of dishes like crispy calamari and salmon are visible under menu selections. The tone is professional and organized.
](./client/src/assets/readme/lovableDesign.gif)

## File Organization

- `client`
  - `app`
    - `components`
      - `kitchen`
        - `TicketInterfaces.ts`
        - `Ticket.tsx`
        - `TicketMenuItem.tsx`
        - `updateTickets.ts`
      - `menu`
        - `MenuCategory.tsx`
        - `MenuInterfaces.ts`
        - `MenuItem.tsx`
      - `cart`
        - `CartInterfaces.ts`
        - `CartItem.tsx`
        - `OrderSummary.tsx`
        - `RenderInstructions.tsx`
      - `ui`
        - `button.tsx`
        - `card.tsx`
        - `badge.tsx`
        - `textarea.tsx`
        - `input.tsx`
        - `tabs.tsx`
    - `hooks`
      - `cart`
        - `addToCart.ts`
        - `editCartItem.ts`
        - `deleteCartItem.ts`
      - `ticket`
        - `editTicket.ts`
    - `static`
      - `labels.ts`
      - `menuItems.ts`
    - `pages`
      - `home.tsx`
      - `cart.tsx`
      - `kitchen.tsx`
    - `assets`
      - `readme`
    - `routes.ts`
    - `root.tsx`
- `server`
  - `config`
    - `db.ts`
  - `controllers`
    - `cart.ts`
    - `ticket.ts`
  - `routes`
    - `cart.ts`
    - `ticket.ts`
  - `server.ts`

## Interfaces

### Menu Item Card

Located in `components/menu/MenuInterfaces.ts`

```typescript
interface IMenuItem {
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}
```

### Cart Item

Located in `components/cart/CartInterfaces.ts`

```typescript
interface ICartItem {
  name: string;
  price: number;
  quantity: number;
  instructions?: string;
}
```

### Cart Ticket

Located in `components/kitchen/TicketInterfaces.ts`

```typescript
interface ICartTicket extends ICartItem {
  status: string;
}
```

### Order Item

Located in `components/cart/handleOrder.ts`

```typescript
interface IOrder extends ICartItem {
  status: string;
}
```

### Ticket

Located in `components/kitchen/TicketInterfaces.ts`

```typescript
interface ITicket {
  _id: string;
  ticketNum: number;
  items: ICartTicket[];
  status: string;
  orderTime: string;
}
```

### Add to Cart

Located in `hooks/cart/addToCart.ts`

```typescript
interface IAddToCartProps {
  name: string;
  price: number;
  quantity: number;
  instructions?: string;
}
```

## Components

Menu Item card component

### Design

![A menu card for a Classic Burger priced at $12.99, featuring a juicy beef patty, lettuce, tomato, and special sauce. Includes add to cart button.](./client/src/assets/readme/menuCardDesign.png)

### Color

![Close-up of three bruschetta slices on a wooden board, topped with tomatoes, olives, basil, and parsley. Price: $8.99. Button: "Add to Order."](./client/src/assets/readme/menuCardColor.png)

### Current

![Three anime characters in dynamic poses, surrounded by fiery effects. Below, a "Classic Burger" description and an "Add to Order" button.](./client/src/assets/readme/menuCard.png)

Category component

### Design

![Menu bar with tabs labeled All Items, Appetizers, Main Courses, Sides, Desserts, and Drinks. The All Items tab is highlighted in white text.](./client/src/assets/readme/categoryDesign.png)

### Color

![Navigation menu with four options: 'Menu & Orders' highlighted in coral, followed by 'Kitchen,' 'Inventory,' and 'Profitability' in black text.](./client/src/assets/readme/categoryColor.png)

### Current

![A menu interface showing a Caesar Salad with romaine, cheese, and croutons for $9.99, plus Garlic Bread and Bruschetta options labeled as appetizers.](./client/src/assets/readme/category.png)

Cart component

### Design

!["Digital food order cart with items: 2 Classic Burgers, 1 French Fries, 2 Iced Teas, special instructions added. Order Summary shows total as $39.91 with a button to 'Send to Kitchen'."](./client/src/assets/readme/cartDesign.png)

### Color

![Order form for a soft drink priced at $2.99, with quantity buttons and an input for special instructions. Total is $2.99. "Place Order" button visible.](./client/src/assets/readme/cartColor.png)

### Current

![Cart summary on a webpage with 12 Caesar Salads for $119.88 and 2 Classic Burgers for $25.98. Total order: $211.62. Checkout button visible.](./client/src/assets/readme/cart.png)

![Cart interface showing Caesar Salad and Classic Burger orders. Quantities, prices, and an Order Summary with checkout button are displayed.](./client/src/assets/readme/cartSummary.gif)

Kitchen component

### Design

![Order summary card titled "Order #ORD-001" showing "In Progress" status. Items: Classic Burger (crossed out), French Fries, Iced Tea with extra ice.](./client/src/assets/readme/kitchenTicketCardDesign.png)

### Color

![Order ticket on a screen showing "In Progress" status. Fettuccine Alfredo is struck through with "extra sauce on the side," and there are 2 iced teas.](./client/src/assets/readme/kitchenTicketCardColor.png)

### Current

![Restaurant order dashboard with three tickets showing status: "in progress," "pending," and "completed." Includes Caesar salads, burgers, pizza, and more.](./client/src/assets/readme/kitchenTicketCard.gif)

## Hooks

### Cart

`addToCart.ts`

event handler for adding a menu item to the cart by making a POST request to the backend and creating a new document in the database collection

`editCartItem.ts`

mutation handler for editing a cart item by making a PATCH request to the backend and updating the document in the database collection

`deleteCartItem.ts`

mutation handler for deleting a cart item by making a DELETE request to the backend and deleting the document in the database collection

### Ticket

`editTicket.ts`

mutation handler for editing a ticket by making a PATCH request to the backend and updating the document in the database collection

## Reducers

## Backend Routes

### Cart

GET /cart

returns a json array of cart items consisting of the name, price, quantity, and instructions of the menu item

POST /addToCart

creates a new document in the cart collection with the name, price, quantity, and instructions of the menu item

### Ticket

GET /tickets

returns a json array of ticket items consisting of the name, price, quantity, menu items, ticket status, and instructions of the menu item

POST /ticket

creates a new document in the ticket collection with the name, price, quantity, menu items, ticket status, and instructions of the menu item

PUT /ticket/:id

updates a document in the ticket collection with the name, price, quantity, menu items, ticket status, and instructions of the menu item

DELETE /ticket/:id

deletes a document in the ticket collection

## Database Design

- `restaurant`
  - `cart`
    - name
    - price
    - quantity
    - instructions
  - `ticket`
    - name
    - price
    - quantity
    - menu items
      - name
      - price
      - quantity
      - instructions
      - status
    - ticket status
    - instructions

## Dependencies

Frontend:

- Utilty-First CSS framework: Tailwind CSS
- UI Component Library: Shadcn UI
- Router: React Router
- Data fetching: Tanstack Query
- HTTP request library: axios
  Backend:
- Database: MongoDB
- Cors: cors
- Environment variables: dotenv
- Cors types: @types/cors
- Express types: @types/express
- Node types: @types/node

## Tech Stacks

Frontend:

- Frontend: Typescript
- Library: React
- Build tool: Vite
  Backend:
- Runtime environment: Node.js
- Framework: Express
- Language: Typescript
