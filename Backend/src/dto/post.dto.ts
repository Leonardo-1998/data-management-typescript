import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be string' })
  title!: string;

  @IsOptional()
  @IsString({ message: 'Content must be string' })
  content?: string;
}
