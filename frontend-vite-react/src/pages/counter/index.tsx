import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { RefreshCw, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { useContractSubscription } from "@/modules/midnight/voting-sdk/hooks/use-contract-subscription";
import { useOrganDonor } from "@/modules/midnight/organ-donor-sdk/hooks/useOrganDonor";

export const Counter = () => {
  const { deployedContractAPI, derivedState, onDeploy, providers } =
    useContractSubscription();
  const { registerDonor, proveCompatibility, deactivateDonor, joinContract } = useOrganDonor();
  const [deployedAddress, setDeployedAddress] = useState<string | undefined>(
    undefined
  );
  const [organContractAddress, setOrganContractAddress] = useState("");
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // if (derivedState?.round !== undefined) {
    //   setAppLoading(false);
    // }
    setAppLoading(false);
  }, []);

  const deployNew = async () => {
    const { address } = await onDeploy();
    setDeployedAddress(address);
  };

  const increment = async () => {
    if (deployedContractAPI) {
      await deployedContractAPI.increment();
    }
  };
  
  // Organ Donor Functions
  const handleJoinOrganContract = async () => {
    if (organContractAddress) {
        await joinContract(organContractAddress);
    }
  };

  const handleRegister = async () => {
      const bloodType = new TextEncoder().encode("O+").slice(0, 32);
      const organType = new TextEncoder().encode("kidney").slice(0, 32);
      const tissueMarkers = new TextEncoder().encode("marker1").slice(0, 32);
      
      // Pad with zeros to 32 bytes
      const pad = (arr: Uint8Array) => {
          const padded = new Uint8Array(32);
          padded.set(arr);
          return padded;
      };

      await registerDonor(pad(bloodType), pad(organType), pad(tissueMarkers));
      console.log("Donor Registered");
  };

  const handleProve = async () => {
      // Mock data for proof
       const bloodType = new TextEncoder().encode("O+").slice(0, 32);
      const organType = new TextEncoder().encode("kidney").slice(0, 32);
      const tissueMarkers = new TextEncoder().encode("marker1").slice(0, 32);

       const pad = (arr: Uint8Array) => {
          const padded = new Uint8Array(32);
          padded.set(arr);
          return padded;
      };
      
      const donorRecord = {
          bloodType: pad(bloodType),
          organType: pad(organType),
          tissueMarkers: pad(tissueMarkers),
          isActive: true
      };

      const result = await proveCompatibility(donorRecord, pad(bloodType), pad(organType), pad(tissueMarkers));
      console.log("Compatibility Proved:", result);
  };

  const handleDeactivate = async () => {
      // Mock record to deactivate - in real app would come from state/query
       const bloodType = new TextEncoder().encode("O+").slice(0, 32);
      const organType = new TextEncoder().encode("kidney").slice(0, 32);
      const tissueMarkers = new TextEncoder().encode("marker1").slice(0, 32);

      const pad = (arr: Uint8Array) => {
          const padded = new Uint8Array(32);
          padded.set(arr);
          return padded;
      };

       const donorRecord = {
          bloodType: pad(bloodType),
          organType: pad(organType),
          tissueMarkers: pad(tissueMarkers),
          isActive: true
      };

      await deactivateDonor(donorRecord);
      console.log("Donor Deactivated");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {appLoading && <Loading />}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-foreground mb-2">Counter Contract</h1>
            <p className="text-xl text-muted-foreground">Interact with the counter smart contract</p>
          </div>
          <div className="hidden md:block">
            <ModeToggle />
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusCircle className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Counter Contract</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              Deploy and interact with a simple counter smart contract
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Counter logic commented out as we are using Voting SDK subscription which has different state */}
                {/* <Button onClick={deployNew} className="gap-2">
                  <PlusCircle className="w-5 h-5" />
                  <span>Deploy New Contract</span>
                </Button> */}
              </div>

              {/* {deployedAddress && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Deployed Contract</p>
                  <p className="text-sm font-mono break-all">{deployedAddress}</p>
                </div>
              )} */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {/* <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Counter Value</p>
                    <p className="text-2xl font-bold">{derivedState?.round || '0'}</p>
                  </CardContent>
                </Card> */}
                {/* ... other counter cards ... */}
              </div>


              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Organ Donor Contract Integration</h3>
                 <div className="flex gap-2 justify-center mb-4">
                    <input 
                        type="text" 
                        placeholder="Organ Contract Address" 
                        className="border p-2 rounded"
                        value={organContractAddress}
                        onChange={(e) => setOrganContractAddress(e.target.value)}
                    />
                    <Button onClick={handleJoinOrganContract}>Join Organ Contract</Button>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button onClick={handleRegister} variant="outline">Register Donor</Button>
                    <Button onClick={handleProve} variant="outline">Prove Compatibility</Button>
                    <Button onClick={handleDeactivate} variant="destructive">Deactivate Donor</Button>
                </div>
              </div>

              {providers?.flowMessage && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{providers.flowMessage}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
