# ComploMeetServer

To develop on this project you need a .env containing the following env variables:

DB_IP           # Ip of the db
DB_NAME         # name of the db
DB_USER         # user name of the db
DB_PASSWORD     # password of the user on the db
SECRET_TOKEN    # secret token for hashing password

Then use the command `npm install` and optionnaly `npm intall -g nodemon`

The app can then be served with either of this commands:

`node index`
`nodemon index`

The later will restart the server on file change.
