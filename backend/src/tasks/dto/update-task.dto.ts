import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsNotEmpty()
  @Length(3, undefined)
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isFinished: boolean;

  constructor(params?: Partial<UpdateTaskDto>) {
    super();
    if (params) Object.assign(this, params);
  }
}
