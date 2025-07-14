import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LikeService {
  async toggleLike(postId: number, userId: number) {
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId
        }
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId
          }
        }
      });
      return { liked: false };
    }

    await prisma.like.create({
      data: {
        postId,
        userId
      }
    });
    return { liked: true };
  }

  async getLikes(postId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [likes, total] = await Promise.all([
      prisma.like.findMany({
        where: {
          postId
        },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.like.count({
        where: {
          postId
        }
      })
    ]);

    return {
      likes,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit)
      }
    };
  }

  async checkLikeStatus(postId: number, userId: number) {
    const like = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId
        }
      }
    });

    return { liked: !!like };
  }
}
