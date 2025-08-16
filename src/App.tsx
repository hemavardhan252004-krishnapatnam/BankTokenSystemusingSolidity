import React, { useState } from 'react';
import { Wallet, Coins, ArrowDownUp } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useWallet } from './hooks/useWallet';
import { useStaking } from './hooks/useStaking';

function App() {
  const [amount, setAmount] = useState('');
  const { account, provider } = useWallet();
  const { stakedAmount, rewardAmount, isLoading, stake, unstake } = useStaking(account, provider);

  const handleStake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    stake(amount);
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-12 max-w-lg">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">ORK Bank</h1>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
              <Wallet className="h-5 w-5" />
              <span className="text-sm font-medium">
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
              </span>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-white/5 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Staked Amount</span>
                <Coins className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold">{stakedAmount} DAI</div>
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Earned Rewards</span>
                <ArrowDownUp className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold">{rewardAmount} ORK</div>
            </div>
          </div>

          <form onSubmit={handleStake} className="space-y-4">
            <div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter DAI amount"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="submit"
                disabled={isLoading || !amount}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white rounded-lg px-6 py-3 font-medium transition-colors"
              >
                Stake
              </button>
              <button
                type="button"
                onClick={unstake}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg px-6 py-3 font-medium transition-colors"
              >
                Unstake
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;