/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chain } from "./Chain";

/**
 * Current trusted paths to the root store. Only valid if the certificate has trusted paths.
 */
export type Chains = Array<Chain>;
