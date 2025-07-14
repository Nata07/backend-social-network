import { authPaths } from '../docs/swagger/auth.paths';
import { authSchemas } from '../docs/swagger/auth.schema';
import { postPaths } from '../docs/swagger/post.paths';
import { postSchemas } from '../docs/swagger/post.schema';
import { likePaths } from '../docs/swagger/like.paths';
import { likeSchemas } from '../docs/swagger/like.schema';
import { commentPaths } from '../docs/swagger/comment.paths';
import { commentSchemas } from '../docs/swagger/comment.schema';

export const specs = {
  openapi: '3.0.0',
  info: {
    title: 'API de Rede Social',
    version: '1.0.0',
    description: 'API RESTful para uma rede social com posts, comentários e likes',
    contact: {
      name: 'Suporte',
      email: 'suporte@exemplo.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Servidor de Desenvolvimento'
    }
  ],
  paths: {
    ...authPaths,
    ...postPaths,
    ...likePaths,
    ...commentPaths
  },
  components: {
    schemas: {
      ...authSchemas,
      ...postSchemas,
      ...likeSchemas,
      ...commentSchemas
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};
