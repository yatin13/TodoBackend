# TodoBackend
This is a backend for Todo application build on top of Nodejs and database as PostgreSQL


##Steps to Setup

1. **Clone the repository**: Download the project to your local system using Git.  
2. **Navigate to the project folder**: Move into the project directory where the code is stored.  
3. **Install dependencies**: Run `npm install` to install all required packages.  
4. **Add environment variables**: Create a `.env` file in the root directory and add the following variables:  

   ```env
   NODE_ENV="development"
   JWT_SECRET="your_secret_key"
   USER_PASSWORD="database_user_password"
   USER_NAME="database_user_name"
   DB_NAME="database_name"
   PORT=3008
   DB_PORT="database_port"
5. **For DataBase Connectivity**: Make sure you have postgre installed on your system , give the name of database (any you want) and then run `npx knex migrate:latest` for setting up tables locally on database.
6. **Access the application**: Open the command prompt and run `npm start` to see backend running on port 3008.
