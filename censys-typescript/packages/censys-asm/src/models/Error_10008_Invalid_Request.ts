/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10008_Invalid_Request = {
    message: Error_10008_Invalid_Request.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10008_Invalid_Request.errorCode;
    /**
     * Additional error details
     */
    details:
        | {
              message: string;
              errors?: Array<{
                  keyword: string;
                  dataPath: string;
                  schemaPath: string;
                  params:
                      | {
                            ref: string;
                        }
                      | {
                            limit: number;
                        }
                      | {
                            additionalProperty: string;
                        }
                      | {
                            property: string;
                            missingProperty: string;
                            depsCount: number;
                            deps: string;
                        }
                      | {
                            format: string;
                        }
                      | {
                            comparison: string;
                            limit: string | number;
                            exclusive: boolean;
                        }
                      | {
                            multipleOf: number;
                        }
                      | {
                            pattern: string;
                        }
                      | {
                            missingProperty: string;
                        }
                      | {
                            type: string;
                        }
                      | {
                            i: number;
                            j: number;
                        }
                      | {
                            keyword: string;
                        }
                      | {
                            missingPattern: string;
                        }
                      | {
                            propertyName: string;
                        }
                      | {
                            failingKeyword: string;
                        }
                      | {
                            caseIndex: number;
                        }
                      | {
                            allowedValues: Array<any>;
                        };
                  propertyName?: string;
                  message?: string;
                  schema?: any;
                  parentSchema?: any;
                  data?: any;
              }>;
          }
        | string;
};

export namespace Error_10008_Invalid_Request {
    export enum message {
        INVALID_REQUEST = "Invalid Request",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10008" = 10008,
    }
}
