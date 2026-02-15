import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.14.0');

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_1 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_2 = __compactRuntime.CompactTypeBoolean;

class _DonorRecord_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment())));
  }
  fromValue(value_0) {
    return {
      bloodType: _descriptor_1.fromValue(value_0),
      organType: _descriptor_1.fromValue(value_0),
      tissueMarkers: _descriptor_1.fromValue(value_0),
      isActive: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bloodType).concat(_descriptor_1.toValue(value_0.organType).concat(_descriptor_1.toValue(value_0.tissueMarkers).concat(_descriptor_2.toValue(value_0.isActive))));
  }
}

const _descriptor_3 = new _DonorRecord_0();

class _tuple_0 {
  alignment() {
    return _descriptor_3.alignment();
  }
  fromValue(value_0) {
    return [
      _descriptor_3.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0[0]);
  }
}

const _descriptor_4 = new _tuple_0();

class _tuple_1 {
  alignment() {
    return _descriptor_2.alignment();
  }
  fromValue(value_0) {
    return [
      _descriptor_2.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0[0]);
  }
}

const _descriptor_5 = new _tuple_1();

const _descriptor_6 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_1.fromValue(value_0),
      right: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_1.toValue(value_0.left).concat(_descriptor_1.toValue(value_0.right)));
  }
}

const _descriptor_7 = new _Either_0();

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bytes);
  }
}

const _descriptor_9 = new _ContractAddress_0();

