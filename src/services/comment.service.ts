import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateCommentData {
  content: string;
  postId: number;
  authorId: number;
  parentId?: number;
}

interface UpdateCommentData {
  content: string;
}

export class CommentService {
  async createComment({ content, postId, authorId, parentId }: CreateCommentData) {
    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      throw new Error('Post não encontrado');
    }

    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId }
      });

      if (!parentComment) {
        throw new Error('Comentário pai não encontrado');
      }
    }

    return prisma.comment.create({
      data: {
        content,
        post: {
          connect: { id: postId }
        },
        author: {
          connect: { id: authorId }
        },
        ...(parentId && {
          parent: {
            connect: { id: parentId }
          }
        })
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

  async getComments(postId: number, page = 1, limit = 10, parentId?: number) {
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: {
          postId,
          parentId: parentId || null // null para comentários principais
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
              replies: true
            }
          }
        }
      }),
      prisma.comment.count({
        where: {
          postId,
          parentId: parentId || null
        }
      })
    ]);

    return {
      comments,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit)
      }
    };
  }

  async updateComment(id: number, userId: number, { content }: UpdateCommentData) {
    const comment = await prisma.comment.findUnique({
      where: { id }
    });

    if (!comment) {
      throw new Error('Comentário não encontrado');
    }

    if (comment.authorId !== userId) {
      throw new Error('Não autorizado');
    }

    return prisma.comment.update({
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

  async deleteComment(id: number, userId: number) {
    const comment = await prisma.comment.findUnique({
      where: { id }
    });

    if (!comment) {
      throw new Error('Comentário não encontrado');
    }

    if (comment.authorId !== userId) {
      throw new Error('Não autorizado');
    }

    await prisma.comment.delete({
      where: { id }
    });
  }

  async getReplies(commentId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [replies, total] = await Promise.all([
      prisma.comment.findMany({
        where: {
          parentId: commentId
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
              replies: true
            }
          }
        }
      }),
      prisma.comment.count({
        where: {
          parentId: commentId
        }
      })
    ]);

    return {
      replies,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit)
      }
    };
  }
}
