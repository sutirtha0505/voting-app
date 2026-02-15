export function ledger(stateOrChargedState: any): {
    readonly totalDonors: bigint;
};
export class Contract {
    constructor(...args_0: any[]);
    witnesses: any;
    circuits: {
        registerDonor: (...args_1: any[]) => {
            result: {
                bloodType: any;
                organType: any;
                tissueMarkers: any;
                isActive: boolean;
            }[];
            context: any;
            proofData: {
                input: {
                    value: Uint8Array<ArrayBufferLike>[];
                    alignment: __compactRuntime.AlignmentSegment[];
                };
                output: undefined;
                publicTranscript: never[];
                privateTranscriptOutputs: never[];
            };
            gasCost: any;
        };
        proveCompatibility(context: any, ...args_1: any[]): {
            result: boolean[];
            context: any;
        };
        deactivateDonor: (...args_1: any[]) => {
            result: {
                bloodType: any;
                organType: any;
                tissueMarkers: any;
                isActive: boolean;
            }[];
            context: any;
            proofData: {
                input: {
                    value: Uint8Array<ArrayBufferLike>[];
                    alignment: __compactRuntime.AlignmentSegment[];
                };
                output: undefined;
                publicTranscript: never[];
                privateTranscriptOutputs: never[];
            };
            gasCost: any;
        };
    };
    impureCircuits: {
        registerDonor: (...args_1: any[]) => {
            result: {
                bloodType: any;
                organType: any;
                tissueMarkers: any;
                isActive: boolean;
            }[];
            context: any;
            proofData: {
                input: {
                    value: Uint8Array<ArrayBufferLike>[];
                    alignment: __compactRuntime.AlignmentSegment[];
                };
                output: undefined;
                publicTranscript: never[];
                privateTranscriptOutputs: never[];
            };
            gasCost: any;
        };
        deactivateDonor: (...args_1: any[]) => {
            result: {
                bloodType: any;
                organType: any;
                tissueMarkers: any;
                isActive: boolean;
            }[];
            context: any;
            proofData: {
                input: {
                    value: Uint8Array<ArrayBufferLike>[];
                    alignment: __compactRuntime.AlignmentSegment[];
                };
                output: undefined;
                publicTranscript: never[];
                privateTranscriptOutputs: never[];
            };
            gasCost: any;
        };
    };
    initialState(...args_0: any[]): {
        currentContractState: __compactRuntime.ContractState;
        currentPrivateState: any;
        currentZswapLocalState: __compactRuntime.EncodedZswapLocalState;
    };
    _registerDonor_0(context: any, partialProofData: any, bloodType_0: any, organType_0: any, tissueMarkers_0: any): {
        bloodType: any;
        organType: any;
        tissueMarkers: any;
        isActive: boolean;
    }[];
    _proveCompatibility_0(donorRecord_0: any, requiredBloodType_0: any, requiredOrgan_0: any, requiredMarkers_0: any): boolean[];
    _deactivateDonor_0(context: any, partialProofData: any, donorRecord_0: any): {
        bloodType: any;
        organType: any;
        tissueMarkers: any;
        isActive: boolean;
    }[];
    _equal_0(x0: any, y0: any): boolean;
    _equal_1(x0: any, y0: any): boolean;
    _equal_2(x0: any, y0: any): boolean;
}
export namespace pureCircuits {
    function proveCompatibility(...args_0: any[]): boolean[];
}
export namespace contractReferenceLocations {
    let tag: string;
    let indices: {};
}
import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
