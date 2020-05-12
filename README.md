# Motion
A social-media clone

```

### Installing

In the folder Frontend:

```
    - npm install
    - npm start
```

- In the root folder of the project:

```
    - docker-compose up
    - search for the name of the container to access it:
        - docker exec -ti 'name of the container' bash
    - inside the container:
        - python manage.py migrate
        - python manage.py makemigrations
        - python manage.py createsuperuser
        - python manage.py runserver 0.0.0.0:8000
```

# framework used for the frontend

    Front-end Framework/Library:
        -   React
    Fetching: 
        -   Axios
    Styling:
        -   Styled Components
    State Management:
        -   redux
        -   react-redux
        -   redux-thunk
        -   redux-devtools-extension
    Routing:
        -   react-router
    Tools:
        -   polished (pixels convertion to rem)
