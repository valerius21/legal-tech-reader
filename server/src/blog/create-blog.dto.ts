import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiModelProperty()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiModelProperty()
  categoryId: string;
}
