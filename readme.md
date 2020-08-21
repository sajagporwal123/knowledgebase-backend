## Knowledge Base

## Requirements

For development, you will only need Node.js(v12.7.0) and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.7.0

    $ npm --version
    6.10.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

## Database
### MongoDB (v4.0)

- The project uses MongoDB as a database. If you are on Mac and using Homebrew package manager the installation is as simple as brew install mongodb.

- Start the MongoDB server
First we need to create the db directory where the database files will live in. 
In your terminal navigate to the root of your system by doing cd .. until you reach the top directory. 
You can create the directory by running sudo mkdir -p /data/db. Now open a different tab in your terminal and run mongod to start the Mongo server.

- You can import MongoDb Dump by following this link https://docs.mongodb.com/guides/server/import/

### Mysql (5.0.2)

- Install MySql in your system and create database and run the project Sequalize will create tables. 
- You can import Mysql Dump by following this link https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html      

---

## Install

    $ git clone https://github.com/sajagporwal123/knowledgebase-backend
    $ cd knowledgebase-backend
    $ npm install

## Configure app

## ENV

Create the .env file in the root directory project Copy and paste the following environment variables.or just rename the sample.env file to .env

```
# ENVIRONMENT
NODE_ENV=DEVELOPMENT

# DATABASE
USER_DB_HOST = 0.0.0.0
USER_DB_PORT = #####
USER_DB_USER = ####
USER_DB_PASSWORD = ############
USER_DB_DATABSE = ############

CONTENT_DB_HOST = 0.0.0.0
CONTENT_DB_PORT = ####
CONTENT_DB_USER = ###
CONTENT_DB_PASSWORD = ############
CONTENT_DB_DATABSE = ############

# SERVER
SERVER_PORT = 3000

# LOGS
SHOW_LOG = true

# TIMEZONE
TIMEZONE = Asia/Kolkata

# PASSWORD
SALT_ROUNDS = 10

# JWT 
SECRET_KEY = #########################

# AWS
AWS_ACCESS_KEY = ########################
AWS_SECRET_KEY = ########################
S3_BUCKET_NAME = ########################
CONTENT_PATH = ########################
S3_CONTENT_BUCKET_PATH = ########################
```


## Run the Application

- The project is preconfigured with a simple development web server. The simplest way to start this server is:

npm start

- If You have nodemon use nodemon server.js or simply nodemon

## Folder Structure

- db, is the folder with all models for database.
- config, is the folder with all environment cofiguration
- helper, is the folder with all reuseable functions/validators
- modules, is the folder with all features/modules
- Controller file contains the business logic
- Service files contains the datbase queries
- Route files contains routes