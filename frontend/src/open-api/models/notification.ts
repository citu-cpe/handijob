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

import { User } from './user';

/**
 *
 * @export
 * @interface Notification
 */
export interface Notification {
  /**
   *
   * @type {string}
   * @memberof Notification
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Notification
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof Notification
   */
  updatedAt: string;
  /**
   *
   * @type {User}
   * @memberof Notification
   */
  user: User;
  /**
   *
   * @type {string}
   * @memberof Notification
   */
  content: string;
  /**
   *
   * @type {boolean}
   * @memberof Notification
   */
  seen: boolean;
}
