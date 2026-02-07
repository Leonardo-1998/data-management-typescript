import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { successResponse } from 'src/common';
import { verifyAuthHeader } from 'src/utils';
import { PostDto } from 'src/dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Get All By AuthorId
  @Get()
  async post(@Headers('authorization') authHeader: string) {
    const payload = verifyAuthHeader(authHeader);

    const post = await this.postService.post({ userId: payload.userId });
    return successResponse(post, 'Get all post by AuthorId successfuly');
  }

  // Get All
  @Get('public')
  async postAll() {
    const post = await this.postService.postAll();
    return successResponse(post, 'Get all post successfuly');
  }

  // Create
  @Post('create')
  async create(
    @Headers('authorization') authHeader: string,
    @Body() postDto: PostDto,
  ) {
    const payload = verifyAuthHeader(authHeader);

    const createPost = await this.postService.create({
      data: postDto,
      authorId: payload.userId,
    });

    return createPost;
  }

  // Get One
  @Get(':id')
  async postOne(@Param('id') id: string) {
    const getOne = await this.postService.getOne({
      postId: id,
    });

    return getOne;
  }

  // Update One
  @Put(':id')
  async updateOne(@Body() postDto: PostDto, @Param('id') id: string) {
    const updateOne = await this.postService.updateOne({
      data: postDto,
      postId: id,
    });

    return updateOne;
  }

  // Delete One
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const deleteOne = await this.postService.deleteOne({
      postId: id,
    });

    return deleteOne;
  }
}
