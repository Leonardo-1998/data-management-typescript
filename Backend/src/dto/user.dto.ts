import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsOptional()
  @IsString({ message: 'Name must be string' })
  name?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be string' })
  @MinLength(6, { message: 'Password minimal 6 characters' })
  password!: string;
}

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsNotEmpty()
  @IsString({ message: 'Password must be string' })
  @MinLength(6, { message: 'Password minimal 6 characters' })
  password!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be string' })
  name?: string;
}
