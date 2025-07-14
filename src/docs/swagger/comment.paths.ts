export const commentPaths = {
  '/api/posts/{postId}/comments': {
    post: {
      tags: ['Comentários'],
      summary: 'Criar comentário',
      description: 'Cria um novo comentário em um post',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'postId',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID do post'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CommentRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Comentário criado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CommentResponse'
              }
            }
          }
        },
        401: {
          description: 'Não autorizado'
        },
        404: {
          description: 'Post não encontrado'
        }
      }
    },
    get: {
      tags: ['Comentários'],
      summary: 'Listar comentários',
      description: 'Lista todos os comentários de um post com paginação',
      parameters: [
        {
          in: 'path',
          name: 'postId',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID do post'
        },
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'integer',
            default: 1
          },
          description: 'Número da página'
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
            default: 10
          },
          description: 'Itens por página'
        }
      ],
      responses: {
        200: {
          description: 'Lista de comentários',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CommentsListResponse'
              }
            }
          }
        },
        404: {
          description: 'Post não encontrado'
        }
      }
    }
  },
  '/api/comments/{id}': {
    put: {
      tags: ['Comentários'],
      summary: 'Atualizar comentário',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID do comentário'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['content'],
              properties: {
                content: {
                  type: 'string',
                  example: 'Comentário atualizado'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Comentário atualizado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CommentResponse'
              }
            }
          }
        },
        401: {
          description: 'Não autorizado'
        },
        404: {
          description: 'Comentário não encontrado'
        }
      }
    },
    delete: {
      tags: ['Comentários'],
      summary: 'Deletar comentário',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID do comentário'
        }
      ],
      responses: {
        204: {
          description: 'Comentário deletado'
        },
        401: {
          description: 'Não autorizado'
        },
        404: {
          description: 'Comentário não encontrado'
        }
      }
    }
  },
  '/api/comments/{commentId}/replies': {
    get: {
      tags: ['Comentários'],
      summary: 'Listar respostas',
      description: 'Lista todas as respostas de um comentário com paginação',
      parameters: [
        {
          in: 'path',
          name: 'commentId',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID do comentário'
        },
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'integer',
            default: 1
          },
          description: 'Número da página'
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
            default: 10
          },
          description: 'Itens por página'
        }
      ],
      responses: {
        200: {
          description: 'Lista de respostas',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CommentsListResponse'
              }
            }
          }
        },
        404: {
          description: 'Comentário não encontrado'
        }
      }
    }
  }
};
