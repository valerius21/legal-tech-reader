import { ApiHideProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Article } from '../article/article.entity';
import { Category } from '../category/category.entity';

@Entity({ orderBy: { name: 'ASC' } })
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  slug: string;

  @Column()
  link: string;

  @Column()
  rss: string;

  @Column({ default: '' })
  icon: string;

  @OneToMany(() => Article, article => article.blog, { cascade: true })
  @ApiHideProperty()
  articles: Article[];

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, category => category.blogs)
  @ApiHideProperty()
  category: Category;

  @CreateDateColumn()
  @ApiHideProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiHideProperty()
  updatedAt: Date;

  @VersionColumn()
  @ApiHideProperty()
  version: number;

  constructor(blog: Partial<Blog> = {}) {
    Object.assign(this, blog);
  }
}
