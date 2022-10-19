// TODO: Include packages needed for this application
const inquirer= require('inquirer');
var generateMarkdown=require('./utils/generateMarkdown');
const fs=require("fs");

// TODO: Create an array of questions for user input
var questions=
[
    {
      type: 'input',
      message: 'What is title if your project?',
      name: 'title',
      default: 'Project title'
    },
    {
      type: 'input',
      message: 'type github username',
      name: 'username',
      default: 'rogseo'
    },
    {
      type: 'input',
      message: "What is the name of your GitHub repo?",
      name: 'repo',
      default: 'readme-generator',
      validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;}
    },
    {
      type: 'input',
      message: 'type your email address',
      name: 'email',
      default :'1234@gmail.com'
    },
    {
      type: 'input',
      message: 'Describe your project',
      name: 'description',
      default: 'Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:'
    },
    {
      type: 'input', //installation instructions
      message: 'If applicable, Enter Installation instructions:',
      name: 'installation',
      default:'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.'
    },
    {
      type: 'input', //usage information
      message: 'usage information',
      name: 'usage',
      default :'Provide instructions and examples for use. Include screenshots as needed.'
    },
    {
      type: 'input', //contribution guidelines
      message: 'contribution',
      name: 'contribution',
      default:"If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer."
    },
    {
      type: 'input', //test instructions
      message: 'test instructions',
      name: 'test',
      default:'Go the extra mile and write tests for your application. Then provide examples on how to run them here.'
    },
    {
      type: 'list', 
      message: 'Choose a license for your project.',
      name: 'license',
      choices: ['MIT','Apache','Boost','BSD','Eclipse','IBM','Mozilla']
    },
  ];
 



// TODO: Create a function to write README file
function writeToFile(fileName, markdown) {
  fs.writeFile(fileName, markdown, (err) =>
  err ? console.error(err) : console.log('Success!')
);

}

// TODO: Create a function to initialize app
async function init() {
   
  // Prompt Inquirer questions
  const responses = await inquirer.prompt(questions);
  console.log("Your responses: ", responses);
  console.log("your license ",responses.license);
 
  // // Call GitHub api for user info
  // const userInfo = await api.getUser(userResponses);
  // console.log("Your GitHub user info: ", userInfo);

  // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
  console.log("Generating your README...")
  const markdown = generateMarkdown(responses);
  console.log(markdown);

  // Write markdown to file
  await writeToFile('ExampleREADME.md', markdown);


}

// Function call to initialize app
init();
