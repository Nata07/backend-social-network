export const postSchemas = {
  PostRequest: {
    type: 'object',
    required: ['content'],
    properties: {
      content: {
        type: 'string',
        example: 'Meu primeiro post!'
      }
    }
  },
  PostResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      content: {
        type: 'string',
        example: 'Meu primeiro post!'
      },
      author: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          name: {
            type: 'string',
            example: 'John Doe'
          }
        }
      },
      likesCount: {
        type: 'integer',
        example: 0
      },
      commentsCount: {
        type: 'integer',
        example: 0
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time'
      }
    }
  },
  PostsListResponse: {
    type: 'object',
    properties: {
      posts: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/PostResponse'
        }
      },
      meta: {
        type: 'object',
        properties: {
          total: {
            type: 'integer',
            example: 100
          },
          page: {
            type: 'integer',
            example: 1
          },
          lastPage: {
            type: 'integer',
            example: 10
          }
        }
      }
    }
  }
};
