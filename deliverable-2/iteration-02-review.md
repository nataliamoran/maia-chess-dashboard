# Maia Dashboard / anti-semicolon-semicolon-club

## Iteration 02 - Review & Retrospect

 * When: Thursday, October 28 @3pm
 * Where: PT266, UofT

## Process - Reflection


#### Q1. Decisions that turned out well
 
 #### Division into `frontend` and `backend` sub-teams
 It was a great decision to divide our team into `frontend` and `backend` sub-teams, 
 each of which had their meetings and work planning separately 
 (in addition to weekly team meetings and weekly meetings with the partner). 
 This allowed us to share responsibilities efficiently and develop the frontend and backend in parallel. 
 
 Working in sub-teams helped us to concentrate on our own part of work 
 and discuss backend / frontend implementation in more details during sub-team meetings, 
 rather than if we did it during a general team meeting. 
 
 Also, this division created a bigger sense of ownership because each sub-team was solely responsible for their part.    

 #### Drafting API documentation before implementing API
 Before implementing API we drafted its documentation to agree on how the frontend and backend will communicate.
 This was a good decision because it allowed frontend and backend developers to not be dependent on each other:
 once we agreed on the API abstraction, each sub-team could develop their part on their own 
 without being blocked by another sub-team.
 
 In addition, drafting the API documentation before developing the API helped to clarify requirements with the partner.
 ![API](./images/api.png)
 
 #### Choosing the tech stack based on the Partner's preference
 Although our team is more familiar with the Django framework and relational databases (e.g. PostgreSQL)
 and wanted to use technologies which we already know,
 the Partner asked to implement the project with FastAPI (instead of Django) and MongoDB (instead of PostgreSQL).
 The team agreed to use the tech stack preferred by the Partner, which turned out to be a good decision because
 it allowed the Partner to actively participate in the project planning. 
 Because after December 2021 the Partner will be working on the project 
 and will have to maintain the project without the team, it is crucial that 
 the Partner understands and agrees with the project's structure and, especially, the Rest API part
 (because the Dashboard API that we are building will be re-used for other Maia projects in the future). 

#### Q2. Decisions that did not turn out as well as we hoped

 #### Not following on our plan to do daily stand up meetings
 Although we planned to have daily 15-minute stand up meetings once we start developing,
 in the reality we did not follow through with this plan due to the lack of time. 
 
 The decision to skip daily stand up meetings results in developers forgetting about their personal deadlines 
 without an additional reminder at a stand up meeting.
 
 #### Not assigning a team member responsible for meeting minutes
 In the beginning of the project our team decided to rotate the responsibility of writing meeting minutes between all team members instead of assigning it to one team member. 
 As a result of this, the task of writing meeting minutes fell through the cracks. 
 For example, the meeting minutes for 2021-10-14 and 2021-10-21 meetings with the partner were actually 
 written by one of the team members on October 25. 
 These meeting minutes are based on memories of what happened at the meetings 
 instead of being written during the meetings, which is not optimal.

#### Q3. Planned changes

Most of the process-related planning up to deliverable 2 has worked out well. Our team has found time to setup meetings with the partner as well as brief meetings on Tuesday in which
the individual members can discuss their progress and future plans. We have also setup a Slack to which we have dynamically added channels (e.g. frontend/backend) to further improve our
workflow and communication. However, there do exist some minor issues which we plan to improve upon. From most to least important:

#### Improve the team's interaction with Trello
As of now we are creating "tickets" on Trello to organize which team members tackle which functionalities. Although this has allowed us to keep track of which tasks need working on, members did
not always update their ticket state (e.g from in development to finished). This ended up causing some confusion as member's could not track other's progress as intended.

#### Improve meeting minutes
We had planned but did not follow through with writing meeting minutes on a rotational schedule. We will work on a way to notify team members who are responsible for given meetings. 
This could improve the quality of notes and make it harder to overlook specific requests made by the partner. 


#### Simplify the Slack channel list
As of now our team uses Slack for communication. The many themed channels allow us to organize our questions, comments and information. However, there do exist several channels which we have made
little to no use of. We believe removing redundant channels could make tracking messages on Slack even easier. 

## Product - Review

#### Q4. How was your product demo?

 ##### How did you prepare your demo?
 Luckily our partner is very technically inclined, so we planned to show our
 application from the top down. Angel represented the frontend team and prepared
 to present all the features from filters, board states, stats etc... Natalia prepared a presentation
