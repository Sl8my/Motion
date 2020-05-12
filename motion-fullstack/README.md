# How to run the project

### backend:
- In the root folder of the project:
    - docker-compose up
    - search for the name of the container to access it:
        - docker exec -ti 'name of the container' bash
    - inside the container:
        - python manage.py migrate
        - python manage.py makemigrations
        - python manage.py createsuperuser
        - python manage.py runserver 0.0.0.0:8000
    
- In your broswer go to : **localhost:8000/admin/**

### Frontend:

- In the folder Frontend:
    - npm install
    - npm start
    
- In your broswer go to : **localhost:3000**

# General Notes

- create the project in gitlab.

# Backend Setup
- create the .gitignore file for the project section.
- create the folder backend.
- In the folder backend, create the requirements.yaml file with the dependencies.        
- Inside the folder backend, create the django project:

        django-admin startproject app .
        
- Run the following to run the project

        python manage.py migrate
        python manage.py makemigrations
        python manage.py createsuperuser
        python manage.py runserver
        
- project is running on:

        Starting development server at http://127.0.0.1:8000/
        
- To access admin section:

        127.0.0.1:8000/admin

- In setting, change the time zone for Switzerland

        TIME_ZONE = 'Europe/Zurich'
        
- In the root of the project, create dev.env

        POSTGRES_HOST=postgres
        POSTGRES_PORT=5432
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=postgres
        POSTGRES_DB=postgres
        DJANGO_DEBUG=True

- In settings, add POSTGRES database settings:
        
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.postgresql_psycopg2',
                'NAME': os.environ.get('POSTGRES_DB'),
                "PORT": os.environ.get('POSTGRES_PORT'),
                "HOST": os.environ.get('POSTGRES_HOST'),
                "USER": os.environ.get('POSTGRES_USER'),
                "PASSWORD": os.environ.get('POSTGRES_PASSWORD'),
            }
        }

- delete sqlite3 files on the project.
- Install psycopg2 with pip and add it to the requirements: 

        pip install psycopg2

# Frontend Setup

- create the folder Frontend in the root of the project.
- create the .gitignore file for the frontend section.
- create the React project in the root of the project:

        npx create-react-app frontend
        
# DevOps

- create the Dockerfile

        FROM continuumio/miniconda:latest
        
        ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
        
        RUN apt-get update && apt-get upgrade -y && apt-get install -qqy \
            wget \
            bzip2 \
            graphviz \
            libssl-dev \
            openssh-server
        
        RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -y nodejs && apt-get install -y npm
        
        RUN mkdir /var/run/sshd
        
        # user:password to have access to container from pycharm
        RUN echo 'root:screencast' | chpasswd
        RUN sed -i '/PermitRootLogin/c\PermitRootLogin yes' /etc/ssh/sshd_config
        
        # SSH login fix. Otherwise user is kicked off after login
        RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
        
        ENV NOTVISIBLE "in users profile"
        RUN echo "export VISIBLE=now" >> /etc/profile
        
        RUN mkdir -p /backend
        COPY ./backend/requirements.yml /backend/requirements.yml
        RUN /opt/conda/bin/conda env create -f /backend/requirements.yml
        ENV PATH /opt/conda/envs/backend/bin:$PATH
        
        ENV PYTHONDONTWRITEBYTECODE 1
        RUN echo "source activate backend" >~/.bashrc
        
        COPY ./scripts /scripts
        RUN chmod +x ./scripts*
        
        RUN mkdir -p /frontend
        WORKDIR /frontend
        COPY ./frontend/package.json /frontend/
        RUN npm install
        COPY ./frontend /frontend
        RUN npm run build
        
        COPY ./backend /backend
        WORKDIR /backend
                
- Create the folder scripts.
- create the run.sh file in the folder scripts
- complete the requirements.yaml:

        name: backend
        dependencies:
          - python=3.7.4
          - psycopg2
          - pip:
              - Django==2.2.5
              - flake8
              - djangorestframework==3.9.4
              - django-filter==2.1.0
              - djangorestframework_simplejwt==4.3.0
              - coreapi==2.3.3
              - gunicorn
              - Pillow
              
- Create docker-compose.yml

        version: '3'

        services:
          postgres:
            image: postgres:latest
            ports:
              - '5432:5432'
            env_file:
              - dev.env
            volumes:
              - postgres:/var/lib/postgresql/data
        
          backend:
            image: registry.gitlab.com/rubenvillalon/rr_project:latest
            restart: always
            env_file:
              - dev.env
            command: '/usr/sbin/sshd -D'
            ports:
              - '8000:8000'
              - '4777:22'
            depends_on:
              - postgres
            volumes:
              - ./backend:/backend
              - ./media-files:/media-files
              - ./static-files:/static-files
        
        volumes:
          postgres:
          media-files:
          static-files:

- Create folder ngnix
- In the folder ngnix, create default.conf with basic config with no domain:

        server {
           listen 80 default_server;
           listen [::]:80;
           server_name _;
           root /app;
           location / {
           }
        }

- In the terminal login into Gitlab:

        docker login registry.gitlab.com
        
- In Gitlab, go to packages and build the registry:

        docker build -t registry.gitlab.com/rubenvillalon/rr_project .
        
 - Add the registry to the image in docker-compose.yml file
 - In Gitlab, go to packages/Container Registry and push the registry:
 
        docker push registry.gitlab.com/rubenvillalon/rr_project
        
# Django

- Setup authentication views with Rest Framework simplejwt, in settings:

        REST_FRAMEWORK = {
            'DEFAULT_AUTHENTICATION_CLASSES': [
                'rest_framework_simplejwt.authentication.JWTAuthentication',
                'rest_framework.authentication.SessionAuthentication',
            ],
            'DEFAULT_PERMISSION_CLASSES': [
                'rest_framework.permissions.IsAuthenticated',
            ],
        }
        
        SIMPLE_JWT = {
            'ACCESS_TOKEN_LIFETIME': timedelta(days=2),
            'REFRESH_TOKEN_LIFETIME': timedelta(days=4)
        }
        
- set the paths on the root url of the project:

        from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

        urlpatterns = [        
            path('backend/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
            path('backend/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
            path('backend/token/verify/', TokenVerifyView.as_view(), name='token_verify')
        ]

- create userProfile django app:

        python manage.py startapp userProfile
        
- create the model
- create the serializer
- register your django-app in admin.py
- register it in apps.py
- add the app to the settings.


- permission_classes = [] if is empty overwrites the default permissions.
    you can create your own permissions.       
    get update or delete
    overwrote has_object_permissions, because on the argumetns you have also the object.
    SAFE.METHODS is get, means that it not changing anythong on the database
    and return if the obj.owner == request,user 



