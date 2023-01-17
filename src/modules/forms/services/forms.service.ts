import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import ErrorsApp from '@errors/ErrorsApp';

import { UsersService } from '../../users/services/users.service';
import { FindOneParamsDto } from '../dto/findOneParams.dto';
import { CreateFormDto } from '../dto/createForm.dto';
import { UpdateFormDto } from '../dto/updateForm.dto';
import { Form } from '../entities/form.entity';
import { UserRole } from '../../users/entities/user.entity';

@Injectable()
export class FormsService {
  constructor(
    @Inject('FormsRepository')
    private formsRepository: Repository<Form>,
    private usersService: UsersService,
  ) {}
  async create(data: CreateFormDto, params: FindOneParamsDto): Promise<Form> {
    // Busca a existência do client
    const client = await this.usersService.findOneById(params);

    // Busca a existência do arquiteto
    const architect = await this.usersService.findOneById({
      id: data.architectId,
    });

    if (!client || !architect) {
      throw new ErrorsApp('Cliente ou arquiteto não encontrado!', 404);
    }

    if (client && client.role !== UserRole.CLIENT) {
      throw new ErrorsApp(
        'Você não tem permissão para executar essa ação!',
        401,
      );
    }

    // Cria no formato do banco
    const newForm = await this.formsRepository.create({
      ...data,
      architect: architect,
      client: client,
    });

    // Salva no banco o formulário
    return await this.formsRepository.save(newForm);
  }

  async findAll(params: FindOneParamsDto) {
    // Busca o usuário no banco
    const searchUser = await this.usersService.findOneById(params);

    // Cria uma query personalizada
    const listForms = this.formsRepository.createQueryBuilder('form');

    if (!searchUser) {
      throw new ErrorsApp('Usuário não encontrado!', 404);
    }
    // Se a role do usuário for do tipo architect ele retorna os forms que pertencem a ele
    if (searchUser.role === UserRole.ARCHITECT) {
      listForms
        .leftJoinAndSelect('form.client', 'users as usersClient')
        .leftJoinAndSelect('form.architect', 'users as usersArchitect')
        .where('form."architectId" = :architectId', {
          architectId: searchUser.id,
        })
        .andWhere('form.archived = false');
    }
    // Se a role do usuário for do tipo client ele retorna os forms que pertencem a ele
    else {
      listForms
        .leftJoinAndSelect('form.client', 'users as usersClient')
        .leftJoinAndSelect('form.architect', 'users as usersArchitect')
        .where('form."clientId" = :clientId', {
          clientId: searchUser.id,
        })
        .andWhere('form.archived = false');
    }

    return await listForms.getManyAndCount();
  }

  async findArchiveds(userId: FindOneParamsDto) {
    // Busca o usuário no banco
    const searchUser = await this.usersService.findOneById(userId);

    // Cria uma query personalizada
    const listForms = this.formsRepository.createQueryBuilder('form');

    if (!searchUser) {
      throw new ErrorsApp('Arquiteto não encontrado!', 404);
    }

    // Se a role do usuário for do tipo architect ele retorna os forms que pertencem a ele
    if (searchUser.role === UserRole.ARCHITECT) {
      listForms
        .leftJoinAndSelect('form.client', 'users as usersClient')
        .leftJoinAndSelect('form.architect', 'users as usersArchitect')
        .where('form."architectId" = :architectId', {
          architectId: searchUser.id,
        })
        .andWhere('form.archived = true');
    }
    // Se a role do usuário for do tipo client ele retorna os forms que pertencem a ele
    else {
      listForms
        .leftJoinAndSelect('form.client', 'users as usersClient')
        .leftJoinAndSelect('form.architect', 'users as usersArchitect')
        .where('form."clientId" = :clientId', {
          clientId: searchUser.id,
        })
        .andWhere('form.archived = true');
    }

    return await listForms.getManyAndCount();
  }

  async findOneById(params: FindOneParamsDto) {
    const searchForm = await this.formsRepository.findOne({
      where: { id: params.id, archived: true },
      relations: { architect: true, client: true },
    });

    if (!searchForm) {
      throw new ErrorsApp('Formulário não encontrado!');
    }

    return searchForm;
  }

  async update(
    params: FindOneParamsDto,
    data: UpdateFormDto,
    userId: any,
  ): Promise<Form> {
    let dataUpdate;

    let searchForm = await this.formsRepository.findOne({
      where: { id: params.id },
      relations: { architect: true, client: true },
    });

    if (!searchForm) {
      throw new ErrorsApp('Formulário não encontrado!');
    }

    if (data.architectId) {
      // Busca a existência do arquiteto
      const architect = await this.usersService.findOneById({
        id: data.architectId,
      });

      if (!architect) {
        throw new ErrorsApp('Arquiteto não encontrado!', 404);
      }

      dataUpdate = { ...data, architect: architect };
    }

    const searchUser = await this.usersService.findOneById(userId);

    if (
      searchUser &&
      data.status &&
      data.status !== searchForm.status &&
      searchUser.role === UserRole.CLIENT
    ) {
      throw new ErrorsApp(
        'Você não tem permissão para executar essa ação!',
        401,
      );
    }

    dataUpdate = data;

    // Deleta o campo de id do arquiteto
    delete dataUpdate.architectId;

    // Salva as atualizações no banco
    const formUpdate = await this.formsRepository.update(
      searchForm.id,
      dataUpdate,
    );

    searchForm = await this.formsRepository.findOne({
      where: { id: params.id },
      relations: { architect: true, client: true },
    });

    const updatedForm = { ...formUpdate, searchForm };

    return updatedForm.searchForm;
  }

  async remove(data: FindOneParamsDto) {
    const searchForm = await this.formsRepository.findOne({
      where: { id: data.id },
    });

    if (!searchForm) {
      throw new ErrorsApp('Formulário não encontrado!');
    }

    if (searchForm.archived === true) {
      return await this.formsRepository.delete({ id: data.id });
    }

    return await this.formsRepository.update(searchForm.id, { archived: true });
  }
}
