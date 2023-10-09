import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import {
  AuthUserEntity,
  ProjectEntity,
  ProjectMembersEntity,
} from './entities/entities';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AuthUserEntity)
    private readonly authUserRepository: EntityRepository<AuthUserEntity>,

    @InjectRepository(ProjectEntity)
    private readonly projectRepository: EntityRepository<ProjectEntity>,

    @InjectRepository(ProjectMembersEntity)
    private readonly projectMembersRepository: EntityRepository<ProjectMembersEntity>,

    public em: EntityManager,
  ) {}

  async setup() {
    const user = this.authUserRepository.create({
      username: 'test',
    });

    await this.em.persistAndFlush(user);

    const project = this.projectRepository.create({
      name: 'test',
      owner: user,
    });

    await this.em.persistAndFlush(project);

    const projectMember = this.projectMembersRepository.create({
      project,
      user,
    });

    await this.em.persistAndFlush(projectMember);

    return true;
  }

  async test() {
    const x = await this.authUserRepository.findOne(
      {
        username: 'test',
      },
      {
        fields: [
          'id',
          'username',
          'projects.id',
          'projects.user.id',
          'projects.user.username',
          'projects.project.id',
          'projects.project.name',
          'projects.project.owner.id',
          'projects.project.owner.username',
        ],
      },
    );

    return x;
  }
}
