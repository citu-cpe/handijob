/* tslint:disable */
/* eslint-disable */
/**
 * NestJS/NextJS Template
 * API for NestJS/NextJS Template
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RoomDTO } from './room-dto';
import { UserDTO } from './user-dto';

/**
 *
 * @export
 * @interface MessageDTO
 */
export interface MessageDTO {
  /**
   *
   * @type {string}
   * @memberof MessageDTO
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof MessageDTO
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof MessageDTO
   */
  updatedAt: string;
  /**
   *
   * @type {string}
   * @memberof MessageDTO
   */
  content: string;
  /**
   *
   * @type {UserDTO}
   * @memberof MessageDTO
   */
  sender: UserDTO;
  /**
   *
   * @type {boolean}
   * @memberof MessageDTO
   */
  self: boolean;
  /**
   *
   * @type {boolean}
   * @memberof MessageDTO
   */
  seen: boolean;
  /**
   *
   * @type {RoomDTO}
   * @memberof MessageDTO
   */
  room?: RoomDTO;
}