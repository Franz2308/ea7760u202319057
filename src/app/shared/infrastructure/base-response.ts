/**
 * Marker interface for HTTP response envelopes returned by API endpoints.
 *
 * @author Frank Huingo - u202319057
 */
export interface BaseResponse {}

/**
 * Base contract for API resources that expose an identifier.
 */
export interface BaseResource {
  id?: any;
}
