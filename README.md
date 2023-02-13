Before you start you need to init the following dependencies:
-Install mariadb
-Create a user which name is "admin" and password "root"
-Create a database called "admin_orders"

To init the proyect you need to run the following commands:

    $ npm install

To init database you need to run the following commands:

    $ npx prisma migrate dev

and then

    $ npm run dev    
