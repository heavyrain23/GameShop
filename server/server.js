const { response, request } = require("express");

async function main() {
  const express = require("express"); /* express is module of node to make routers to database*/
  const mysql = require("mysql2/promise"); /*require mysql in node modules to use it*/
  const app = express(); /*initialize express*/
  const bodyParser = require("body-parser");

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "market",
    password: "room483",
    database: "market",
  });

  //Here we are configuring express to use body-parser as middle-ware.
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.listen(5000, async () => {
    console.log("App running on port 5000");

    const createQueries = [createProductsTable(connection), createCustomersTable(connection), createOrdersTable(connection), createOrderHasProductTable(connection)];

    await Promise.all(createQueries);

    const allProducts = await getAllProducts(connection);
    const isProductsEmpty = allProducts.length === 0;

    if (isProductsEmpty) {
      await insertDefaultProducts(connection);
    }
  });

  app.get("/products", async function (req, res) {
    const allProducts = await getAllProducts(connection);
    res.send(allProducts);
  });

  app.post("/customers", async function (req, res) {
    const customersSql = `INSERT INTO customers (first_name, second_name,phone_number,adress, postal_code, email) VALUES (?, ?, ?, ?, ?, ?)`;
    const customersValues = [req.body.firstName, req.body.secondName, req.body.phoneNumber, req.body.adress, req.body.postalCode, req.body.email];
    let customerId = null;

    try {
      const [customerResults, _fields] = await connection.execute(customersSql, customersValues);
      customerId = customerResults.insertId;
      console.log("Customer was created with id: ", customerId);
      console.log(req.body);
    } catch (error) {
      console.log("Customer creating failed!");
      console.log(`We got an error: "${error.message}".`);
      return;
    }

    const sql2 = `INSERT INTO orders (customer_id) VALUES (?)`;
    let orderId = null;

    try {
      [orderResults, _fields] = await connection.execute(sql2, [customerId]);
      orderId = orderResults.insertId;
      console.log("Order was created with id: ", orderId);
    } catch (error) {
      console.log("Order creating failed!");
      console.log(`We got an error: "${error.message}".`);
      return;
    }

    const sql3 = `INSERT INTO order_has_product (order_id, product_id, quantity) VALUES ?`;
    const values2 = [];
    const orders = req.body.orders;

    orders.forEach((order) => values2.push([orderId, order.productId, order.quantity]));

    try {
      await connection.query(sql3, [values2]);
      console.log("order_has_product_table was created with order_id: ", orderId);
    } catch (error) {
      console.log("order_has_product_table with order_id was creating failed!");
      console.log(`We got an error: "${error.message}".`);
    }
  });
}

async function getAllProducts(connection) {
  const sql = "SELECT * FROM products";
  let [products, _fields] = [[], {}];

  try {
    console.log("Fetching all products...");
    [products, _fields] = await connection.execute(sql);
    console.log("Fetching products succeeded!");
  } catch (error) {
    console.log("Fetching products failed!");
    console.log(`We got an error: "${error.message}".`);
  }

  return products;
}

async function createProductsTable(connection) {
  const sql = `CREATE TABLE IF NOT EXISTS products (
    id INT(100) AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL UNIQUE,
    price INT(100) NOT NULL,
    description VARCHAR(2000),
    image_name VARCHAR(1000),
    genre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
    )`;

  console.log("Creating products table if not exists...");

  try {
    await connection.execute(sql);
    console.log("Creating products table succeeded!");
  } catch (error) {
    console.log("Creating products table failed!");
    console.log(`We got an error: "${error.message}".`);
  }
}

async function createCustomersTable(connection) {
  const sql = `CREATE TABLE IF NOT EXISTS customers (
  id INT(100) AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  second_name VARCHAR(100) NOT NULL,
  phone_number INT(20) NOT NULL,
  adress VARCHAR(100) NOT NULL,
  postal_code CHAR(5) NOT NULL,
  email VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)`;

  try {
    console.log("Creating custmers table if not exists...");
    await connection.execute(sql);
    console.log("Creating customers table succeeded!");
  } catch (error) {
    console.log("Creating customers table failed!");
    console.log(`We got an error: "${error.message}".`);
  }
}

async function createOrdersTable(connection) {
  const sql = `CREATE TABLE IF NOT EXISTS orders (
  id INT(100) AUTO_INCREMENT,
  customer_id INT(100) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES customers(id))`;

  try {
    console.log("Creating orders table if not exists...");
    await connection.execute(sql);
    console.log("Creating orders table succeeded!");
  } catch (error) {
    console.log("Creating orders table failed!");
    console.log(`We got an error: "${error.message}".`);
  }
}

async function createOrderHasProductTable(connection) {
  const sql = `CREATE TABLE IF NOT EXISTS order_has_product (
  order_id INT(100),
  product_id INT(100),
  quantity INT(20) NOT NULL,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id))`;

  try {
    console.log("Creating OrderHasProductTable if not exists...");
    await connection.execute(sql);
    console.log("Creating OrderHasProductTable table succeeded!");
  } catch (error) {
    console.log("Creating OrderHasProductTable table failed!");
    console.log(`We got an error: "${error.message}".`);
  }
}

async function insertDefaultProducts(connection) {
  const sql = "INSERT INTO products (title, description, price, image_name, genre) VALUES ?";

  const values = [
    ["Cyberpunk 2077", "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.", 69.9, "cyberpunk", "RPG"],
    ["Death Stranding", "From legendary game creator Hideo Kojima comes an all-new, genre-defying experience.Sam Bridges must brave a world utterly transformed by the Death Stranding. Carrying the disconnected remnants of our future in his hands, he embarks on a journey to reconnect the shattered world one step at a time. Starring Norman Reedus, Mads Mikkelsen, Léa Seydoux, and Lindsay Wagner.", 50, "Death-Stranding", "Adventure"],
    ["Call of duty", "Black Ops Cold War will drop fans into the depths of the Cold War’s volatile geopolitical battle of the early 1980s. Nothing is ever as it seems in a gripping single-player Campaign, where players will come face-to-face with historical figures and hard truths, as they battle around the globe through iconic locales like East Berlin, Vietnam, Turkey, Soviet KGB headquarters, and more.Black Ops Cold War will drop fans into the depths of the Cold War’s volatile geopolitical battle of the early 1980s. Nothing is ever as it seems in a gripping single-player Campaign, where players will come face-to-face with historical figures and hard truths, as they battle around the globe through iconic locales like East Berlin, Vietnam, Turkey, Soviet KGB headquarters, and more.As elite operatives, you will follow the trail of a shadowy figure named Perseus who is on a mission to destabilize the global balance of power and change the course of history. Descend into the dark center of this global conspiracy alongside iconic characters Woods, Mason and Hudson, and a new cast of operatives attempting to stop a plot decades in the making. Beyond the Campaign, players will bring a Cold War arsenal of weapons and equipment into the next generation of Multiplayer and Zombies experiences.", 69.9, "call_of_duty", "Action"],
  ];

  try {
    console.log("Inserting products into products table.");
    await connection.query(sql, [values]);
    console.log("Inserting products into products table succeeded!");
  } catch (error) {
    console.log("Inserting products into products table failed!");
    console.log(`We got an error: "${error.message}".`);
  }
}

main();
