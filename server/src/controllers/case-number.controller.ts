import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {CaseNumber} from '../models';
import {CaseNumberRepository} from '../repositories';

export class CaseNumberController {
  constructor(
    @repository(CaseNumberRepository)
    public caseNumberRepository: CaseNumberRepository,
  ) {}

  @post('/case-numbers', {
    responses: {
      '200': {
        description: 'CaseNumber model instance',
        content: {'application/json': {schema: getModelSchemaRef(CaseNumber)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaseNumber, {
            title: 'NewCaseNumber',
            exclude: ['id'],
          }),
        },
      },
    })
    caseNumber: Omit<CaseNumber, 'id'>,
  ): Promise<CaseNumber> {
    return this.caseNumberRepository.create(caseNumber);
  }

  @get('/case-numbers/count', {
    responses: {
      '200': {
        description: 'CaseNumber model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CaseNumber) where?: Where<CaseNumber>,
  ): Promise<Count> {
    return this.caseNumberRepository.count(where);
  }

  @get('/case-numbers', {
    responses: {
      '200': {
        description: 'Array of CaseNumber model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CaseNumber, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CaseNumber) filter?: Filter<CaseNumber>,
  ): Promise<CaseNumber[]> {
    return this.caseNumberRepository.find(filter);
  }

  @patch('/case-numbers', {
    responses: {
      '200': {
        description: 'CaseNumber PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaseNumber, {partial: true}),
        },
      },
    })
    caseNumber: CaseNumber,
    @param.where(CaseNumber) where?: Where<CaseNumber>,
  ): Promise<Count> {
    return this.caseNumberRepository.updateAll(caseNumber, where);
  }

  @get('/case-numbers/{id}', {
    responses: {
      '200': {
        description: 'CaseNumber model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CaseNumber, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CaseNumber, {exclude: 'where'}) filter?: FilterExcludingWhere<CaseNumber>
  ): Promise<CaseNumber> {
    return this.caseNumberRepository.findById(id, filter);
  }

  @patch('/case-numbers/{id}', {
    responses: {
      '204': {
        description: 'CaseNumber PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaseNumber, {partial: true}),
        },
      },
    })
    caseNumber: CaseNumber,
  ): Promise<void> {
    await this.caseNumberRepository.updateById(id, caseNumber);
  }

  @put('/case-numbers/{id}', {
    responses: {
      '204': {
        description: 'CaseNumber PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() caseNumber: CaseNumber,
  ): Promise<void> {
    await this.caseNumberRepository.replaceById(id, caseNumber);
  }

  @del('/case-numbers/{id}', {
    responses: {
      '204': {
        description: 'CaseNumber DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.caseNumberRepository.deleteById(id);
  }
}
