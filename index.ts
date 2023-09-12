import readline from 'readline';
import chalk from 'chalk';

class student {
  constructor(public id: number, public name: string, public grade: number) {}
}

class StudentManagementSystem {
  private students: student[] = [];

  addStudent(student: student) {
    this.students.push(student);
  }

  listStudents() {
    console.log(chalk.yellow("\nStudent List:"));
    this.students.forEach((student) => {
      console.log(`ID: ${student.id}, Name: ${student.name}, Grade: ${student.grade}`);
    });
  }
}

const studentSystem = new StudentManagementSystem();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function main() {
  console.log(chalk.bold("\nStudent Management System CLI"));

  rl.question("\nOptions:\n1. Add Student\n2. List Students\n3. Exit\nEnter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter student ID: ", (idInput) => {
          rl.question("Enter student name: ", (nameInput) => {
            rl.question("Enter student grade: ", (gradeInput) => {
              const id = parseInt(idInput);
              const name = nameInput;
              const grade = parseFloat(gradeInput);

              if (!isNaN(id) && !isNaN(grade)) {
                const newStudent = new student(id, name, grade);
                studentSystem.addStudent(newStudent);
                console.log(chalk.green("Student added successfully."));
              } else {
                console.log(chalk.red("Invalid input. ID and grade must be numbers."));
              }
              main(); // Restart the main loop
            });
          });
        });
        break;

      case "2":
        studentSystem.listStudents();
        main(); // Restart the main loop
        break;

      case "3":
        console.log("Exiting...");
        rl.close();
        break;

      default:
        console.log("Invalid choice. Please try again.");
        main(); // Restart the main loop
    }
  });
}

main();
