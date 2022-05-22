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
uvicorn main:app --host 0.0.0.0 --port 8000
```

Or alternatively, you can run the `main.py` using your IDE.
If you wish to change the port the app is running on, you can change this line in `main.py`
```
uvicorn.run(app, host="0.0.0.0", port=8000) # << Change port
```

If you want your FastAPI to point to a different mongo database, you 
can set an environment variable `MONGODB_URL` to where you have your mongodb instance.

To check that your backend works, go to `http://localhost:8000/api/docs` - you should see the 
FastAPI openapi doc.

## Running frontend

From the `frontend` directory, run 
```
yarn install
npm start
```
This will start the react app locally.

## License

This software is licensed by GNU GPL v3.
 
This software is provided without warranty and all authors of this software will not be held liable for any damages inflicted by the software.
 
This license gives the user the freedom to run, study, share and modify the software. However, since GNU GPL v3 is a copyleft license, all derivative works from this software must be licensed by GNU GPL v3 as well.
 
The end user is free to use this software for commercial purposes however this license requires that the source code must be made available when the software is distributed.
 
We chose this license after discussions with our partner, CSSLab, regarding the purpose of this software. In the near future, this software will be published alongside a study produced by the CSSLab, therefore it is important we choose a license which allows all users to freely modify and distribute this software.
