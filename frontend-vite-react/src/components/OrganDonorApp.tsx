
import React, { useContext, useState, useEffect } from "react";
import { OrganDonorContext } from "@/modules/midnight/organ-donor-sdk/contexts/BrowserOrganDonorProvider";
import { stringToBytes32, bytes32ToString } from "@/utils/conversion";
import { type DonorRecord } from "@/modules/midnight/organ-donor-sdk/api/common-types";

// Helper to format record
const formatRecord = (record: DonorRecord) => ({
  bloodType: bytes32ToString(record.bloodType),
  organType: bytes32ToString(record.organType),
  tissueMarkers: bytes32ToString(record.tissueMarkers),
  isActive: record.isActive ? "Active" : "Inactive"
});

export const OrganDonorApp = () => {
  const context = useContext(OrganDonorContext);
  const [contractAddress, setContractAddress] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [organType, setOrganType] = useState("");
  const [tissueMarkers, setTissueMarkers] = useState("");
  const [myRecord, setMyRecord] = useState<DonorRecord | null>(null);
  
  // Compatibility check inputs
  const [reqBlood, setReqBlood] = useState("");
  const [reqOrgan, setReqOrgan] = useState("");
  const [reqMarkers, setReqMarkers] = useState("");
  const [isCompatible, setIsCompatible] = useState<boolean | null>(null);

  useEffect(() => {
     // Auto-load contract address from deployment.json if possible, or manual input
     // For now, manual input or hardcoded if testing
     const loadDeployment = async () => {
         try {
             // In a real app we might fetch this
         } catch(e) {}
     };
     loadDeployment();
  }, []);

  if (!context) return <div>Loading Provider...</div>;

  const {
    connectWallet,
    isConnected,
    joinContract,
    registerDonor,
    proveCompatibility,
    contractState,
    loading,
    error,
  } = context;

  const handleJoin = async () => {
      if (contractAddress) {
          await joinContract(contractAddress);
      }
  };

  const handleRegister = async () => {
      try {
          const record = await registerDonor(
              stringToBytes32(bloodType),
              stringToBytes32(organType),
              stringToBytes32(tissueMarkers)
          );
          setMyRecord(record);
          alert("Registered successfully!");
      } catch (e: any) {
          alert("Registration failed: " + e.message);
      }
  };

  const handleCheck = async () => {
      if (!myRecord) {
          alert("No donor record found. Register first.");
          return;
      }
      try {
          const result = await proveCompatibility(
              myRecord,
              stringToBytes32(reqBlood),
              stringToBytes32(reqOrgan),
              stringToBytes32(reqMarkers)
          );
          setIsCompatible(result);
      } catch (e: any) {
          alert("Check failed: " + e.message);
      }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Private Organ Donor Registry</h1>
      
      {/* Wallet Connection */}
      <div className="border p-4 rounded bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl">1. Wallet Connection</h2>
            {context.unshieldedAddress && (
              <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {context.unshieldedAddress.slice(0, 6)}...{context.unshieldedAddress.slice(-6)}
              </span>
            )}
          </div>
          {!isConnected ? (
              <button 
                  onClick={connectWallet}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                  Connect Midnight Wallet
              </button>
          ) : (
              <div className="text-green-600 font-medium">✨ Wallet Connected</div>
          )}
          {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>

      {/* Contract Connection */}
      <div className="border p-4 rounded bg-gray-50">
          <h2 className="text-xl mb-4">2. Join Contract</h2>
          <div className="flex gap-4">
              <input
                  type="text"
                  placeholder="Contract Address"
                  value={contractAddress}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContractAddress(e.target.value)}
                  className="border p-2 grow rounded"
              />
              <button 
                  onClick={handleJoin}
                  disabled={!isConnected || loading}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                  {loading ? "Joining..." : "Join"}
              </button>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {contractState ? (
              <div className="mt-2 p-2 bg-blue-100 rounded">
                  <strong>Total Donors Registered:</strong> {contractState.totalDonors.toString()}
              </div>
          ) : (
              <div className="mt-2 p-2 bg-gray-100 rounded text-gray-500 italic">
                  Join a contract to see statistics
              </div>
          )}
      </div>

      {/* Registration */}
      <div className="border p-4 rounded bg-gray-50">
          <h2 className="text-xl mb-4">3. Register as Donor</h2>
          <div className="grid grid-cols-1 gap-4 max-w-md">
              <input
                  type="text"
                  placeholder="Blood Type (e.g. A+)"
                  value={bloodType}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBloodType(e.target.value)}
                  className="border p-2 rounded"
              />
              <input
                  type="text"
                  placeholder="Organ Type (e.g. Kidney)"
                  value={organType}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganType(e.target.value)}
                  className="border p-2 rounded"
              />
              <input
                  type="text"
                  placeholder="Tissue Markers (e.g. HLA-A)"
                  value={tissueMarkers}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTissueMarkers(e.target.value)}
                  className="border p-2 rounded"
              />
              <button 
                  onClick={handleRegister}
                  disabled={!isConnected || loading}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                  Register (Private)
              </button>
          </div>
          {myRecord && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <h3 className="font-bold">My Private Record (Held locally)</h3>
                  <pre className="text-sm mt-2">{JSON.stringify(formatRecord(myRecord), null, 2)}</pre>
              </div>
          )}
      </div>

      {/* Compatibility Check */}
      <div className="border p-4 rounded bg-gray-50">
          <h2 className="text-xl mb-4">4. Prove Compatibility (Zero Knowledge)</h2>
          <p className="mb-4 text-sm text-gray-600">Check if your private record matches these requirements without revealing your data.</p>
          <div className="grid grid-cols-1 gap-4 max-w-md">
              <input
                  type="text"
                  placeholder="Required Blood Type"
                  value={reqBlood}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReqBlood(e.target.value)}
                  className="border p-2 rounded"
              />
              <input
                  type="text"
                  placeholder="Required Organ Type"
                  value={reqOrgan}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReqOrgan(e.target.value)}
                  className="border p-2 rounded"
              />
              <input
                  type="text"
                  placeholder="Required Markers"
                  value={reqMarkers}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReqMarkers(e.target.value)}
                  className="border p-2 rounded"
              />
              <button 
                  onClick={handleCheck}
                  disabled={!isConnected || loading || !myRecord}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                  Verify Match
              </button>
          </div>
          {isCompatible !== null && (
              <div className={`mt-4 text-xl font-bold ${isCompatible ? 'text-green-600' : 'text-red-600'}`}>
                  {isCompatible ? "MATCH CONFIRMED" : "NO MATCH"}
              </div>
          )}
      </div>
    </div>
  );
};
