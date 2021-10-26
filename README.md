# Team2021BSearchEngine
Class: CS-315 Server Side Programming
Authors: Nate Fabian & Joseph Choby
Purpose of the Program: Search Engine Project for CS315.

This search engine uses Node.js express and other relevant node packages to search through the keyword file on the CIS Linux Server using the user's desired search term and displays those results as a web page with clickable links to relevant HTML files on cis.stvincent.edu.

We used a home page to allow users to navigate to the search.html page that contains the submission form that users can put their terms into and submit. Upon submission, a GET is sent to our express web server that will comb the keywords file and return the results to the user in clickable link format. 

Extra Information:
The web server is within the CIS Linux server at /www/Team2021B and listens on port 8081. The keywords file that gets searched is at /www/cgi-bin/keywordfile3 on the CIS Linux server.

To run the web server:
Ensure that you are in the correct folder with our search engine and run: npm run start
If that fails run to install our node packages and libraries: npm install (or npm i)
With this running, use a browser and type in: localhost:8081
You will be defaultly placed onto the home page of the search engine project.
