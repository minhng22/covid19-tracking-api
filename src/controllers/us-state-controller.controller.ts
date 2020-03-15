import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {get, getModelSchemaRef, param, patch, put, requestBody} from '@loopback/rest';
import {UsStates} from '../models';
import {UsStatesRepository} from '../repositories';

export class UsStateControllerController {
  constructor(
    @repository(UsStatesRepository)
    public usStatesRepository: UsStatesRepository,
  ) {}

  @get('/us-states/count', {
    responses: {
      '200': {
        description: 'UsStates model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UsStates) where?: Where<UsStates>,
  ): Promise<Count> {
    return this.usStatesRepository.count(where);
  }

  @get('/us-states', {
    responses: {
      '200': {
        description: 'Array of UsStates model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UsStates, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UsStates) filter?: Filter<UsStates>,
  ): Promise<UsStates[]> {
    return this.usStatesRepository.find(filter);
  }

  @patch('/us-states', {
    responses: {
      '200': {
        description: 'UsStates PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsStates, {partial: true}),
        },
      },
    })
    usStates: UsStates,
    @param.where(UsStates) where?: Where<UsStates>,
  ): Promise<Count> {
    return this.usStatesRepository.updateAll(usStates, where);
  }

  @get('/us-states/{id}', {
    responses: {
      '200': {
        description: 'USStates model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UsStates, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UsStates, {exclude: 'where'}) filter?: FilterExcludingWhere<UsStates>
  ): Promise<UsStates> {
    return this.usStatesRepository.findById(id, filter);
  }

  @put('/us-states/{id}', {
    responses: {
      '204': {
        description: 'USStates PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() states: UsStates,
  ): Promise<void> {
    await this.usStatesRepository.replaceById(id, states);
  }
}
