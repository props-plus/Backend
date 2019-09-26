# API Documentation

#### Backend delpoyed at Heroku (https://props-plus-production.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm server** to start the local server
- **npm test** to start server using testing environment
- start ngrok
- Set up ngrok tunnel address in Slack App settings

## Endpoints

#### Routes

| Method | Endpoint         | Access Control   | Description                                                                 |
| ------ | ---------------- | ---------------- | --------------------------------------------------------------------------- |
| POST   | `/:props`        | Signed in users  | Endpoint for Slack slash command; Sends props to selected user              |
| POST   | `/:anon-props`   | Signed in users  | Endpoint for Slack slash command; Sends props anonymously to selected user  |
| POST   | `/:info`         | Signed in users  | Endpoint for Slack slash command; Returns user info                         |

# Data Model

#### WORKSPACES

---

```
{
  id: INTEGER
  name: STRING
  teamID: STRING
  teamIconSmall: STRING
  teamIconMed: STRING
  teamIconLarge: STRING
  isActive: BOOLEAN
}
```

#### WORKSPACE PROFILES

---

```
{
  id: INTEGER
  userName: STRING
  userID: STRING
  realName: STRING
  userIconSmall: STRING
  userIconMed: STRING
  userIconLarge: STRING
  isOwner: BOOLEAN
  isAdmin: BOOLEAN
  isActive: BOOLEAN
  fk_workspace_id: INTEGER [Foreign Key in WORKSPACES Table]
}
```

#### PROPS

---

```
{
  id: INTEGER
  createdAt: DATE & TIME STRING in YYYY-MM-DD [ 0 - 23 ] [HH:MM:SS]
  value: INTEGER
  message: TEXT
  isAnon: TEXT
  fk_to_workspace_profile_id: INTEGER [Foreign Key in WORKSPACE PROFILES Table]
}
```

#### BADGES

---

```
{
  id: INTEGER
  name: STRING
  minimumValue: INTEGER
  minimumPropCount: INTEGER
  isVisible: BOOLEAN
  image: STRING
}
```

#### WORKSPACE PROFILE BADGES

---

```
{
  fk_workspace_profile_id: INTEGER [Foreign Key in WORKSPACE PROFILES Table]
  fk_badge_id: INTEGER [Foreign Key in WORKSPACES BADGES Table]
}
```



## Actions

#### WORKSPACES

`add(dbTable, obj) -> Adds a workspace to the table`
`find() -> Returns all workspaces`
`findById(id) -> Returns a workspace by id`
`findByTeamID() -> Returns a workspace by team id`
`remove(id) -> Removes a workspace by id`
`update(id, obj) -> Updates the workspace by id`
`updateKey() -> Updates the workspace's key by id`

#### WORKSPACE PROFILES

`add(dbTable, obj) -> Adds a workspace profile to the table`
`find() -> Returns all the workspace profiles in the table`
`findById(id) -> Returns a workspace profile by id`
`findByUserName(userName) -> Returns a workspace profile by the user id`
`remove(id) -> Removes a workspace profile by id`
`update(id, obj) -> Updates a workspace profile by id`
`updateKey(id, obj) -> Updates the workspace profile's key by id`

#### PROPS

`add(dbTable, obj) -> Adds a prop to the table`
`find() -> Returns all the props in the table`
`findById(id) -> Returns a prop by id`
`findByUserID(fk_to_workspace_profile_id) -> Returns props belonging to specified user`
`findByDateRange(obj) -> Returns props given at specified date range`
`remove(id) -> Removes a prop by id`
`update(id, obj) -> Updates a prop by id`
`updateKey(id, obj) -> Updates a prop's key`

#### BADGES

`add(obj) -> Adds a badge to table`
`find() -> Returns all the badges in the table`
`findById(id) -> Returns a badge by id`
`remove(id) -> Removes a badge by id`
`update(id, obj) -> Updates a badge by id`

#### WORKSPACE PROFILE BADGES

`add(obj) -> Adds a workspace profile badge to the table`
`find() -> Returns all the workspace profile badges in the table`
`findById(id) -> Returns a workspace profile badge by id`
`remove(id) -> Removes a workspace profile badge by id`
`update(id, obj) -> Updates a workspace profile badge by id`

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    * BOT_TOKEN - Bot user tokens represent a bot associated with the app installed in a workspace, located in OAuth & Permissoins section of your Slack app. Props uses a bot to send props the users.
    * CLIENT_ID - Required to access the Slack API. Can be located in the Basic Information section of your Slack App.
    * SECRET_ID - Required when making ouath.access requests. Can be located in the Basic Information section of your Slack App.

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
