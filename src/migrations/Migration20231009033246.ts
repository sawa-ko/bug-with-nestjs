import { Migration } from '@mikro-orm/migrations';

export class Migration20231009033246 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "auth_users" ("id" serial primary key, "created_at" timestamp not null, "updated_at" timestamp not null, "version" numeric(10,0) not null default 1, "username" varchar not null);');
    this.addSql('comment on table "auth_users" is \'Information about all users on the platform.\';');
    this.addSql('comment on column "auth_users"."version" is \'Optimistic Locking transactions.\';');
    this.addSql('comment on column "auth_users"."username" is \'Unique username per user.\';');
    this.addSql('alter table "auth_users" add constraint "auth_users_username_unique" unique ("username");');

    this.addSql('create table "projects" ("id" serial primary key, "created_at" timestamp not null, "updated_at" timestamp not null, "version" numeric(10,0) not null default 1, "name" varchar(50) not null, "owner_id" int not null);');
    this.addSql('comment on table "projects" is \'Projects to manage and group boards.\';');
    this.addSql('comment on column "projects"."version" is \'Optimistic Locking transactions.\';');
    this.addSql('comment on column "projects"."name" is \'Project\'\'s name.\';');
    this.addSql('comment on column "projects"."owner_id" is \'Project owner user. If the owner deletes their account, the projects will also be affected.\';');

    this.addSql('create table "projects_members" ("id" serial primary key, "created_at" timestamp not null, "updated_at" timestamp not null, "version" numeric(10,0) not null default 1, "project_id" int not null, "user_id" int not null);');
    this.addSql('comment on table "projects_members" is \'Users invited to projects.\';');
    this.addSql('comment on column "projects_members"."version" is \'Optimistic Locking transactions.\';');
    this.addSql('comment on column "projects_members"."project_id" is \'Project to which the user is a member.\';');
    this.addSql('comment on column "projects_members"."user_id" is \'User member of the project.\';');

    this.addSql('alter table "projects" add constraint "projects_owner_id_foreign" foreign key ("owner_id") references "auth_users" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "projects_members" add constraint "projects_members_project_id_foreign" foreign key ("project_id") references "projects" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "projects_members" add constraint "projects_members_user_id_foreign" foreign key ("user_id") references "auth_users" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "projects" drop constraint "projects_owner_id_foreign";');

    this.addSql('alter table "projects_members" drop constraint "projects_members_user_id_foreign";');

    this.addSql('alter table "projects_members" drop constraint "projects_members_project_id_foreign";');

    this.addSql('drop table if exists "auth_users" cascade;');

    this.addSql('drop table if exists "projects" cascade;');

    this.addSql('drop table if exists "projects_members" cascade;');
  }

}
