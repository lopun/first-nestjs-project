import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post | null> {
    return this.postRepository.findOne({ where: { id } });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const post = this.postRepository.create(createPostDto);
      return await this.postRepository.save(post);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          '해당 제목과 작성자를 가진 게시글이 이미 존재합니다.',
        );
      }
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post | null> {
    try {
      const result = await this.postRepository.update(id, updatePostDto);

      if (result.affected === 0) {
        throw new NotFoundException(
          `${id}에 해당하는 Post를 찾을 수 없습니다.`,
        );
      }

      return this.postRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.postRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(
          `${id}에 해당하는 Post를 찾을 수 없습니다.`,
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
