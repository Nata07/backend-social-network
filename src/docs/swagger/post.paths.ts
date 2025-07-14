export const postPaths = {
  '/api/posts': {
    post: {
      tags: ['Posts'],
      summary: 'Criar novo post',
      description: 'Cria um novo post para o usuário autenticado',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PostRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Post criado com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PostResponse'
              }
            }
          }
        },
        401: {
          description: 'Não autorizado'
        }
      }
    },
    get: {
      tags: ['Posts'],
      summary: 'Listar posts',
      description: 'Lista todos os posts com paginação',
      parameters: [
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
          description: 'Lista de posts',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PostsListResponse'
              }
            }
          }
        }
      }
    }
  },
  '/api/posts/{id}': {
    get: {
      tags: ['Posts'],
      summary: 'Obter post específico',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID do post'
        }
      ],
      responses: {
        200: {
          description: 'Post encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PostResponse'
              }
            }
          }
        },
        404: {
          description: 'Post não encontrado'
        }
      }
    },
    put: {
      tags: ['Posts'],
      summary: 'Atualizar post',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
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
              $ref: '#/components/schemas/PostRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Post atualizado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PostResponse'
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
    delete: {
      tags: ['Posts'],
      summary: 'Deletar post',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID do post'
        }
      ],
      responses: {
        204: {
          description: 'Post deletado'
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
