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

import { JobOpening } from './job-opening';
import { User } from './user';

/**
 *
 * @export
 * @interface Employer
 */
export interface Employer {
  /**
   *
   * @type {string}
   * @memberof Employer
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Employer
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof Employer
   */
  updatedAt: string;
  /**
   *
   * @type {User}
   * @memberof Employer
   */
  user: User;
  /**
   *
   * @type {Array<JobOpening>}
   * @memberof Employer
   */
  jobOpenings: Array<JobOpening>;
  /**
   *
   * @type {string}
   * @memberof Employer
   */
  companyName?: string;
  /**
   *
   * @type {string}
   * @memberof Employer
   */
  companyDescription?: string;
  /**
   *
   * @type {string}
   * @memberof Employer
   */
  companyLink?: string;
}
