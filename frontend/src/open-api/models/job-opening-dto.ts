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

import { JobApplicationDTO } from './job-application-dto';

/**
 *
 * @export
 * @interface JobOpeningDTO
 */
export interface JobOpeningDTO {
  /**
   *
   * @type {string}
   * @memberof JobOpeningDTO
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof JobOpeningDTO
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof JobOpeningDTO
   */
  updatedAt: string;
  /**
   *
   * @type {string}
   * @memberof JobOpeningDTO
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof JobOpeningDTO
   */
  description: string;
  /**
   *
   * @type {boolean}
   * @memberof JobOpeningDTO
   */
  archived: boolean;
  /**
   *
   * @type {string}
   * @memberof JobOpeningDTO
   */
  imageUrl?: string;
  /**
   *
   * @type {string}
   * @memberof JobOpeningDTO
   */
  cloudinaryPublicId?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof JobOpeningDTO
   */
  categories: Array<JobOpeningDTOCategoriesEnum>;
  /**
   *
   * @type {string}
   * @memberof JobOpeningDTO
   */
  employerId: string;
  /**
   *
   * @type {Array<JobApplicationDTO>}
   * @memberof JobOpeningDTO
   */
  jobApplications: Array<JobApplicationDTO>;
}

/**
 * @export
 * @enum {string}
 */
export enum JobOpeningDTOCategoriesEnum {
  It = 'IT',
  Art = 'Art',
  ConstructionWorker = 'Construction Worker',
  Foreman = 'Foreman',
  Plumber = 'Plumber',
  Carpenter = 'Carpenter',
  Electrician = 'Electrician',
  Welder = 'Welder',
  AirconRepair = 'Aircon Repair',
  GadgetRepair = 'Gadget Repair',
}
