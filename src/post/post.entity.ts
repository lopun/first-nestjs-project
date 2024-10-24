import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'posts',
})
@Index('IDX_POST_TITLE', ['title']) // title에 대한 인덱스 이름 지정
@Index('IDX_POST_AUTHOR_ID', ['authorId']) // authorId에 대한 인덱스 이름 지정
@Index('IDX_POST_TITLE_AUTHOR_ID', ['title', 'authorId'], { unique: true })
export class Post {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'int',
    name: 'author_id',
    nullable: false,
  })
  authorId: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
