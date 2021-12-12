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

import { Category } from './category';
import { Employer } from './employer';
import { JobApplication } from './job-application';

/**
 *
 * @export
 * @interface JobOpening
 */
export interface JobOpening {
  /**
   *
   * @type {string}
   * @memberof JobOpening
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof JobOpening
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof JobOpening
   */
  updatedAt: string;
  /**
   *
   * @type {Employer}
   * @memberof JobOpening
   */
  employer: Employer;
  /**
   *
   * @type {Array<Category>}
   * @memberof JobOpening
   */
  categories: Array<Category>;
  /**
   *
   * @type {Array<JobApplication>}
   * @memberof JobOpening
   */
  jobApplications: Array<JobApplication>;
  /**
   *
   * @type {string}
   * @memberof JobOpening
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof JobOpening
   */
  description: string;
  /**
   *
   * @type {boolean}
   * @memberof JobOpening
   */
  archived: boolean;
  /**
   *
   * @type {string}
   * @memberof JobOpening
   */
  imageUrl?: string;
  /**
   *
   * @type {string}
   * @memberof JobOpening
   */
  cloudinaryPublicId?: string;
}