import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {County} from '../models';
import {CountyRepository} from '../repositories';

export class CountyController {
  constructor(
    @repository(CountyRepository)
    public countyRepository : CountyRepository,
  ) {}

  @post('/counties', {
    responses: {
      '200': {
        description: 'County model instance',
        content: {'application/json': {schema: getModelSchemaRef(County)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(County, {
            title: 'NewCounty',
            exclude: ['id'],
          }),
        },
      },
    })
    county: Omit<County, 'id'>,
  ): Promise<County> {
    return this.countyRepository.create(county);
  }

  @get('/counties/count', {
    responses: {
      '200': {
        description: 'County model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(County) where?: Where<County>,
  ): Promise<Count> {
    return this.countyRepository.count(where);
  }

  @get('/counties', {
    responses: {
      '200': {
        description: 'Array of County model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(County, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(County) filter?: Filter<County>,
  ): Promise<County[]> {
    return this.countyRepository.find(filter);
  }

  @patch('/counties', {
    responses: {
      '200': {
        description: 'County PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(County, {partial: true}),
        },
      },
    })
    county: County,
    @param.where(County) where?: Where<County>,
  ): Promise<Count> {
    return this.countyRepository.updateAll(county, where);
  }

  @get('/counties/{id}', {
    responses: {
      '200': {
        description: 'County model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(County, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(County, {exclude: 'where'}) filter?: FilterExcludingWhere<County>
  ): Promise<County> {
    return this.countyRepository.findById(id, filter);
  }

  @patch('/counties/{id}', {
    responses: {
      '204': {
        description: 'County PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(County, {partial: true}),
        },
      },
    })
    county: County,
  ): Promise<void> {
    await this.countyRepository.updateById(id, county);
  }

  @put('/counties/{id}', {
    responses: {
      '204': {
        description: 'County PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() county: County,
  ): Promise<void> {
    await this.countyRepository.replaceById(id, county);
  }

  @del('/counties/{id}', {
    responses: {
      '204': {
        description: 'County DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.countyRepository.deleteById(id);
  }
}
