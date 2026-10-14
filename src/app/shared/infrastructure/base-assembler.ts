import { BaseResource, BaseResponse } from './base-response';
import { BaseEntity } from './base-entity';

/**
 * Defines conversions between domain entities and API representations.
 *
 * @typeParam TEntity - Domain entity type.
 * @typeParam TResource - Resource type exchanged with endpoint operations.
 * @typeParam TResponse - Response envelope type returned by collection queries.
 *
 * @author Frank Huingo - u202319057
 */
export interface BaseAssembler<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse
> {
  /**
   * Converts a resource to an entity.
   */
  toEntityFromResource(resource: TResource): TEntity;

  /**
   * Converts an entity to a resource.
   */
  toResourceFromEntity(entity: TEntity): TResource;

  /**
   * Converts a response envelope into a collection of domain entities.
   */
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
