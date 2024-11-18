const fs = require("fs");
const readline = require("readline");

const filePath = "./tasks.json";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readTask() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeTask(task) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(task, null, 2), "utf8");
  } catch (error) {
    console.log("Error in Writing Task: ", error);
  }
}

function addTask() {
  rl.question("Enter the new task: ", (task) => {
    const tasks = readTask();
    const newTask = {
      name: task,
      complete: false,
    };
    tasks.push(newTask);
    writeTask(tasks);
    console.log("Task Added Successfully");
    showMenu();
  });
}

function viewTasks() {
  const tasks = readTask();
  if (tasks.length === 0) {
    console.log("No tasks available");
  } else {
    tasks.forEach((t, i) => {
      console.log(
        `${i + 1}. ${t.name} ---> ${t.complete ? "Completed" : "Pending"}`
      );
    });
  }
  showMenu();
}

function markTaskComplete() {
  const tasks = readTask();
  if (tasks.length === 0) {
    console.log("No task available to mark as completed.");
    showMenu();
    return;
  }
  rl.question("Enter the task number to mark as complete: ", (taskNumber) => {
    const index = taskNumber - 1;
    if (index >= 0 && index < tasks.length) {
      if (tasks[index].complete) {
        console.log("Task is already marked completed");
      } else {
        tasks[index].complete = true;
        writeTask(tasks);
        console.log("Mark Task Completed Successfully");
      }
    } else {
      console.log("Invalid task number");
    }
    showMenu();
  });

  showMenu();
}

function deleteTask() {
  const tasks = readTask();
  rl.question("Enter the task number to delete: ", (taskNumber) => {
    const index = taskNumber - 1;
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      writeTask(tasks);
      console.log("Task Deleted Successfully");
    } else {
      console.log("Invalid task number");
    }
    showMenu();
  });
}

function showMenu() {
  console.log("\n********************************");
  console.log("To-Do Console-Based Application");
  console.log("********************************");
  console.log("1. Add a Task");
  console.log("2. View Tasks");
  console.log("3. Mark Task as Complete");
  console.log("4. Delete Task");
  console.log("5. Exit");
  console.log("********************************\n");
  rl.question("Choose an option (1-5): ", handleMenu);
}

function handleMenu(choice) {
  switch (choice) {
    case "1":
      addTask();
      break;
    case "2":
      viewTasks();
      break;
    case "3":
      markTaskComplete();
      break;
    case "4":
      deleteTask();
      break;
    case "5":
      console.log("Exiting...");
      rl.close();
      break;
    default:
      console.log("Invalid option. Please try again.");
      showMenu();
      break;
  }
}

showMenu();