const _descriptor_10 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      registerDonor: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`registerDonor: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const bloodType_0 = args_1[1];
        const organType_0 = args_1[2];
        const tissueMarkers_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('registerDonor',
                                     'argument 1 (as invoked from Typescript)',
                                     'counter.compact line 34 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(bloodType_0.buffer instanceof ArrayBuffer && bloodType_0.BYTES_PER_ELEMENT === 1 && bloodType_0.length === 32)) {
          __compactRuntime.typeError('registerDonor',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'counter.compact line 34 char 1',
                                     'Bytes<32>',
                                     bloodType_0)
        }
        if (!(organType_0.buffer instanceof ArrayBuffer && organType_0.BYTES_PER_ELEMENT === 1 && organType_0.length === 32)) {
          __compactRuntime.typeError('registerDonor',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'counter.compact line 34 char 1',
                                     'Bytes<32>',
                                     organType_0)
        }
        if (!(tissueMarkers_0.buffer instanceof ArrayBuffer && tissueMarkers_0.BYTES_PER_ELEMENT === 1 && tissueMarkers_0.length === 32)) {
          __compactRuntime.typeError('registerDonor',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'counter.compact line 34 char 1',
                                     'Bytes<32>',
                                     tissueMarkers_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(bloodType_0).concat(_descriptor_1.toValue(organType_0).concat(_descriptor_1.toValue(tissueMarkers_0))),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerDonor_0(context,
                                               partialProofData,
                                               bloodType_0,
                                               organType_0,
                                               tissueMarkers_0);
        partialProofData.output = { value: _descriptor_4.toValue(result_0), alignment: _descriptor_4.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      proveCompatibility(context, ...args_1) {
        return { result: pureCircuits.proveCompatibility(...args_1), context };
      },
      deactivateDonor: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`deactivateDonor: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const donorRecord_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('deactivateDonor',
                                     'argument 1 (as invoked from Typescript)',
                                     'counter.compact line 86 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(donorRecord_0) === 'object' && donorRecord_0.bloodType.buffer instanceof ArrayBuffer && donorRecord_0.bloodType.BYTES_PER_ELEMENT === 1 && donorRecord_0.bloodType.length === 32 && donorRecord_0.organType.buffer instanceof ArrayBuffer && donorRecord_0.organType.BYTES_PER_ELEMENT === 1 && donorRecord_0.organType.length === 32 && donorRecord_0.tissueMarkers.buffer instanceof ArrayBuffer && donorRecord_0.tissueMarkers.BYTES_PER_ELEMENT === 1 && donorRecord_0.tissueMarkers.length === 32 && typeof(donorRecord_0.isActive) === 'boolean')) {
          __compactRuntime.typeError('deactivateDonor',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'counter.compact line 86 char 1',
                                     'struct DonorRecord<bloodType: Bytes<32>, organType: Bytes<32>, tissueMarkers: Bytes<32>, isActive: Boolean>',
                                     donorRecord_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(donorRecord_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._deactivateDonor_0(context,
                                                 partialProofData,
                                                 donorRecord_0);
        partialProofData.output = { value: _descriptor_4.toValue(result_0), alignment: _descriptor_4.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      registerDonor: this.circuits.registerDonor,
      deactivateDonor: this.circuits.deactivateDonor
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('registerDonor', new __compactRuntime.ContractOperation());
    state_0.setOperation('deactivateDonor', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(0n),
                                                                                              alignment: _descriptor_10.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _registerDonor_0(context,
                   partialProofData,
                   bloodType_0,
                   organType_0,
                   tissueMarkers_0)
  {
    const record_0 = { bloodType: bloodType_0,
                       organType: organType_0,
                       tissueMarkers: tissueMarkers_0,
                       isActive: true };
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_10.toValue(0n),
                                                                  alignment: _descriptor_10.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_0.toValue(tmp_0),
                                                                alignment: _descriptor_0.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    return [record_0];
  }
  _proveCompatibility_0(donorRecord_0,
                        requiredBloodType_0,
                        requiredOrgan_0,
                        requiredMarkers_0)
  {
    __compactRuntime.assert(donorRecord_0.isActive,
                            'Donor registration is not active');
    const bloodMatch_0 = this._equal_0(donorRecord_0.bloodType,
                                       requiredBloodType_0);
    const organMatch_0 = this._equal_1(donorRecord_0.organType, requiredOrgan_0);
    const tissueMatch_0 = this._equal_2(donorRecord_0.tissueMarkers,
                                        requiredMarkers_0);
    const isCompatible_0 = bloodMatch_0 && organMatch_0 && tissueMatch_0;
    return [isCompatible_0];
  }
  _deactivateDonor_0(context, partialProofData, donorRecord_0) {
    const updatedRecord_0 = { bloodType: donorRecord_0.bloodType,
                              organType: donorRecord_0.organType,
                              tissueMarkers: donorRecord_0.tissueMarkers,
                              isActive: false };
    const tmp_0 = (__compactRuntime.assert(0n >= 1n,
                                           'result of subtraction would be negative'),
                   0n - 1n);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_10.toValue(0n),
                                                                  alignment: _descriptor_10.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_0.toValue(tmp_0),
                                                                alignment: _descriptor_0.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    return [updatedRecord_0];
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get totalDonors() {
      return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_10.toValue(0n),
                                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
export const pureCircuits = {
  proveCompatibility: (...args_0) => {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`proveCompatibility: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const donorRecord_0 = args_0[0];
    const requiredBloodType_0 = args_0[1];
    const requiredOrgan_0 = args_0[2];
    const requiredMarkers_0 = args_0[3];
    if (!(typeof(donorRecord_0) === 'object' && donorRecord_0.bloodType.buffer instanceof ArrayBuffer && donorRecord_0.bloodType.BYTES_PER_ELEMENT === 1 && donorRecord_0.bloodType.length === 32 && donorRecord_0.organType.buffer instanceof ArrayBuffer && donorRecord_0.organType.BYTES_PER_ELEMENT === 1 && donorRecord_0.organType.length === 32 && donorRecord_0.tissueMarkers.buffer instanceof ArrayBuffer && donorRecord_0.tissueMarkers.BYTES_PER_ELEMENT === 1 && donorRecord_0.tissueMarkers.length === 32 && typeof(donorRecord_0.isActive) === 'boolean')) {
      __compactRuntime.typeError('proveCompatibility',
                                 'argument 1',
                                 'counter.compact line 58 char 1',
                                 'struct DonorRecord<bloodType: Bytes<32>, organType: Bytes<32>, tissueMarkers: Bytes<32>, isActive: Boolean>',
                                 donorRecord_0)
    }
    if (!(requiredBloodType_0.buffer instanceof ArrayBuffer && requiredBloodType_0.BYTES_PER_ELEMENT === 1 && requiredBloodType_0.length === 32)) {
      __compactRuntime.typeError('proveCompatibility',
                                 'argument 2',
                                 'counter.compact line 58 char 1',
                                 'Bytes<32>',
                                 requiredBloodType_0)
    }
    if (!(requiredOrgan_0.buffer instanceof ArrayBuffer && requiredOrgan_0.BYTES_PER_ELEMENT === 1 && requiredOrgan_0.length === 32)) {
      __compactRuntime.typeError('proveCompatibility',
                                 'argument 3',
                                 'counter.compact line 58 char 1',
                                 'Bytes<32>',
                                 requiredOrgan_0)
    }
    if (!(requiredMarkers_0.buffer instanceof ArrayBuffer && requiredMarkers_0.BYTES_PER_ELEMENT === 1 && requiredMarkers_0.length === 32)) {
      __compactRuntime.typeError('proveCompatibility',
                                 'argument 4',
                                 'counter.compact line 58 char 1',
                                 'Bytes<32>',
                                 requiredMarkers_0)
    }
    return _dummyContract._proveCompatibility_0(donorRecord_0,
                                                requiredBloodType_0,
                                                requiredOrgan_0,
                                                requiredMarkers_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
