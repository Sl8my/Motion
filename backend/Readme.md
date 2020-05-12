# Motion backend solutions
## Endpoints
All the following endpoints should be prefixed with /backend
#### Auth & Registration
* `/api/auth/token/` POST: Get a new JWT by passing username and password
* `/api/auth/token/refresh/` POST: Get a new JWT by passing an old still valid refresh token.
* `/api/auth/token/verify/` POST: Verify a token by passing the access token in the body
* `/api/registration/` POST: Register a new user by asking for an email (send email validation code)
* `/api/registration/validation/` PATCH: Validate a new registered user with a validation code sent by email
* `/api/auth/password-reset/` POST: Reset users password by sending a validation code in an email
* `/api/auth/password-reset/validation/` PATCH: Validate password reset token and set new password for the user

#### Users
	
* `/api/users/?search=<str:search_string>` GET: Get all the users or filter them by search string.
* `/api/users/<int:user_id>/` GET: Get specific user 
* `/api/users/me/` GET, PATCH, DELETE: Get logged in user 

#### Follow
* `/api/social/toggle-follow/<int:user_id>/` POST: Toggle following a user
* `/api/social/followers/followers/` GET: List of all the logged in user’s followers 
* `/api/social/followers/following/` GET: List of all the users the user is following


#### Friends
* `/api/social/friends/request/<int:user_id>/` POST: Send friend request to another user
* `/api/social/friends/requests/<int:friend_request_id>/` GET,PATCH,DELETE: Get Update (Accept, Reject) or Delete an open friend request
* `/api/social/friends/requests/?status=<str:status>` GET: List of all friend requests logged in user is in  filtered by status
* `/api/social/friends/` GET: List all accepted friends¨

#### Posts
* `/api/social/posts/` GET,POST: user can make a new post by sending post data, or get all posts.
* `/api/social/posts/<int:post_id>/` GET, PATCH, DELETE: get a specific post by ID and display all the information about that post. Update or delete it if logged in user is the original poster
* `/api/social/posts/<int:user_id>/?search=<str:search_string>` GET: lists all the posts of a specific user in chronological order
* `/api/social/posts/me/?search=<str:search_string>` GET: lists all the posts of logged in user.
* `/api/social/posts/following/?search=<str:search_string>` GET: lists all the posts of of users the logged in user is following.
* `/api/social/posts/friends/?search=<str:search_string>` GET: lists all the posts of of users the logged in user is following.
* `/api/social/posts/toggle-like/<int:post_id>/` POST: toggle like a post
* `/api/social/posts/likes/` GET: the list of the posts the user likes

#### Comments
* `api/social/comments/<int:post_id>/` GET, POST: Create new post or get all comments of a post.

