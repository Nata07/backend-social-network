export const commentSchemas = {
  CommentRequest: {
    type: 'object',
    required: ['content'],
    properties: {
      content: {
        type: 'string',
        example: 'Ótimo post!'
      },
      parentId: {
        type: 'integer',
        example: 1,
        description: 'ID do comentário pai (opcional, para respostas)'
      }
    }
  },
  CommentResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1
      },
      content: {
        type: 'string',
        example: 'Ótimo post!'
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
      repliesCount: {
        type: 'integer',
        example: 2
      },
      parentId: {
        type: 'integer',
        example: null,
        nullable: true
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
  CommentsListResponse: {
    type: 'object',
    properties: {
      comments: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/CommentResponse'
        }
      },
      meta: {
        type: 'object',
        properties: {
          total: {
            type: 'integer',
            example: 20
          },
          page: {
            type: 'integer',
            example: 1
          },
          lastPage: {
            type: 'integer',
            example: 2
          }
        }
      }
    }
  }
};
