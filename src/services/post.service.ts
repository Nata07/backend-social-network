import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreatePostData {
  content: string;
  authorId: number;
}

interface UpdatePostData {
  content: string;
}

export class PostService {
  async createPost({ content, authorId }: CreatePostData) {
    return prisma.post.create({
      data: {
        content,
        authorId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async getPosts(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          _count: {
            select: {
              likes: true,
              comments: true
            }
          }
        }
      }),
      prisma.post.count()
    ]);

    return {
      posts,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit)
      }
    };
  }

  async getPostById(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    });

    if (!post) {
      throw new Error('Post não encontrado');
    }

    return post;
  }

  async updatePost(id: number, authorId: number, { content }: UpdatePostData) {
    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      throw new Error('Post não encontrado');
    }

    if (post.authorId !== authorId) {
      throw new Error('Não autorizado');
    }

    return prisma.post.update({
      where: { id },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async deletePost(id: number, authorId: number) {
    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      throw new Error('Post não encontrado');
    }

    if (post.authorId !== authorId) {
      throw new Error('Não autorizado');
    }

    await prisma.post.delete({
      where: { id }
    });
  }

  async getUserPosts(userId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          authorId: userId
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          _count: {
            select: {
              likes: true,
              comments: true
            }
          }
        }
      }),
      prisma.post.count({
        where: {
          authorId: userId
        }
      })
    ]);

    return {
      posts,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit)
      }
    };
  }
}
