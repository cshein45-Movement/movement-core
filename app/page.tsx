export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">Movement Core</h1>
        <p className="text-xl mb-8">
          A modular civilization layer for blockchain infrastructure
        </p>
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">Identity</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Verifiable identity layer connecting wallets, ENS, and attestations
            </p>
          </div>
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">Reputation</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Trust and proof layer for contribution history and legitimacy
            </p>
          </div>
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">Governance</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              DAO coordination layer for proposals, voting, and execution
            </p>
          </div>
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">Treasury</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Transparent capital layer for multisig custody and allocations
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
