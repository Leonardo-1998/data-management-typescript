import { Injectable, NotFoundException } from '@nestjs/common';
import { PostDto } from 'src/dto/post.dto';
import { Post } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // Get All Post By AuthorId
  async postAll(): Promise<Post[]> {
    const post = await this.prisma.post.findMany();
    return post;
  }

  // Get All Post By AuthorId
  async post(data: { userId: number }): Promise<Post[]> {
    const post = await this.prisma.post.findMany({
      where: { authorId: data.userId },
    });
    return post;
  }

  // Create Post
  async create(params: { data: PostDto; authorId: number }): Promise<Post> {
    const { data, authorId } = params;

    return await this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: authorId,
      },
    });
  }

  // Get One Post
  async getOne(params: { postId: string }): Promise<Post> {
    const { postId } = params;
    const post = await this.prisma.post.findUnique({
      where: { id: parseInt(postId) },
      include: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  // Update One Post
  async updateOne(params: { data: PostDto; postId: string }): Promise<Post> {
    const { data, postId } = params;
    const post = await this.prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.post.update({
      where: { id: parseInt(postId) },
      data,
    });
  }

  // Delete One Post
  async deleteOne(params: { postId: string }): Promise<Post> {
    const { postId } = params;
    const post = await this.prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.post.delete({
      where: { id: parseInt(postId) },
    });
  }
}
