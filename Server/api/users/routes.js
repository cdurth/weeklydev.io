import { authenticateUser } from './util/userFunctions'

const routes = [
  /**
  * Login
  */
  {
    method: 'POST',
    path: '/login',
    config: {
      pre: [{
        method: authenticateUser,
        assign: 'user'
      }],
      auth: 'userPass' // Requires basic auth (username:password)
    },
    handler: _.login
  },

  /**
  * Logout
  */
  {
    method: 'get',
    path: '/logout',
    config: {
      auth: 'jwt'
    },
    handler: somehandler
  },

  /*
  * Create a new user
  */
  {
    method: 'POST',
    path: '/users/new',
    config: {
      validate: {
        payload: createUserSchema
      },
      // Before the route handler runs, verify that
      // the user is unique and assign the result to 'user'
      pre: [{
        method: verifyUniqueUser,
        assign: 'user'
      }],
      // to register user does not need any authentication
      auth: false
    },
    handler: _.addUser
  },

  /**
   * Get all users
   */
  {
    method: 'GET',
    path: '/users',
    config: {
      auth: 'jwt'
    },
    handler: _.getUsers
  },

  /**
   * Update user by ID
   */
  {
    method: 'PUT',
    path: '/users/{id}',
    config: {
      auth: 'jwt'
    },
    handler: _.updateUser
  },

  {
  /**
   * Get users one user by id
   */
    method: 'GET',
    path: '/users/{id}',
    config: {
      auth: 'jwt'
    },
    handler: _.getUser
  },
  
  /**
   * Update user by ID
   */
  {
    method: 'DELETE',
    path: '/users/{id}',
    config: {
      auth: 'jwt'
    },
    handler: _.deleteUser
  },

  /**
   * Get user by request id
   */
  {
    method: 'GET',
    path: '/users/me',
    config: {
      auth: 'jwt'
    },
    handler: _.getCurrentUser
  },

  /**
   * Get user by request id
   */
  {
    method: 'GET',
    path: '/users/me/teams',
    config: {
      auth: 'jwt'
    },
    handler: _.getTeamsIn
  }
]

export default routes