of the tech stack our application used (mongo, fastapi, python, yarn, react, shell etc...)
 Kevin prepared various chess board formats to show to the partner and get their 
 approval of the formats and that they fit all the specifications needed by the 
 frontend team. Sina prepared the backend API calls, such as event logging, user 
 profile fetching, oauth logins, etc ... . The use of the partner prepared library 
 maia-lib was also prepared to be reviewed as to ensure the team uses it correctly
 in the next deliverable where the majority of data crunching and ML analysis will
 be done. 
 
##### What did you manage to demo to your partner?
*Frontend:* <br/>
Different chess boards, game states, arrows for move comparisons between
Stockfish to Maia to user, main game stats (performance, trickiness, entropy),
favicon for the web page and layout of components, and filtering games by the game stats.

*Project Structure:* <br/>
Showed the partner our implementation of FastAPI, how we 
implemented some of the API code he provided us, how the routers and databases are 
set up to integrate with the API, the React project structure, the yarn package manager
for the frontend.

*Backend API*: <br/>
 Database structure, PGN and FEN chess formats, stubbed frontend data and 
schema to be communicated between front and back end, login, logout, event logging, adding users,
finding users, lichess user profile retrieval, lichess game retrieval, maia-lib installation and deployment.
 
##### Did your partner accept the features? 
The partner was satisfied and pleasantly surprised with the features we developed 
for Deliverable 2. Quoting him "This is a good start for this iteration of the project".
Obviously the features will be further developed for future deliverables but he was satisfied
with the starting features as promised. <br/>

Partner likes the front end feature of selecting different types of position, interesting, tricky etc…
He likes how it shows the last move, the stats of the game state, the stockfish move
 vs Maia move. Likes how its interactive for the user and the layout matches
expectations for a first draft. <br/>

Partnered approved of the FastAPI structure for how the API calls, models, 
etc … are set up. We integrated some of his code from the backend as well. <br/>

Partner approved of all features he required for us for this deliverable. He 
explained how the project will develop in later iterations and gave insights on 
what they will eventually add to the api calls. Features for database manipulation
etc.. were approved. <br/>

Partner approved on planned method to convert from chess notation PGN to FEN. 
Likes how the json data is structured at the moment. Stubbed data that is passed 
to the frontend looks good to him. 

He clapped his hands at the end :D

##### Were there change requests?
There was not a feature where the partner explicitly asked it to be changed. He did 
recommend various extensions of the features for us to deliver in future deliverables, all
of which we have listed below. (Note: all of these may not be developed purely for the span of 
CSC301, but will be wanted for a final deployment of this application): <br/>

* For users added to the DB, add a timestamp for last time we logged the users games.
* Add server time stamp to event post call. Add time stamp to EventModel
* Make mongo insert after return for mongo inserts in the API. FastAPI has a feature to do this.
* fastapi.BackgroundTasks for the above 
* Recommended adding a feedback form under the filters for Deliverable 3 to send feedback to the team.
* Recommended adding additional filters, so sort the games by the current filters, and send a json with some options to filter additionally (moves that im white, moves im at this position etc…)
^ this can be implemented by sending a query directly from the user to the mongoDB
* *only pull rated games from lichess*
* *only pull valid game modes (not anti-chess etc...)*
* Log user profile request to database as well.
* Use JWT to login users to Maia
* Add lichess api call to grab games from the last 30 days.
*Write each model maia_kd_1xxx as a new entry to a dictionary for the same game as its different models analyzing the same game
Ex: maia_kdd_1200-lxHs7sJd8

 ##### What did you learn from the demo from either a process or product perspective?
 Our partner is generally happy with our product, but there is still much work that needs to be done, to
 bring the product deployment. Our process of development thanks to our organizaiton using Trello boards,
 slack, weekely meetings, and end-specific chats, help the process go extremely smoothly. The backend
 and front end teams are able to develop in parallel without needing to communicate with one another too much,
 as long as the contracts for what data is passed back and forth is reached. The product still has a 
 far way to go in terms of optimization of hardware, and the intended user scope of this project is quite vast,
 which means that our work has to and is being done with the upmost care. The partner’s 
 feedback concentrated on improvements of the current functionality and additional features
  which we did not discuss before. This means that we successfully understood, planned and
  implemented the basics of this project in accordance with the partner’s vision, and now 
  it is time to think about additional functionality.



