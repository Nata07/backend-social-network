export const likeSchemas = {
  LikeResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
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
          }
        }
      },
      createdAt: {
        type: 'string',
        format: 'date-time'
      }
    }
  },
  LikesListResponse: {
    type: 'object',
    properties: {
      likes: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LikeResponse'
        }
      },
      meta: {
        type: 'object',
        properties: {
          total: {
            type: 'integer',
            example: 50
          },
          page: {
            type: 'integer',
            example: 1
          },
          lastPage: {
            type: 'integer',
            example: 5
          }
        }
      }
    }
  },
  LikeStatusResponse: {
    type: 'object',
    properties: {
      liked: {
        type: 'boolean',
        example: true
      }
    }
  }
};
