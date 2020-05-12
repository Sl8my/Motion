# Custom user model
#### Installation & Usage
1. Make sure your settings.py contains the following:
```
INSTALLED_APPS = [
     ...
    'app.users',
    ...
]

AUTH_USER_MODEL = 'users.User'
```
2. Migrate
3. Add 
```
path('backend/api/users/', include('app.users.urls')),
```
to your root urls.py to have access to all user endpoints.


