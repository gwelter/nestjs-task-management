import { IsOptional, IsIP, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: string;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
