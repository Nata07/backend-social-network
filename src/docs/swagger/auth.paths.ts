export const authPaths = {
  '/api/auth/register': {
    post: {
      tags: ['Autenticação'],
      summary: 'Registra um novo usuário',
      description: 'Cria uma nova conta de usuário com nome, email e senha',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Usuário registrado com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserResponse'
              }
            }
          }
        },
        400: {
          description: 'Dados inválidos'
        },
        409: {
          description: 'Email já registrado'
        }
      }
    }
  },
  '/api/auth/login': {
    post: {
      tags: ['Autenticação'],
      summary: 'Login de usuário',
      description: 'Autentica um usuário e retorna um token JWT',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Login realizado com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserResponse'
              }
            }
          }
        },
        401: {
          description: 'Credenciais inválidas'
        },
        404: {
          description: 'Usuário não encontrado'
        }
      }
    }
  }
};
