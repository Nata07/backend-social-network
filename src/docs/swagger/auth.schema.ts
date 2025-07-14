export const authSchemas = {
  RegisterRequest: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: {
        type: 'string',
        example: 'John Doe'
      },
      email: {
        type: 'string',
        format: 'email',
        example: 'john@example.com'
      },
      password: {
        type: 'string',
        format: 'password',
        example: '123456'
      }
    }
  },
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'john@example.com'
      },
      password: {
        type: 'string',
        format: 'password',
        example: '123456'
      }
    }
  },
  UserResponse: {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            example: 'john@example.com'
          }
        }
      },
      token: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  }
};
