# Maia Dashboard / anti-semicolon-semicolon-club

## Product Details
 
### Q1: What are you planning to build?
We are planning to build an educational, fun and aesthetically pleasing web application 
in which users will be able to view and learn from their past chess games on [Lichess](https://lichess.org/). 

This application should be responsive and not limited to high end devices or internet connections. 
We plan to expose values computed by [CSSLab’s Maia Chess Project](https://maiachess.com/) in an intuitive 
and interactive way such that minimal effort is needed to navigate the website and derive strategies for improvement. 
For example, we will display a large chess board that will reflect the current board positions of a game. 
As users search through all board states, this chess board will update in real-time and use arrows 
and highlighted fields to showcase suboptimal play or interesting moves the user performed. 
Beyond allowing users to inspect single positions and games we will put a strong focus on providing an analysis 
of a user’s overall gameplay. To do this we plan to expose three key values: performance, entropy and trickiness. 

![Chess Board](./images/Q1.png)

:small_red_triangle: :small_red_triangle: :small_red_triangle: :small_red_triangle: :small_red_triangle:
[PLEASE CLICK HERE TO SEE THE INTERACTIVE MOCKUP](
https://angelyuan218063.invisionapp.com/prototype/ckuaa4ek700agth01x08c0nbw/play)
:small_red_triangle: :small_red_triangle: :small_red_triangle: :small_red_triangle: :small_red_triangle:

### Q2: Who are your target users?
Committed chess players from all over the world that want to improve on their chess skills.

* Teenager or a young adult learning to play chess on their phone, wanting to see their mistakes.
* Experienced chess player of any identity, wanting to improve their game level and to see difficult / tricky positions.  
* Elder person playing chess on their desktop for fun, wanting to see interesting chess positions.
* Chess-enthusiast playing out of appreciation for the beauty of the game, but not trying to improve their level.
* Social media influencer streaming chess games on Twitch.

**PERSONAS** 

| ![Amy](./images/Q2-amy.png)     | Amy, 26 (Lives in Australia)  <br />  <br /> **TECHNOLOGY/SKILLS:**<br /> Chess ★★★★✩ <br />Internet ★★★★★ <br />AI ✩✩✩✩✩ | 
| :---:       |    :----:   | 
| **BIO**         | Amy learned chess from her parents as a child. She has a regular 9 to 6 job. She has a stable but limited income. A stable relationship with her boyfriend. Chess is her hobby and she enjoys using her free time to play a few games online. She finds playing online is easily accessible, easy to find opponents, and meet up with her friends. She mainly plays with her phone and sometimes with her computer. | 
| **NEEDS**   | She has felt like she reached a bottleneck in chess and wants to improve her skills. She wants a platform to provide her feedback and help her learn and improve.       | 
| **FRUSTRATION**   | She is only willing to spend a very limited amount of money and is not willing to spend too much time. She wants the feedback to be easily accessible and specific to her.       | 


| ![Amy](./images/Q2-oliver.png)     | Oliver, 14 (Lives in India)  <br />  <br /> **TECHNOLOGY/SKILLS:**<br /> Chess ★★★✩✩ <br />Internet ★★✩✩✩ <br />AI ✩✩✩✩✩ | 
| :---:       |    :----:   | 
| **BIO**         | Oliver lives with his family. He does not have his own phone or computer, but sometimes he gets to use his mother’s phone. The usage is very restricted and he does not have good internet connections. He discovered chess from one of his friends and after learning the rules got very interested in it. He later discovered that he can play chess online. | 
| **NEEDS**   | When he was looking at the history of games he played, he discovered that he has been losing a lot. Oliver would like to get better at chess.      | 
| **FRUSTRATION**   | He can’t spend money on this and can’t spend a lot of time. The internet he uses is very unstable. Sometimes it becomes very slow and takes a long time for the page to respond.  | 

### Q3: Why would your users choose your product? What are they using today to solve their problem/need?
There are a lot of existing superhuman chess engines such as Stockfish that exist in the chess community. And there exist online platforms such as lichess that provide game-level feedback using those chess engines to the users. These platforms are currently used by users to help them improve on their chess skills. However, there are problems with these existing platforms that will cause a user to choose our product instead.

First, the optimal plays that those chess engines generate are often uninterpretable to a human user (as shown from our partner’s research). Since the human user can’t understand why the AI made those plays in the first place, it is hard for the user to learn from those plays and feedback. However, the AI (MAIA) our product will be using takes this in mind and produces human-like optimal plays that our user can understand and learn from. The user can more easier understand the feedback our product provide and more easier learn from it.

Second, the current platforms are lacking the ability to find mistakes, interesting moves, tricky moves, from an user’s game history. They are often focused on a specific game and only provide game-leve feedback. Our product goes beyond that and provide state-level feedback and general-level feedback. Also, the user can just search for something like their mistakes and it will display mistakes the user made from a range of games the user played in the past. Something other platforms does not provide. This is much easier for the user to use and see their mistakes and learn from their mistakes. The user will get a wider range of feedback specific to them that will help in their learning.

Our partner’s mission is to create an AI that acts as an algorithmic teaching tool to human users. Our project provides a platform to display the current AI our partner has and gather data from the users so our partner can use it in their research.


### Q4: How will you build it?

**TECHNOLOGY STACK**
* **Backend:** (pure) Python
    * Our team offered to use either pure Python or Django with Redis Message Queue for the backend to the Partner. The partner prefers to use pure Python. 
* **Frontend:** React
    * The partner's other projects are built in React. We decided to use React for Maia Dashboard as well to keep consistency between the partner's projects. 
* **Database:** MongoDB
    * The partner chose to use MongoDB because: 
        * MongoDB requires less memory than a relational database.
        * Partner prefers storing data as a JSON to make it easier to retrieve the data.
        * Partner uses MongoDB for their other projects.
* **API:** FastAPI
    * The partner is familiar with the FastAPI technology and used it previously for other projects. We chose to use FastAPI to make the project support easier for the partner.
* **Third-party API:** [Lichess API](https://lichess.org/api) 
    * Lichess API will be used to autheticate users and retrieve user games data for analysis.
* **CI/CD:** GitHub Actions
    * All our team members practiced using GitHub Actions for A1 so now it seems like a safe choice of CI/CD technology.
* **Hosting:** Azure
    * The hosting is provided by the partner.
* **Web Server:** Nginx 
* **Python Web Server Gateway Interface HTTP server:** Gunicorn 

**ARCHITECTURE**

Frontend will communicate with the backend through the API, the real API endpoints will be hidden. 
Backend will communicate with the Database through a separate API. 
When Maia Dashboard needs to retrieve data from Lichess, Maia Dashboard API will call Lichess API.

Please see a Sequence Diagram below for details on each flow.

**Sequence Diagram** 

Please click on the diagram to see it in detail. On click the diagram will open in the [Mermaid online editor](https://mermaid.live/). If you need to zoom in please use the button `View` in the Mermaid online editor (right top corner). 
[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgYXV0b251bWJlclxuICAgIGFjdG9yIHVzZXIgYXMgVXNlclxuICAgIHBhcnRpY2lwYW50IGZlIGFzIFJlYWN0PGJyLz5Gcm9udGVuZFxuICAgIHBhcnRpY2lwYW50IGJlIGFzIEJhY2tlbmRcbiAgICBwYXJ0aWNpcGFudCBhcGkgYXMgRmFzdEFQSVxuICAgIHBhcnRpY2lwYW50IGxpY2hlc3MgYXMgTGljaGVzc1xuICAgIHBhcnRpY2lwYW50IGVuZ2luZSBhcyBBbmFseXNpczxici8-TG9naWNcbiAgICBwYXJ0aWNpcGFudCBkYiBhcyBNb25nb0RCXG5cbiAgICBub3RlIG92ZXIgdXNlciwgZGI6IExvZ2luIHdpdGggTGljaGVzc1xuICAgIHVzZXIgLT4-KyBmZTogbG9naW4gd2l0aCBsaWNoZXNzXG4gICAgZmUgLT4-KyBiZTogbG9naW4gd2l0aCBsaWNoZXNzXG4gICAgYmUgLT4-KyBsaWNoZXNzOiBQYXJ0bmVyIHRvIHByb3ZpZGUgZGV0YWlsc1xuICAgIFxuXG4gICAgbm90ZSBvdmVyIHVzZXIsIGRiOiBOZXcgdXNlciAtIFB1bGwgdXNlciBkYXRhIGZyb20gTGljaGVzcywgc3RvcmUgaW4gTWFpYSBEYXNoYm9hcmQgREIgYW5kIHJldHVybiB0byBGRVxuICAgIGZlIC0-PisgYmU6IGdldCB1c2VyIGRhdGEgIFxuICAgIGJlIC0-PisgYXBpOiBnZXQgdXNlciBkYXRhIGZyb20gREJcbiAgICBhcGkgLT4-KyBkYjogcHVsbCB1c2VyIGRhdGFcbiAgICBkYiAtLT4-KyBhcGk6IHJldHVybiA0MDQgIFxuICAgIGFwaSAtPj4rIGxpY2hlc3M6IHB1bGwgdXNlciBkYXRhIGFuZCBhbGwgZ2FtZXNcbiAgICBsaWNoZXNzIC0tPj4tIGFwaTogdXNlciBkYXRhICYgYWxsIGdhbWVzIHJlc3BvbnNlXG4gICAgYXBpIC0-PisgZGI6IHN0b3JlIHVzZXIgZGF0YSAmIGdhbWVzIHdpdGggc3RhdHVzIFwicGVuZGluZ1wiXG4gICAgZGIgLS0-Pi0gYXBpOiBva1xuICAgIGFwaSAtLT4-LSBiZTogcmV0dXJuIHVzZXIgZGF0YSAmIGdhbWVzXG4gICAgYmUgLS0-Pi0gZmU6IHJldHVybiB1c2VyIGRhdGEgJiBnYW1lc1xuXG5cbiAgICBub3RlIG92ZXIgdXNlciwgZGI6IEV4aXN0aW5nIHVzZXIgLSBHZXQgdXNlciBkYXRhIGZyb20gTWFpYSBEYXNoYm9hcmQgREJcbiAgICBmZSAtPj4rIGJlOiBnZXQgdXNlciBkYXRhXG4gICAgYmUgLT4-KyBhcGk6IGdldCB1c2VyIGRhdGEgZnJvbSBEQlxuICAgIGFwaSAtPj4rIGRiOiBwdWxsIHVzZXIgZGF0YVxuICAgIGRiIC0tPj4rIGFwaTogcmV0dXJuIHVzZXIgZGF0YSAmIGdhbWVzXG4gICAgYXBpIC0tPj4tIGJlOiByZXR1cm4gdXNlciBkYXRhICYgZ2FtZXNcbiAgICBiZSAtLT4-LSBmZTogcmV0dXJuIHVzZXIgZGF0YSAmIGdhbWVzXG5cblxuICAgIG5vdGUgb3ZlciB1c2VyLCBkYjogTmV3IHVzZXIgLSBBbmFseXplIHVzZXIgZGF0YVxuICAgIGZlIC0-PisgYmU6IHRyaWdnZXJzIHVzZXIgZGF0YSBhbmFseXNpc1xuICAgIGJlIC0-PisgYXBpOiBnZXQgdXNlciBkYXRhIGFuYWx5dGljcyBmcm9tIHRoZSBEQlxuICAgIGFwaSAtPj4rIGVuZ2luZTogYW5hbHl6ZSB1c2VyIGRhdGEgXG4gICAgZW5naW5lIC0-PisgZGI6IHF1ZXJ5IHVzZXIgZGF0YSAmIGdhbWVzXG4gICAgZGIgLS0-Pi0gZW5naW5lOiB1c2VyIGRhdGEgJiBnYW1lc1xuICAgIGVuZ2luZSAtPj4gZW5naW5lOiBhbmFseXplIGRhdGFcbiAgICBlbmdpbmUgLT4-KyBkYjogc3RvcmUgc3RhdGlzdGljcyBpbiBEQiBhbmQgY2hhbmdlIHN0YXR1cyB0byBcImFuYWx5emVkXCJcbiAgICBkYiAtLT4-LSBlbmdpbmU6IG9rXG4gICAgZW5naW5lIC0tPj4tIGFwaTogcmV0dXJuIGRpY3Rpb25hcnkgd2l0aCBhbmFseXNpcyBkYXRhXG4gICAgYXBpIC0tPj4tIGJlOiByZXR1cm4gZGljdGlvbmFyeSB3aXRoIGFuYWx5c2lzIGRhdGFcbiAgICBiZSAtLT4-LSBmZTogcmV0dXJuIGRpY3Rpb25hcnkgd2l0aCBhbmFseXNpcyBkYXRhXG5cblxuICAgIG5vdGUgb3ZlciB1c2VyLCBkYjogRXhpc3RpbmcgdXNlciAtIFVzZXIgcmVxdWVzdCB0aGVpciBzdGF0c1xuICAgIHVzZXIgLT4-KyBmZTogZ2V0IGFuYWx5c2lzIGRhdGEgZm9yIHVzZXJcbiAgICBmZSAtPj4rIGJlOiBnZXQgYW5hbHlzaXMgZGF0YSBmb3IgdXNlclxuICAgIGJlIC0-PisgYXBpOiBnZXQgdXNlciBkYXRhIGFuYWx5dGljcyBmcm9tIHRoZSBEQlxuICAgIGFwaSAtPj4rIGRiOiBnZXQgdXNlciBzdGF0c1xuICAgIGRiIC0tPj4tIGFwaTogdXNlciBzdGF0cyBkYXRhXG4gICAgYXBpIC0-PiBhcGk6IHBhcnNlIGRhdGEgZm9yIEZFXG4gICAgYXBpIC0tPj4tIGJlOiB1c2VyIHN0YXRzXG4gICAgYmUgLS0-Pi0gZmU6IHVzZXIgc3RhdHNcbiAgICBmZSAtPj4tIGZlOiBidWlsZCBVSSBmb3Igc3RhdHNcblxuXG4gICAgbm90ZSBvdmVyIHVzZXIsIGRiOiBVc2VyIHNlbmRzIGZlZWRiYWNrXG4gICAgdXNlciAtPj4rIGZlOiBzZW5kIGZlZWRiYWNrXG4gICAgZmUgLT4-KyBiZTogc3RvcmUgZmVlZGJhY2tcbiAgICBiZSAtPj4rIGFwaTogc3RvcmUgZmVlZGJhY2sgaW4gdGhlIERCXG4gICAgYXBpIC0-PisgZGI6IHN0b3JlIHVzZXIgZmVlZGJhY2tcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkYXJrIn0sInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)](https://mermaid.live/edit/#eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgYXV0b251bWJlclxuICAgIGFjdG9yIHVzZXIgYXMgVXNlclxuICAgIHBhcnRpY2lwYW50IGZlIGFzIFJlYWN0PGJyLz5Gcm9udGVuZFxuICAgIHBhcnRpY2lwYW50IGJlIGFzIEJhY2tlbmRcbiAgICBwYXJ0aWNpcGFudCBhcGkgYXMgRmFzdEFQSVxuICAgIHBhcnRpY2lwYW50IGxpY2hlc3MgYXMgTGljaGVzc1xuICAgIHBhcnRpY2lwYW50IGVuZ2luZSBhcyBBbmFseXNpczxici8-TG9naWNcbiAgICBwYXJ0aWNpcGFudCBkYiBhcyBNb25nb0RCXG5cbiAgICBub3RlIG92ZXIgdXNlciwgZGI6IExvZ2luIHdpdGggTGljaGVzc1xuICAgIHVzZXIgLT4-KyBmZTogbG9naW4gd2l0aCBsaWNoZXNzXG4gICAgZmUgLT4-KyBiZTogbG9naW4gd2l0aCBsaWNoZXNzXG4gICAgYmUgLT4-KyBsaWNoZXNzOiBQYXJ0bmVyIHRvIHByb3ZpZGUgZGV0YWlsc1xuICAgIFxuXG4gICAgbm90ZSBvdmVyIHVzZXIsIGRiOiBOZXcgdXNlciAtIFB1bGwgdXNlciBkYXRhIGZyb20gTGljaGVzcywgc3RvcmUgaW4gTWFpYSBEYXNoYm9hcmQgREIgYW5kIHJldHVybiB0byBGRVxuICAgIGZlIC0-PisgYmU6IGdldCB1c2VyIGRhdGEgIFxuICAgIGJlIC0-PisgYXBpOiBnZXQgdXNlciBkYXRhIGZyb20gREJcbiAgICBhcGkgLT4-KyBkYjogcHVsbCB1c2VyIGRhdGFcbiAgICBkYiAtLT4-KyBhcGk6IHJldHVybiA0MDQgIFxuICAgIGFwaSAtPj4rIGxpY2hlc3M6IHB1bGwgdXNlciBkYXRhIGFuZCBhbGwgZ2FtZXNcbiAgICBsaWNoZXNzIC0tPj4tIGFwaTogdXNlciBkYXRhICYgYWxsIGdhbWVzIHJlc3BvbnNlXG4gICAgYXBpIC0-PisgZGI6IHN0b3JlIHVzZXIgZGF0YSAmIGdhbWVzIHdpdGggc3RhdHVzIFwicGVuZGluZ1wiXG4gICAgZGIgLS0-Pi0gYXBpOiBva1xuICAgIGFwaSAtLT4-LSBiZTogcmV0dXJuIHVzZXIgZGF0YSAmIGdhbWVzXG4gICAgYmUgLS0-Pi0gZmU6IHJldHVybiB1c2VyIGRhdGEgJiBnYW1lc1xuXG5cbiAgICBub3RlIG92ZXIgdXNlciwgZGI6IEV4aXN0aW5nIHVzZXIgLSBHZXQgdXNlciBkYXRhIGZyb20gTWFpYSBEYXNoYm9hcmQgREJcbiAgICBmZSAtPj4rIGJlOiBnZXQgdXNlciBkYXRhXG4gICAgYmUgLT4-KyBhcGk6IGdldCB1c2VyIGRhdGEgZnJvbSBEQlxuICAgIGFwaSAtPj4rIGRiOiBwdWxsIHVzZXIgZGF0YVxuICAgIGRiIC0tPj4rIGFwaTogcmV0dXJuIHVzZXIgZGF0YSAmIGdhbWVzXG4gICAgYXBpIC0tPj4tIGJlOiByZXR1cm4gdXNlciBkYXRhICYgZ2FtZXNcbiAgICBiZSAtLT4-LSBmZTogcmV0dXJuIHVzZXIgZGF0YSAmIGdhbWVzXG5cblxuICAgIG5vdGUgb3ZlciB1c2VyLCBkYjogTmV3IHVzZXIgLSBBbmFseXplIHVzZXIgZGF0YVxuICAgIGZlIC0-PisgYmU6IHRyaWdnZXJzIHVzZXIgZGF0YSBhbmFseXNpc1xuICAgIGJlIC0-PisgYXBpOiBnZXQgdXNlciBkYXRhIGFuYWx5dGljcyBmcm9tIHRoZSBEQlxuICAgIGFwaSAtPj4rIGVuZ2luZTogYW5hbHl6ZSB1c2VyIGRhdGEgXG4gICAgZW5naW5lIC0-PisgZGI6IHF1ZXJ5IHVzZXIgZGF0YSAmIGdhbWVzXG4gICAgZGIgLS0-Pi0gZW5naW5lOiB1c2VyIGRhdGEgJiBnYW1lc1xuICAgIGVuZ2luZSAtPj4gZW5naW5lOiBhbmFseXplIGRhdGFcbiAgICBlbmdpbmUgLT4-KyBkYjogc3RvcmUgc3RhdGlzdGljcyBpbiBEQiBhbmQgY2hhbmdlIHN0YXR1cyB0byBcImFuYWx5emVkXCJcbiAgICBkYiAtLT4-LSBlbmdpbmU6IG9rXG4gICAgZW5naW5lIC0tPj4tIGFwaTogcmV0dXJuIGRpY3Rpb25hcnkgd2l0aCBhbmFseXNpcyBkYXRhXG4gICAgYXBpIC0tPj4tIGJlOiByZXR1cm4gZGljdGlvbmFyeSB3aXRoIGFuYWx5c2lzIGRhdGFcbiAgICBiZSAtLT4-LSBmZTogcmV0dXJuIGRpY3Rpb25hcnkgd2l0aCBhbmFseXNpcyBkYXRhXG5cblxuICAgIG5vdGUgb3ZlciB1c2VyLCBkYjogRXhpc3RpbmcgdXNlciAtIFVzZXIgcmVxdWVzdCB0aGVpciBzdGF0c1xuICAgIHVzZXIgLT4-KyBmZTogZ2V0IGFuYWx5c2lzIGRhdGEgZm9yIHVzZXJcbiAgICBmZSAtPj4rIGJlOiBnZXQgYW5hbHlzaXMgZGF0YSBmb3IgdXNlclxuICAgIGJlIC0-PisgYXBpOiBnZXQgdXNlciBkYXRhIGFuYWx5dGljcyBmcm9tIHRoZSBEQlxuICAgIGFwaSAtPj4rIGRiOiBnZXQgdXNlciBzdGF0c1xuICAgIGRiIC0tPj4tIGFwaTogdXNlciBzdGF0cyBkYXRhXG4gICAgYXBpIC0-PiBhcGk6IHBhcnNlIGRhdGEgZm9yIEZFXG4gICAgYXBpIC0tPj4tIGJlOiB1c2VyIHN0YXRzXG4gICAgYmUgLS0-Pi0gZmU6IHVzZXIgc3RhdHNcbiAgICBmZSAtPj4tIGZlOiBidWlsZCBVSSBmb3Igc3RhdHNcblxuXG4gICAgbm90ZSBvdmVyIHVzZXIsIGRiOiBVc2VyIHNlbmRzIGZlZWRiYWNrXG4gICAgdXNlciAtPj4rIGZlOiBzZW5kIGZlZWRiYWNrXG4gICAgZmUgLT4-KyBiZTogc3RvcmUgZmVlZGJhY2tcbiAgICBiZSAtPj4rIGFwaTogc3RvcmUgZmVlZGJhY2sgaW4gdGhlIERCXG4gICAgYXBpIC0-PisgZGI6IHN0b3JlIHVzZXIgZmVlZGJhY2tcbiIsIm1lcm1haWQiOiJ7XG4gIFwidGhlbWVcIjogXCJkYXJrXCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)

Please see a Server Diagram below for details on the servers setup.

**Server Diagram** 

Please click on the diagram to see it in detail. On click the diagram will open in the [Mermaid online editor](https://mermaid.live/). If you need to zoom in please use the button `View` in the Mermaid online editor (right top corner). 
[![](https://mermaid.ink/img/eyJjb2RlIjoiZmxvd2NoYXJ0IExSXG4gICAgdXNlcltVc2VyXSAtLT58ZW50ZXJzIFVSTHwgd2ViW0Jyb3dzZXJdXG4gICAgd2ViIC0tPnxwb3J0IDgwfCBuZ2lueFtXZWIgU2VydmVyPGJyLz5uZ2lueF1cbiAgICB3ZWIgLS0-fHBvcnQgWHwgbmdpbnhbV2ViIFNlcnZlcjxici8-bmdpbnhdXG4gICAgXG4gICAgc3ViZ3JhcGggc2VydmVyW1NlcnZlciBWTV1cbiAgICAgICAgZGlyZWN0aW9uIFRCICAgICAgIFxuICAgICAgICBzdWJncmFwaCBndW5pY29ybi1wcm9kW0d1bmljb3JuIFBST0RdXG4gICAgICAgICAgICBiZS1wW0JhY2tlbmQgUHl0aG9uXSAtLT4gYXBpLXBbRmFzdEFQSV1cbiAgICAgICAgICAgIGFwaS1wIC0tPiBsb2dpYy1wW1N0YXRzIEFuYWx5dGljcyBMb2dpY11cbiAgICAgICAgICAgIGxvZ2ljLXAgLS4tPiBhcGktcFxuICAgICAgICAgICAgYXBpLXAgLS0-IHxNb25nb0RCfCBkYi1wW0RhdGFiYXNlXVxuICAgICAgICBlbmRcbiAgICAgICAgc3ViZ3JhcGggZ3VuaWNvcm4tZGV2W0d1bmljb3JuIERFVl1cbiAgICAgICAgICAgIGJlLWRbQmFja2VuZCBQeXRob25dIC0tPiBhcGktZFtGYXN0QVBJXVxuICAgICAgICAgICAgYXBpLWQgLS0-IGxvZ2ljLWRbU3RhdHMgQW5hbHl0aWNzIExvZ2ljXVxuICAgICAgICAgICAgbG9naWMtZCAtLi0-IGFwaS1kICAgICAgIFxuICAgICAgICAgICAgYXBpLWQgLS0-IHxNb25nb0RCfCBkYi1kW0RhdGFiYXNlXVxuICAgICAgICBlbmRcbiAgICAgICAgbmdpbnggLS0-fGZvciByZWFjdCBzdGF0aWMgPGJyLz4gaHRtbC9qcy9jc3MgZmlsZXN8IHN0YXRpYy1wcm9kICYgc3RhdGljLWRldlxuICAgICAgICBuZ2lueCAtLT4gZ3VuaWNvcm4tcHJvZCAmIGd1bmljb3JuLWRldlxuICAgIGVuZFxuICAgIGFwaS1wICYgYXBpLWQgLS0-fExpY2hlc3MgQVBJfCBsaWNoZXNzIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRhcmsifSwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)](https://mermaid.live/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IExSXG4gICAgdXNlcltVc2VyXSAtLT58ZW50ZXJzIFVSTHwgd2ViW0Jyb3dzZXJdXG4gICAgd2ViIC0tPnxwb3J0IDgwfCBuZ2lueFtXZWIgU2VydmVyPGJyLz5uZ2lueF1cbiAgICB3ZWIgLS0-fHBvcnQgWHwgbmdpbnhbV2ViIFNlcnZlcjxici8-bmdpbnhdXG4gICAgXG4gICAgc3ViZ3JhcGggc2VydmVyW1NlcnZlciBWTV1cbiAgICAgICAgZGlyZWN0aW9uIFRCICAgICAgIFxuICAgICAgICBzdWJncmFwaCBndW5pY29ybi1wcm9kW0d1bmljb3JuIFBST0RdXG4gICAgICAgICAgICBiZS1wW0JhY2tlbmQgUHl0aG9uXSAtLT4gYXBpLXBbRmFzdEFQSV1cbiAgICAgICAgICAgIGFwaS1wIC0tPiBsb2dpYy1wW1N0YXRzIEFuYWx5dGljcyBMb2dpY11cbiAgICAgICAgICAgIGxvZ2ljLXAgLS4tPiBhcGktcFxuICAgICAgICAgICAgYXBpLXAgLS0-IHxNb25nb0RCfCBkYi1wW0RhdGFiYXNlXVxuICAgICAgICBlbmRcbiAgICAgICAgc3ViZ3JhcGggZ3VuaWNvcm4tZGV2W0d1bmljb3JuIERFVl1cbiAgICAgICAgICAgIGJlLWRbQmFja2VuZCBQeXRob25dIC0tPiBhcGktZFtGYXN0QVBJXVxuICAgICAgICAgICAgYXBpLWQgLS0-IGxvZ2ljLWRbU3RhdHMgQW5hbHl0aWNzIExvZ2ljXVxuICAgICAgICAgICAgbG9naWMtZCAtLi0-IGFwaS1kICAgICAgIFxuICAgICAgICAgICAgYXBpLWQgLS0-IHxNb25nb0RCfCBkYi1kW0RhdGFiYXNlXVxuICAgICAgICBlbmRcbiAgICAgICAgbmdpbnggLS0-fGZvciByZWFjdCBzdGF0aWMgPGJyLz4gaHRtbC9qcy9jc3MgZmlsZXN8IHN0YXRpYy1wcm9kICYgc3RhdGljLWRldlxuICAgICAgICBuZ2lueCAtLT4gZ3VuaWNvcm4tcHJvZCAmIGd1bmljb3JuLWRldlxuICAgIGVuZFxuICAgIGFwaS1wICYgYXBpLWQgLS0-fExpY2hlc3MgQVBJfCBsaWNoZXNzIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRhcmtcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

**DEPLOYMENT**

Deployment to `DEV` and `PROD` environments will be automated with GitHub Actions. 
GitHub Actions will run tests, 
compile React frontend code and copy the static files to the Azure server,
copy updated Python files to the Azure server, and then will restart Gunicorn on the server to show the updates.

On the event of a successful deployment or a deployment failure the team will be notified on Slack 
with an automatic Slack message.  

Please see the Deployment Diagram below for the deployment flow details.

**Deployment Diagram** 

Please click on the diagram to see it in detail. On click the diagram will open in the [Mermaid online editor](https://mermaid.live/). If you need to zoom in please use the button `View` in the Mermaid online editor (right top corner). 
[![](https://mermaid.ink/img/eyJjb2RlIjoiZmxvd2NoYXJ0IFRCXG4gICAgc3ViZ3JhcGggZGphbmdvW1Rlc3QgUHl0aG9uIGNvZGUgYW5kIGRlcGxveSBiYWNrZW5kXVxuICAgICAgICBkaXJlY3Rpb24gVEJcbiAgICAgICAgZGVwZW5kZW5jaWVzW0luc3RhbGwgcHl0aG9uIGRlcGVuZGVuY2llc10gLS0-IHRlc3RzW1J1biB0ZXN0c11cbiAgICAgICAgdGVzdHMgLS0-IGNvcHlbQ29weSBiYWNrZW5kL3B5dGhvbiBmaWxlc11cbiAgICAgICAgY29weSAtLT4gZ3VuaWNvcm5bUmVzdGFydCBndW5pY29ybiBzZXJ2aWNlIG9uIHNlcnZlcl1cbiAgICBlbmRcbiAgICBzdWJncmFwaCByZWFjdFtCdWlsZCBmcm9udGVudCBhbmQgZGVwbG95XVxuICAgICAgICBkaXJlY3Rpb24gVEJcbiAgICAgICByZWFjdF9kZXBlbmRlbmNpZXNbSW5zdGFsbCByZWFjdCBkZXBlbmRlbmNpZXNdIC0tPiBidWlsZFtSZWFjdCBidWlsZF1cbiAgICAgICBidWlsZCAtLT4gY29weV9mZVtDb3B5IHJlYWN0IGJ1aWxkIHRvIHNlcnZlcl1cbiAgICBlbmRcbiAgICBzdWJncmFwaCBzbGFja1tTbGFjayBub3RpZmljYXRpb25dXG4gICAgICAgIHhbTm90aWZ5IG9uIHN1Y2Nlc3NmdWwgZGVwbG95bWVudF1cbiAgICAgICAgLVtOb3RpZnkgb24gZGVwbG95bWVudCBmYWlsdXJlXVxuICAgICAgICBcbiAgICBlbmRcbiAgICB1c2VyW0RldmVsb3Blcl0gLS0-fHB1c2ggY29kZXwgZ2l0aHViW0dpdEh1YiA8YnIvPiBkZXZlbG9wICYgbWFzdGVyIDxici8-IGJyYW5jaGVzXVxuICAgIGdpdGh1YiAtLT58Z2l0aHViIGFjdGlvbiBqb2IgMXwgZGphbmdvXG4gICAgZ2l0aHViIC0tPnxnaXRodWIgYWN0aW9uIGpvYiAyfCByZWFjdFxuICAgIFxuICAgIHJlYWN0IC0tPiBzbGFja1xuICAgIGRqYW5nbyAtLT4gc2xhY2tcblxuICAgIGNvcHlfZmUgLS4tIGNvbW1lbnRbRW52aXJvbm1lbnQgZGVwZW5kYW50IG9uIGJyYW5jaF1cbiAgICBjb3B5IC0uLSBjb21tZW50XG4gICAgZ3VuaWNvcm4gLS4tIGNvbW1lbnRcbiAgIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRhcmsifSwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)](https://mermaid.live/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IFRCXG4gICAgc3ViZ3JhcGggZGphbmdvW1Rlc3QgUHl0aG9uIGNvZGUgYW5kIGRlcGxveSBiYWNrZW5kXVxuICAgICAgICBkaXJlY3Rpb24gVEJcbiAgICAgICAgZGVwZW5kZW5jaWVzW0luc3RhbGwgcHl0aG9uIGRlcGVuZGVuY2llc10gLS0-IHRlc3RzW1J1biB0ZXN0c11cbiAgICAgICAgdGVzdHMgLS0-IGNvcHlbQ29weSBiYWNrZW5kL3B5dGhvbiBmaWxlc11cbiAgICAgICAgY29weSAtLT4gZ3VuaWNvcm5bUmVzdGFydCBndW5pY29ybiBzZXJ2aWNlIG9uIHNlcnZlcl1cbiAgICBlbmRcbiAgICBzdWJncmFwaCByZWFjdFtCdWlsZCBmcm9udGVudCBhbmQgZGVwbG95XVxuICAgICAgICBkaXJlY3Rpb24gVEJcbiAgICAgICByZWFjdF9kZXBlbmRlbmNpZXNbSW5zdGFsbCByZWFjdCBkZXBlbmRlbmNpZXNdIC0tPiBidWlsZFtSZWFjdCBidWlsZF1cbiAgICAgICBidWlsZCAtLT4gY29weV9mZVtDb3B5IHJlYWN0IGJ1aWxkIHRvIHNlcnZlcl1cbiAgICBlbmRcbiAgICBzdWJncmFwaCBzbGFja1tTbGFjayBub3RpZmljYXRpb25dXG4gICAgICAgIHhbTm90aWZ5IG9uIHN1Y2Nlc3NmdWwgZGVwbG95bWVudF1cbiAgICAgICAgLVtOb3RpZnkgb24gZGVwbG95bWVudCBmYWlsdXJlXVxuICAgICAgICBcbiAgICBlbmRcbiAgICB1c2VyW0RldmVsb3Blcl0gLS0-fHB1c2ggY29kZXwgZ2l0aHViW0dpdEh1YiA8YnIvPiBkZXZlbG9wICYgbWFzdGVyIDxici8-IGJyYW5jaGVzXVxuICAgIGdpdGh1YiAtLT58Z2l0aHViIGFjdGlvbiBqb2IgMXwgZGphbmdvXG4gICAgZ2l0aHViIC0tPnxnaXRodWIgYWN0aW9uIGpvYiAyfCByZWFjdFxuICAgIFxuICAgIHJlYWN0IC0tPiBzbGFja1xuICAgIGRqYW5nbyAtLT4gc2xhY2tcblxuICAgIGNvcHlfZmUgLS4tIGNvbW1lbnRbRW52aXJvbm1lbnQgZGVwZW5kYW50IG9uIGJyYW5jaF1cbiAgICBjb3B5IC0uLSBjb21tZW50XG4gICAgZ3VuaWNvcm4gLS4tIGNvbW1lbnRcbiAgIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRhcmtcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

**TESTING**

For testing we will use unit tests. 
Before a developer creates a Pull Request, this developer needs to write tests for their code 
and run existing tests to verify that their code has not broken any existing funnctionality.

### Q5: What are the user stories that make up the MVP?
Please open [Google Slides here](https://docs.google.com/presentation/d/1V2gnUiMgze4BJ1yaO9ueb0veCmzg0P37orXA-_0MsZc/edit?usp=sharing) to see Maia Dashboard user stories.

----
## Intellectual Property Confidentiality Agreement 

Licence: GPL

----

## Process Details

### Q6: What are the roles & responsibilities on the team?
**TECHNICAL ROLES**
* Backend Dev
* Frontend Dev
* Full Stack Dev
* DevOps 
* Architect

**NON-TECHNICAL ROLES**
* Project Manager
    * Create Project Roadmap
    * Set Project Milestones & Deadlines
    * Plan sprints together with the Scrum Master
    * Be responsible for the project delivery by the deadline: contact developers and make sure that they are delivering their tickets functionality by the deadline
    * Organize and schedule meetings
* Product Manager
    * Define the product and all its features
    * Make sure that the product we are going to build is exactly what the client wants
    * Manage client expectations (don’t overpromise!)
    * Work with Systems Analyst to define business requirements and create Trello tickets
    * Be responsible for the client being happy with the product
* Systems Analyst
    * Translate business requirements into technical requirements and create Trello tickets
    * Estimate tickets with developers
    * Work with Product Manager to ensure that whatever the client wants is actually technically possible
    * If something is technically impossible to build, inform the Product Manager & client
* UI/UX Designer
    * Work with Product Manager & client to define the product UI/UX
    * Make / draw wireframes
* Writing Meeting Minutes
    * Write meeting minutes and email them to the team and the client after every meeting
* Scrum Master
    * Define sprints together with Project Manager
    * Lead standup meetings

:small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond:

| Team member:      |  Sina Abady | 
| :---:        |    :----:   |
| Role(s) Responsibilities |   Full Stack Dev (Focus on Backend)     | 
| Component worked on   |     *D1:* Highlights section <br> <br> *Future deliverables:* <br> - Develop REST API for backend-analysis logic communication <br> - Integrate the analysis logic into the backend implementation    | 
| Non software related work   |    Supervises the note taking process shared by all team members     | 
| 3 technical strengths and weaknesses  |   Strengths: <br> - Back-end server side programming <br> - Algorithms & Runtime Optimizations <br> - AI & NNs  <br> <br> *Weaknesses:* <br> - Frontend UI/UX Design <br> - CI/CD deployments and workflows <br> - Multi-Page Websites    | 

:small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond:

| Team member:      | Robin Gerster | 
| :---:        |    :----:   |
| Role(s) Responsibilities |    - Full Stack (focus on frontend) <br> - UI/UX Designer <br> - Product Manager    | 
| Component worked on   |   *D1:* Q1 section <br> <br> *Future deliverables:* <br> - Develop frontend for a scrollable sorted list of games   <br> - Develop a navigation bar   | 
| Non software related work   |     Acts as a Product Manager clarifying main product features    | 
| 3 technical strengths and weaknesses  |   *Strengths:* <br> - Python, C# <br> - AI <br> - UI/UX Design <br> <br> *Weaknesses:* <br> - Javascript <br> - CI/CD deployments and workflows <br> - Lack of documentation/comments on code written.      | 

:small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond:

| Team member:      | Kevin Hong | 
| :---:        |    :----:   |
| Role(s) Responsibilities |   - Scrum master <br> - Full-Stack Developer     | 
| Component worked on   |    *D1:* Q9 section <br> <br> *Future deliverables:* <br> - Develop REST API for frontend-backend communication  <br> - Develop REST API for backend-database communication      | 
| Non software related work   |  Acts as a Scrum master planning one-week sprints   | 
| 3 technical strengths and weaknesses  |   *Strengths:* <br> - Have experience building full-stack web applications <br> - Have experience designing full end to end architecture of web applications <br> - Have experience with cloud computing solutions <br> <br> *Weaknesses:* <br> - In-experienced with hosting web applications on local virtual machines <br> - Poor web application designing skills <br> - Weak code testing coverage on server related software      | 

:small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond:

| Team member:      | Natalia Moran | 
| :---:        |    :----:   |
| Role(s) Responsibilities |   - Full Stack Dev, DevoOps, Architect <br> - Systems Analyst     | 
| Component worked on   |     *D1:* Q4, Q5, Q6, Q7, and Q8 sections <br> <br> *Future deliverables:* <br>  - Configure CI/CD and Server <br> - Integrate with Lichess API <br> - Develop logging frontend activity   | 
| Non software related work   |    - Acts as a Systems Analyst translating business requirements into technical requirements  <br> - Acts as a Project Manager in the absence of a Project Manager   | 
| 3 technical strengths and weaknesses  |    *Strengths:* <br> - Previous experience with Python, React, MongoDB, RestAPI Design <br> - Previous work experience as a Systems Analyst <br> - Good soft skills  <br> <br> *Weaknesses:* <br> - Minimal experience with CI/CD technology  <br> - Minimal experience with planning an architecture <br> - Minimal knowledge of AI   | 

:small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond:

| Team member:      | William Wang | 
| :---:        |    :----:   |
| Role(s) Responsibilities |    - Full Stack (focus on frontend) Dev <br> - DevOps    | 
| Component worked on   |     *D1:* Highlights section <br> <br> *Future deliverables:* <br>  - Develop chess board visualization <br>  - Develop suggested moves visualization <br>  - Develop user account info visualization   | 
| Non software related work   |   - Acts as a UI/UX Designer preparing mockups and approving them with the partner      | 
| 3 technical strengths and weaknesses  |   *Strength:* <br> - HTML/CSS/JavaScript <br> - Data visualization <br> - Python <br> <br> *Weaknesses:* <br> - React <br> - Inexperienced with the connection between frontend and backend <br> - Report writing      | 

:small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond:

| Team member:      | Angel Yuan | 
| :---:        |    :----:   |
| Role(s) Responsibilities |    - Full Stack (focus on frontend) Dev <br> - UI/UX Designer    | 
| Component worked on  |     *D1:* Q2, and Q3 sections. Mockup design and communicating design with partner.  <br> <br> *Future deliverables:* <br>  - Develop a filter for the most interesting positions, the most difficult positions, and mistakes, etc <br> - Develop a feedback form    | 
| Non software related work   |   - Acts as a UI/UX Designer preparing mockups and approving them with the partner       | 
| 3 technical strengths and weaknesses  |     *Strength:* <br> - HTML/CSS/JavaScript <br> - Python <br> - UI/UX design <br> <br> *Weaknesses:* <br> - CI/CD <br> - connecting frontend and backend <br> - Minimal experience with React   | 

### Q7: What operational events will you have as a team?
**WEEKLY MEETING WITH THE PARTNER** 

Our weekly meeting with the partner is scheduled for Thursday 1 pm. The first meeting was held offline on Thursday, September 30. The second meeting was also held offline on Thursday, October 7. All subsequent weekly meetings will be run in person with a possibility to join via Zoom as well.

* **Before the meeting:** The team’s project manager prepares a meeting agenda and emails it to the team and the partner.

* **After the meeting:** Instead of appointing one person to do meeting minutes, our team decided to rotate this role in alphabetical order (per our last names). A team member who takes notes during a meeting then stores the meeting minutes in our team’s Google Drive folder and emails them to all team members, the partner and the TA. This is done to minimize misunderstandings between the team and the partner.

1. **First meeting with the partner** 

     During the first meeting, our team and the partner discussed User Stories,
     and drafted together a frontend wireframe to understand better what exactly the partner needs us to build. 
     Also, the partner explained to us the logic of the games analysis 
     and the main features of the analysis algorithm that the partner built. 
     It was important because this algorithm will become the basis of the web application that our team will develop.
     
     As a result of this meeting, we were able to make detailed mockups to approve with the partner,
     and to write detailed user stories to approve with both the partner and the TA.  
    
    Please see the meeting minutes [here](https://docs.google.com/document/d/1WeDdal-qy_DD3StEkZkj-kuqUYG_WsI-937mqdg1aQQ/edit?usp=sharing).

2. **Second meeting with the partner**

    During the second meeting, our team and the partner reviewed the mockups 
    and agreed on the mockup updates (e.g. adding a filter dropdown instead of filter buttons, 
    moving the analytics to the bottom of the page).
    
    We also discussed the project architecture and technology stack. Our team offered two possible architecture solutions
    for the partner to choose from.  
    
    As a result of the meeting, we were able to finalize the mockups, agree on the technology stack 
    and update the sequence diagram outlining the project architecture.
    
    Please see the meeting minutes [here](https://docs.google.com/document/d/1WeDdal-qy_DD3StEkZkj-kuqUYG_WsI-937mqdg1aQQ/edit?usp=sharing).


**WEEKLY TEAM MEETING**

Our weekly team meeting is scheduled for Tuesday 8 pm via Zoom. 

It gives us a perfect opportunity to talk to each other 2 days before our weekly meeting with the partner and decide on any additional work that has to be done till Thursday's meeting. 

**TUTORIAL**

Monday’s tutorial gives our team another chance to catch up - already in person - as well as to present our weekly progress to the TA. 

**DAILY 15-MINUTE STANDUP MEETING**

When we start development we will have a daily (Monday to Friday) 15-minute online standup meeting at 9 am, where each team member could share (1) what she/he worked on yesterday (2) what she/he will be working on today (3) if she/he has any blockers. This is meant to be a very short meeting to catch up and make sure that everyone is on track. If for any reasons a team member cannot attend a meeting, they can just send their answers in Slack.
  
  
### Q8: What artifacts will you use to self-organize?
**DOODLE**

To find a time slot for a weekly team meeting we used a [Doodle questionnaire](https://doodle.com/poll/9w94i7gmrimh9dr5?utm_source=poll&utm_medium=link).
 Because all 6 members of our team have different timetables, the only two time slots when everyone is available is on Thursday at 1 pm and 3 pm. 

![Doodle](./images/Q8-Doodle.png) 

**SLACK**

Our team created a Slack workspace to communicate with each other and the partner. We organized our discussions with channels such as #choose-project, #meetings, #logistics, etc.
We will also use Slack to configure automatic notifications from GitHub actions to monitor the deployment process.

![Slack](./images/Q8-Slack.png) 

**TRELLO**

To simplify the work process our team created a Trello board. 

We will work in sprints: although the most common sprint duration in the IT industry is 2 weeks, we will work in 1-week sprints. A shorter sprint duration is chosen because this is a very dynamic course where we have from 2 to 4 weeks for each deliverable. Each sprint will start on Monday and finish on Sunday.

Before starting development we will create a backlog of tickets: each ticket will be a 1-day task. Our Systems Analyst together with the Product Manager will write technical requirements for each ticket. It is the responsibility of developers to provide estimations for tickets: if some tickets are estimated for more than one day, these tickets will be splitted to smaller tasks.

During our weekly meeting with the partner on Thursday we will prioritize tickets. Then the team’s Scrum Master together with the Project Manager will plan the following week’s sprint and move tickets from BACKLOG to TODO. They will assign a developer for each ticket (developers will need to provide their weekly availability). If a developer has multiple tickets in one sprint they can do these tickets in any order they like (unless they are blocking other developers). 

When a developer starts working on a ticket, she/he moves this ticket to the IN DEV column. When a developer creates a Pull Request, she/he moves the ticket to the WAITING FOR QA column. Each Pull Request needs to be reviewed by another developer: when the review starts the ticket needs to be moved to the IN QA column. When the Pull Request is merged, the ticket is moved to the DONE column.

The Trello board will help to keep our work process transparent: each team member will know the current state of each task at any moment. Also, assigning team members to tickets and setting deadlines with alerts on each ticket will help to self-organize.

![Trello](./images/Q8-Trello.png)

**TEAMGANTT**

A TeamGantt chart is connected to our Trello board to allow us to create a roadmap for the project. After the partner’s business requirements are translated into technical requirements and divided into tickets, these tickets can be planned for Deliverable 2, Deliverable 3, or Deliverable 4. This will help us to plan our work for the next 2.5 months and manage the partner’s expectations. 

![Gantt](./images/Q8-Gantt.png)

**FILES STORAGE**

All non-development files needed for the project (e.g. meeting minutes, project application draft) are sorted and stored in a shared Google Drive folder. This way it is easy to keep track of the files that we cannot / choose not to push to the GitHub repository.

![Google Drive](./images/Q8-GoogleDrive.png)

### Q9: What are the rules regarding how your team works?

**COMMUNICATION**

Our team has set up a Slack channel with all our members and the team over at CSSLab. We expect everyone on our team to read messages the day that it was sent and respond with a thumbs up.

To communicate with our partner, we simply ping our main point of contact with the CSSLab on Slack. Reid, our main point of contact has been very responsive and helpful; we believe that their cooperation will continue to be nothing but amazing. However, any complicated questions we have will be addressed in our weekly in-person meetings on Thursdays at 1pm near the CSSLab. 

**MEETINGS**

Our team has developed two consistent meeting times. The first meeting is a 45 minute session, every Tuesday at 8pm over Zoom and the second meeting time is an in-person meeting every Thursday at 1pm in the Pratt building for 1 hour. Our first meeting is with the members of the team to discuss our weekly sprint goals and assign tickets to the developers. The second meeting is primarily focused on discussing our current plans, any urgent blockers and to demo what was created in the previous sprint to the partner. 

The aforementioned meetings are only our weekly scheduled meetings, we already had and will continue to have impromptu meetings for any issues that would be better handled through Zoom. For example for deliverable 1, there was a meeting of UI designers to discuss the mock-ups for our application. In a meeting specific to a single domain where not all members are asked to attend, we keep everyone in the loop about what happened in the meeting by posting all updates on our #meetings Slack channel. 

For every meeting we have, we make sure that one person (on a rotating basis) is responsible for creating and maintaining the meeting minutes for that specific meeting so that we can always refer back to what has been mentioned in the meeting in the future.

We understand all our members including our partner are very individuals. In the case where an individual cannot make our specified meeting times, we try our best to accommodate anyone who could not make our meetings by writing meeting minutes for every meeting we have. 

**CONFLICT RESOLUTION**
	
Indecision is the biggest productivity killer. Our methods to eliminate indecision includes through planning of what we need to build and careful guidelines on how we are going to approach certain tasks. However, it is inevitable that different ideas form within the members of our group which can lead to indecision. In that case we as a team agree that discussing pros and cons of each idea will lead to an informed discussion on how to resolve said indecision.
	
There are times where certain individuals are unable to finish a given task within an allotted time, which can potentially lead to blockers on other team members' work. To account for such cases, we have implemented a policy to set internal deadlines of our own well before the deadlines given in the course so that we are able to create a buffer. In addition we, as a team, will figure out a way to make sure delays will not happen again.

We understand that sometimes school can be overwhelming and you are unable to respond to messages on Slack. If we are unable to reach a member of our group for a few days near a deadline we will give them the benefit of doubt. However, if there has been no contact for an extended period of time then we will email them once again and then notify the TA about our group’s situation.


----
## Highlights

----

### Partner Selection
After the group is formed, we first let each team member come up with their top three partners based on interest and abilities.
We soon found out that we have a shared interest in AI. Follow this theme, partners that we have considered includes:
 * [CSSLab](https://docs.google.com/document/d/1MHo_cUcqRSHbUD0DN9GiC2_6x4L1dvPczQQBnrCNg6U/edit)
 * [Software Engineering Lab](https://docs.google.com/document/d/1tdDwwwONTu_Il1r44tNMpEXWAi01XI6z3BMQmpwepYM/edit)
 * [TAGlab](https://docs.google.com/document/d/1zt4oJpi9BER3QMHpHB2m0is5pGxZ8BjUkaAof1oMznI/edit)

All of them involve building an interface to present an AI-related program.

![alt text](https://i.imgur.com/ubWZvu5.png) 

Three votes are conducted on our discussion board to decide the rank of these partners, where we universally agree that CSSLab is our first partner of choice. The reasons behind this choice include interest in chess and the potential of learning from such research projects. 
New members who joined after the vote also agreed with CSSLab as the first choice. 

### Website Mockups
After the meeting with the Partner lead, Reid, we received a lot of interesting insights into the structure and look of the desired application.

Maia uses three major measures to quantify the ability of the user, the state of the game etc ...
 
 * **Performance:** Ratio between difficulty of the move and likeliness of player to play it
 * **Trickiness:** Defined as the expected-winrate loss for a given player. The trickier the player, the more they “outplay” this statistic, meaning they win when they are expected to lose in a position.
 * **Entropy:** This statistic describes the probabilistic complexity of a certain position. Will be toned down to be readable by the average user. Essentially   describes how complex the plays of a certain position can be.

![alt text](https://i.imgur.com/yZRpHsa.png) 

Players will be able to select different interest postions within the game and analyze them via. the quantifiers provided by Maia.
They will be able to see the aggregate of their performance of the various games they uploaded, which will give the user a great insight to their game history. The suggestions for moves in interesting positions will be much more intuitive as Maia will match the moves to the skill level of the player and overall game. This interface will let any user, casual, or professional, gain great insight into the states of various games, and human actions in the games as well.

The scatter plot will allow more advanced users to compare the performance of Maia to Stockfish, on their winrate metrics, meaning the user can quantitatively and qualitatvely be able to compare Maia and Stockfish in real time!

### Teamwork :D

Our team is comprised of many different Computer Science majors from various walks of life. This means:
 * Our team is extremely dynamic in terms of its skillset
 * Is comprised of people with various interests in the field of CS
 * Has members ranging from 3rd year to 5th year of studies with various degrees of experience
 * We have the ability to learn from one another, and design solutions and applications in various interesting ways, pulling from our knowledge in either pure Computer Science course knowledge, Industry experince, and even hobby knowledge!
 * Due to this we are able to come up with various awesome designs, whether it comes to frontend GUI, backend multiprocessing etc...

Natalia has extremely in depth knowledge from industry in team collaboration, organization, and work flows, allowing our team to work extremely together, even with our hectic school schedules. 

![alt text](https://i.imgur.com/Mz9W1v4.png) 

Our frontend team comprising of Angel, William, and Robin have extensive experience in frontend ability, and are able to organize their ideas, make mockups, and collaborate effectively to come up with various design for the look of the website. They all ask detailed questions from the Partner to be able to interpret their wishes for the website, and get feedback as to provide an accurate to the Partner user experience.

![alt text](https://i.imgur.com/eUaV2U0.png) 
![alt text](https://i.imgur.com/by8eYTV.png) 

Our backend team comprised of Natalia, Kevin and Sina, all have various knowledge of backend systems from Industry and school work. The meetings that occur between this team allows all three people to discuss various implementations of the API's based on personal experience, and provide pros and cons of different frameworks as it relates to the clients needs. This allows the team to quickly converge on not only, a near optimal solution for backend tech stack, but also learn a lot in the process!

![alt text](https://i.imgur.com/1t8zY79.jpg) 

### Technical Detail Decisions Overview

**Frontend:** This was the section that we were provided the most freedom with. The Partner only desires basic visual features, that can be accomplished via many modern frontend API's. We could list the pros and cons of each API here, but the real reason we chose React were based on these questions:

 * How easy is it to develop using this API?
 * Can the code be broken down modularily and be tested easily among a small group of developers?
 * What tools are available to develop a modern website using this API?
 * How easy will it be to hand off the code to the Partner at the end of this semester?
 * Most importantly, which framework do our developers have the most experience in.

Now, most modern API's tend to answer these questions fairly well, and can fit all our needs. Depending on who you ask, Angular is far superior to React and it's only time until everyone realizes it and completely switches over. React is far superior, Facebook, Instagram and others use it after all. ETC ... Well these were the key considerations we made.

Reacts componenets structure is ever so slightly easier to develop and maintain, although it gives less of a freedom than Angular does slightly as well. For the purposes of this application, the decisions are neglible since this apps production scale is quite small, and the codebase is meant to be maintained by a couple of developrs in the CSS lab.

Both Angular and React have phenomonmenal component structures that will arm any developer with the tools needed to build fast, beautiful and responsive websites. 

Now the last two questions are what the majority of our decision was made off of. One of the Partners has slight experience with React, which leads us to slightly favour React when it comes to handoff. Lastly, the majority of our developers used React in their Assignment 1. Kevin mentioned using Material UI, which is an extremely easy, and good looking component interface that will make any website look modern. This is a huge bonus to React as it means our devs will need not spend time learning a new framework when it comes to frontend.

Can you guess what we landed on? ....

Thats right :D

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="200" height="200">

**Backend:** This portion of the design, we tended to have much less freedom, as the server, language Maia is written in, and API calls are already set in stone. This means that we had a lot less to consider overall when choosing the backend framework and the components that comprise it. 

It made the most sense to choose Python as the language for the backend as this would work very seamlessly with Maia. Django was considered as it has many modern applications such as:
 * Maintainability: Backend and Message Queue can be developed, debugged, tested, and maintained seperately for ease of workflow.
 * Scalibility: Implements multi-processing making it largely scalable to large applications as the user base grows
 * A/B testing: Able to effectively test in real time the effects of different algorithms on the data provided and given to the user base.

In the end we stuck with Python as the Partner insisted that it would be the simplest option for him to read and maintain as the project got handed over, which in all makes sense as the scope of this project will extend long after this course is complete.

The server is already set as an nginx server by the Partner, which is hosted on Microsoft Azure, so we already have a framework (although very broad) to work with when it comes to that. None of the developers have used this framework before, but the Partner already used it to deploy Maia, and as it's a modern framework, it will be easy to deploy the backend of the web application to it.

The database again, was set up by the Partner for our convenience, as a MongoDB backend. This means that the frontend developers will have to call an API to convert React user states to a .json, and push the data to the database for analytics purposes. It was decided that we need multiple processes running interacting with the database at once.

 * Asynchronously track user data and push it to the database.
 * Process any new games that are loaded from Lichess into the database, and analyze them
 * Serve useres various statistics, games, and interesting postions on the fly

The ideal API structure was explained to us by Kevin (he drew it on the board but it got erased before we had the chance to take a photo lol):

He emphasized for ease of use by the frontend developers, and for any devs in the research team who may want to work with Maia, that there be a high level black box API that could accomplish any request to the backend that is needed.

This API would then connect to multiple smaller APIs who work asynchronously with one another to accomplish various tasks that he backend needs. This way development can be done in parallel without having to share code within APIs. All that would be needed are guarantees of function signatures from the top level API.

Lastly the smaller asynchronous API's would connect to the Maia API and request any relevant information if need be.

This model made the most sense as it is maintainable, extremely extensible, fast, and most importantly, easy to use :).




 

