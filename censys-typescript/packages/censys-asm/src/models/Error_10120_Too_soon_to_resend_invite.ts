/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10120_Too_soon_to_resend_invite = {
    message: Error_10120_Too_soon_to_resend_invite.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10120_Too_soon_to_resend_invite.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10120_Too_soon_to_resend_invite {
    export enum message {
        TOO_SOON_TO_RESEND_INVITE = "Too soon to resend invite",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10120" = 10120,
    }
}
