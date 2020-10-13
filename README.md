This project is a minimalistic example of a personal account of a telecom company.  

Capabilities:  
- Registration by email with confirmation.
- Authorization by email / password pair.
- Filling in profile data.
- Editing profile / password.
- A page with the history of order / payment / use of some services.
- Page with balance and history of its changes.
- Pagination.

JSON Web Token (JWT) is used in this project.  
The client and server parts are separated.  
Frontend part - SPA (one-page).  
Backend - REST API.  


### Backend  

Django 2.2 LTS, djangorestframework, djangorestframework-simplejwt, django-environ

`cd backend`  
`python3 -m venv venv`  
`source venv/bin/activate`  
`./manage migrate`  
`./manage runserver`  



### Frontend  

Vue 2, vue-router, vuex, vuetify, axios

`cd frontend`  
`npm install`  
`npm run serve`  
`http://localhost:8080/`  
