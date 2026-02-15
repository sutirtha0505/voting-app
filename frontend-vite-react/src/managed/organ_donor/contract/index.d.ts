import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  registerDonor(context: __compactRuntime.CircuitContext<PS>,
                bloodType_0: Uint8Array,
                organType_0: Uint8Array,
                tissueMarkers_0: Uint8Array): __compactRuntime.CircuitResults<PS, [{ bloodType: Uint8Array,
                                                                                     organType: Uint8Array,
                                                                                     tissueMarkers: Uint8Array,
                                                                                     isActive: boolean
                                                                                   }]>;
  deactivateDonor(context: __compactRuntime.CircuitContext<PS>,
                  donorRecord_0: { bloodType: Uint8Array,
                                   organType: Uint8Array,
                                   tissueMarkers: Uint8Array,
                                   isActive: boolean
                                 }): __compactRuntime.CircuitResults<PS, [{ bloodType: Uint8Array,
                                                                            organType: Uint8Array,
                                                                            tissueMarkers: Uint8Array,
                                                                            isActive: boolean
                                                                          }]>;
}

export type PureCircuits = {
  proveCompatibility(donorRecord_0: { bloodType: Uint8Array,
                                      organType: Uint8Array,
                                      tissueMarkers: Uint8Array,
                                      isActive: boolean
                                    },
                     requiredBloodType_0: Uint8Array,
                     requiredOrgan_0: Uint8Array,
                     requiredMarkers_0: Uint8Array): [boolean];
}

export type Circuits<PS> = {
  registerDonor(context: __compactRuntime.CircuitContext<PS>,
                bloodType_0: Uint8Array,
                organType_0: Uint8Array,
                tissueMarkers_0: Uint8Array): __compactRuntime.CircuitResults<PS, [{ bloodType: Uint8Array,
                                                                                     organType: Uint8Array,
                                                                                     tissueMarkers: Uint8Array,
                                                                                     isActive: boolean
                                                                                   }]>;
  proveCompatibility(context: __compactRuntime.CircuitContext<PS>,
                     donorRecord_0: { bloodType: Uint8Array,
                                      organType: Uint8Array,
                                      tissueMarkers: Uint8Array,
                                      isActive: boolean
                                    },
                     requiredBloodType_0: Uint8Array,
                     requiredOrgan_0: Uint8Array,
                     requiredMarkers_0: Uint8Array): __compactRuntime.CircuitResults<PS, [boolean]>;
  deactivateDonor(context: __compactRuntime.CircuitContext<PS>,
                  donorRecord_0: { bloodType: Uint8Array,
                                   organType: Uint8Array,
                                   tissueMarkers: Uint8Array,
                                   isActive: boolean
                                 }): __compactRuntime.CircuitResults<PS, [{ bloodType: Uint8Array,
                                                                            organType: Uint8Array,
                                                                            tissueMarkers: Uint8Array,
                                                                            isActive: boolean
                                                                          }]>;
}

export type Ledger = {
  readonly totalDonors: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
