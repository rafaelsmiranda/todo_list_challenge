# EdirectInsure Code Challenge
Simple ToDo app done with React with backend made with NodeJS.

To run the project you will need a simple local instance os PostgreSQL:  
`docker run -p 5432:5432 --name postgresql -e POSTGRES_PASSWORD=password -d postgres`

Start the backend:  
`cd backend`  
`yarn start`

Start the frontend:  
`cd frontend`  
`yarn start`

Due to time restrictions and the fact that I don't touch frontend development for three years (and never used React), I must state the following:
- the UI is not refined. Clearly lot can be done to improve it.
- there was a docker-compose to automate the execution but I had problems with Docker locally and could not test it properly.
- unit testing was left out. I would use Jest to at least test the backend, but couldn't spare the time.

All in all, I guess it was a interesting challenge, mainly because it was a full stack challenge with so little time.
