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

    const ordersSql = `INSERT INTO orders (customer_id) VALUES (?)`;
    let orderId = null;

    try {
      [orderResults, _fields] = await connection.execute(ordersSql, [customerId]);
      orderId = orderResults.insertId;
      console.log("Order was created with id: ", orderId);
    } catch (error) {
      console.log("Order creating failed!");
      console.log(`We got an error: "${error.message}".`);
      return;
    }

    const productOrdersSql = `INSERT INTO order_has_product (order_id, product_id, quantity) VALUES ?`;
    const productOrdersNewValues = [];
    const orders = req.body.orders;

    orders.forEach((order) => productOrdersNewValues.push([orderId, order.productId, order.quantity]));

    try {
      await connection.query(productOrdersSql, [productOrdersNewValues]);
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
    ["Cyberpunk 2077", "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.", 69.99, "cyberpunk.png", "RPG"],
    ["Death Stranding", "From legendary game creator Hideo Kojima comes an all-new, genre-defying experience.Sam Bridges must brave a world utterly transformed by the Death Stranding. Carrying the disconnected remnants of our future in his hands, he embarks on a journey to reconnect the shattered world one step at a time. Starring Norman Reedus, Mads Mikkelsen, Léa Seydoux, and Lindsay Wagner.", 50.99, "Death-Stranding.png", "Adventure"],
    ["Call of duty", "Black Ops Cold War will drop fans into the depths of the Cold War’s volatile geopolitical battle of the early 1980s. Nothing is ever as it seems in a gripping single-player Campaign, where players will come face-to-face with historical figures and hard truths, as they battle around the globe through iconic locales like East Berlin, Vietnam, Turkey, Soviet KGB headquarters, and more.Black Ops Cold War will drop fans into the depths of the Cold War’s volatile geopolitical battle of the early 1980s. Nothing is ever as it seems in a gripping single-player Campaign, where players will come face-to-face with historical figures and hard truths, as they battle around the globe through iconic locales like East Berlin, Vietnam, Turkey, Soviet KGB headquarters, and more.As elite operatives, you will follow the trail of a shadowy figure named Perseus who is on a mission to destabilize the global balance of power and change the course of history. Descend into the dark center of this global conspiracy alongside iconic characters Woods, Mason and Hudson, and a new cast of operatives attempting to stop a plot decades in the making. Beyond the Campaign, players will bring a Cold War arsenal of weapons and equipment into the next generation of Multiplayer and Zombies experiences.", 69.99, "call_of_duty.png", "Action"],
    ["Mafia II: Definitive Edition", "Part two of the Mafia crime saga – 1940’s - 50’s Empire Bay, NY. Remastered in HD, live the life of a gangster during the Golden-era of organized crime. War hero Vito Scaletta becomes entangled with the mob in hopes of paying his father’s debts. Alongside his buddy Joe, Vito works to prove himself, climbing the family ladder with crimes of larger reward, status and consequence. Inspired by iconic mafia dramas, be immersed in the allure and impossible escape of life as a wise guy in the Mafia. Post-World War 2 Empire Bay, NY, a city sprawling with opportunity and where organized crime thrives on the booming industries of post-war America. For the first-time ever experience the Mafia II crime drama all in one package and presented in stunning HD detail.", 30.99, "Mafia.jpg", "Action/Adventure"],
    ["Counter-Strike: Global Offensive", "Counter-Strike: Global Offensive (CS: GO) will expand upon the team-based action gameplay that it pioneered when it was launched years ago.", 12, "counter-strike.png", "Shooter"],
    ["The Witcher 3: Wild Hunt GAME OF THE YEAR EDITION", "Play the most polished and complete version of the most awarded game of 2015 - The Witcher 3: Wild Hunt. Now available with all expansions and additional content. Upon its release, The Witcher 3: Wild Hunt became an instant classic, claiming over 250 Game of the Year awards. Now you can enjoy this huge, over 100-hour long, open-world adventure along with both its story-driven expansions worth an extra 50 hours of gameplay. This edition includes all additional content - new weapons, armor, companion outfits, new game mode and side quests.", 17, "the-witcher-3.png", "RPG"],
    ["Spongebob SquarePants: Battle for Bikini Bottom - Rehydrated", "Are you ready, kids? The cult classic is back, faithfully remade in spongetastic splendor! Play as SpongeBob, Patrick and Sandy and show the evil Plankton that crime pays even less than Mr. Krabs. Want to save Bikini Bottom from lots of rampant robots? Of course you do! Want to underpants bungee jump? Why wouldn't you! Want to join forces in a brand new multiplayer mode? The battle is on! ", 25.99, "spongebob.png", "Action/Adventure"],
    ["GTA V Premium Edition", "The Grand Theft Auto V: Premium Edition includes the complete Grand Theft Auto V story experience, free access to the ever-evolving Grand Theft Auto Online and all existing gameplay upgrades and content including The Doomsday Heist, Gunrunning, Smuggler’s Run, Bikers and much more. You’ll also get the Criminal Enterprise Starter Pack, the fastest way to jumpstart your criminal empire in Grand Theft Auto Online.", 18.99, "grand_theft_auto.png", "Shooter"],
    ["Minecraft Starter Collection", "Create. Explore. Survive. Minecraft is a game about placing blocks and going on adventures. Create anything you can imagine. Explore the mighty mountains and living oceans of infinite worlds, expanded further by free game updates, amazing community-made maps, servers, thrilling minigames and more! Survive online with friends who are on console, mobile, and Windows 10, or share the adventure at home in split-screen multiplayer. ", 25.99, "minecraft.jpg", "Simulation"],
    ["Battlefield 1", "Fight your way through epic battles ranging from tight urban combat in a besieged French city to the heavily defended mountain forts in the Italian Alps, or frantic combats in the deserts of Arabia. Discover a world at war through an adventure-filled campaign, or join in epic multiplayer battles with up to 64 players, and adapt your tactics to the earth-shattering destruction and dynamic weather. Fight as infantry, lead horse charges or take control of amazing vehicles on land, air and sea, from tanks and biplanes to the gigantic Behemoths – some of the largest vehicles in Battlefield history. ", 19.99, "battlefield-1.jpg", "Battlefield"],
    ["Resident Evil VII Deluxe Edition", "Resident Evil 7 biohazard is the next major entry in the renowned Resident Evil series and sets a new course for the franchise as it leverages its roots and opens the door to a truly terrifying horror experience. A dramatic new shift for the series to first person view in a photorealistic style powered by Capcom’s new RE Engine, Resident Evil 7 delivers an unprecedented level of immersion that brings the thrilling horror up close and personal.", 64.99, "resident_evil.jpg", "Horror"],
    ["Mass Effect", "Mass Effect invites players to take the role of Commander Shepard as they set out on an adventure to save the galaxy from imminent destruction ", 14.99, "mass-effect.jpg", "RPG"],
    ["Sid Meier's Civilization VI", "Civilization VI offers new ways to interact with your world, expand your empire across the map, advance your culture, and compete against history’s greatest leaders to build a civilization that will stand the test of time.", 49.99, "civilization.jpg", "Strategy"],
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
