import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, undefined)
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isFinished: boolean;

  constructor(params?: Partial<CreateTaskDto>) {
    if (params) Object.assign(this, params);
  }
}
