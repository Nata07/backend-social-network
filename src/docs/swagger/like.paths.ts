export const likePaths = {
  '/api/posts/{postId}/like': {
    post: {
      tags: ['Likes'],
      summary: 'Curtir/descurtir post',
      description: 'Alterna o status de curtida de um post (like/unlike)',
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
      responses: {
        200: {
          description: 'Status da curtida alterado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LikeStatusResponse'
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
    }
  },
  '/api/posts/{postId}/likes': {
    get: {
      tags: ['Likes'],
      summary: 'Listar curtidas',
      description: 'Lista todas as curtidas de um post com paginação',
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
          description: 'Lista de curtidas',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LikesListResponse'
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
  '/api/posts/{postId}/like-status': {
    get: {
      tags: ['Likes'],
      summary: 'Verificar status da curtida',
      description: 'Verifica se o usuário atual curtiu o post',
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
      responses: {
        200: {
          description: 'Status da curtida',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LikeStatusResponse'
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
    }
  }
};
