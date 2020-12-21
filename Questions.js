const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const figlet = require("figlet");
const fs = require("fs");

const connect = async () => {
  const connectionPromise = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your MySQL username
    user: "root",
    // Your MySQL password
    password: "pineapple",
    database: "employees_db",
  });
  console.log("connected as id" + " " + connectionPromise.threadId);
  return connectionPromise;
};

console.log(figlet.textSync("employee\n Tracker"));

const employee = async (connectionPromise) => {
  await inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "what are you wanting to do?",
      choices: [
        "view employees",
        "update employees",
        "view departments",
        "update departments",
        "view jobs",
        "update jobs",
        "finish",
      ],
    })
    .then(async (results) => {
      console.log(results);
      switch (results.task) {
        case "view employees": {
          const [characters] = await connectionPromise.query(
            "SELECT * from employees"
          );
          console.table(characters);
          break;
        }
        case "view departments": {
          const [stores] = await connectionPromise.query(
            "SELECT * from departments"
          );
          console.table(stores);
          break;
        }
        case "view jobs": {
          const [work] = await connectionPromise.query("SELECT * from jobs");
          console.table(work);
          break;
        }
        case "finish":
          return;
      }
      return employee(connectionPromise);
    });
};

const updateStaff = async (connection) => {
  const [results, fields] = await connection.query("UPDATE products WHERE ?", [
    { employee: "" },
  ]);
};
const run = async () => {
  let connectionPromise;
  try {
    connectionPromise = await connect();
    await employee(connectionPromise);
  } catch (err) {
    console.error(err);
  } finally {
    if (connectionPromise) connectionPromise.end();
  }
};

run();
