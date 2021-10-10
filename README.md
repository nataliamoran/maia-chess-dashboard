### Deliverable 1 Planning Document
https://github.com/csc301-fall-2021/team-project-4-csslab-uoft/tree/main/deliverable-1

### Deliverable 1 Mockups
https://angelyuan218063.invisionapp.com/prototype/maia-chess-ckuaa4ek700agth01x08c0nbw/play/4b27e4b5

# Local environment installation guidelines
## Dependencies
In order to run this you need the following installed:
* docker
* python3.8
* virtualenv

## Create virtualenv
Follow instructions in `scripts/setup_local.sh`

## Running mongodb container 
Install Docker and run from the top directory of the project:
```
docker-compose up
```
To test that it works, go to `http://localhost:27017` in your browser,
You should see a message: `It looks like you are trying to access MongoDB over HTTP on the native driver port.`.

If you do not see this message, something is wrong starting mongodb container.

If you want to reset the local mongo database: 
1. Terminate the `docker-compose` process.
2. Delete all files from `mongo_data` using this command:
   ```
   rm -rf mongo_data/*
   ```
   Notice there is a hidden file `.gitkeep` so the directory will be created when pulling from git - 
   Do not delete this file.

## Running backend
You can either run the server from the command line using this command from the `backend` directory:
```
uvicorn main:app --host 0.0.0.0 --port 7000
```

Or alternatively, you can run the `main.py` using your IDE.
If you wish to change the port the app is running on, you can change this line in `main.py`
```
uvicorn.run(app, host="0.0.0.0", port=8000) # << Change port
```

If you want your FastAPI to point to a different mongo database, you 
can set an environment variable `MONGODB_URL` to where you have your mongodb instance.

To check that your backend works, go to `http://localhost:7000/docs` - you should see the 
FastAPI openapi doc and you can test the basic API (students CRUD).

## Running frontend

> IMPORTANT
>
> Notice you need to proxy requests to the backend on port 7000 - 
In order to do that, add in `packages.json` the line:
>```
>{
>  "name": "frontend",
>  ...
>  "scripts": {
>    ...
>  },
>  "proxy": "http://127.0.0.1:7000",   ### <--- This line
>}
>```
>
> Do not commit this line otherwise the deployment will fail.

From the `frontend` directory, run 
```
npm start
```
This will start the react app locally. 
