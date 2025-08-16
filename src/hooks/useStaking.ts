import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import {
  CUSTOM_DAI_ADDR,
  CUSTOM_DAI_ABI,
  ORK_TOKEN_ADDR,
  ORK_TOKEN_ABI,
  BANK_CONTRACT_ADDR,
  BANK_CONTRACT_ABI,
} from '../contracts/config';

export function useStaking(account: string | null, provider: ethers.providers.Web3Provider | null) {
  const [stakedAmount, setStakedAmount] = useState('0');
  const [rewardAmount, setRewardAmount] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalances = useCallback(async () => {
    if (!account || !provider) return;

    try {
      const bankContract = new ethers.Contract(BANK_CONTRACT_ADDR, BANK_CONTRACT_ABI, provider);
      const orkContract = new ethers.Contract(ORK_TOKEN_ADDR, ORK_TOKEN_ABI, provider);

      const [staked, rewards] = await Promise.all([
        bankContract.stackAmt(account),
        orkContract.balanceOf(account),
      ]);

      setStakedAmount(ethers.utils.formatEther(staked));
      setRewardAmount(ethers.utils.formatEther(rewards));
    } catch (error) {
      console.error('Error fetching balances:', error);
      toast.error('Failed to fetch balances');
    }
  }, [account, provider]);

  useEffect(() => {
    fetchBalances();
    const interval = setInterval(fetchBalances, 10000);
    return () => clearInterval(interval);
  }, [fetchBalances]);

  const stake = async (amount: string) => {
    if (!account || !provider) {
      toast.error('Please connect your wallet');
      return;
    }

    setIsLoading(true);
    try {
      const signer = provider.getSigner();
      const amountWei = ethers.utils.parseEther(amount);
      
      const daiContract = new ethers.Contract(CUSTOM_DAI_ADDR, CUSTOM_DAI_ABI, signer);
      const bankContract = new ethers.Contract(BANK_CONTRACT_ADDR, BANK_CONTRACT_ABI, signer);

      const approveTx = await daiContract.approve(BANK_CONTRACT_ADDR, amountWei);
      toast.loading('Approving tokens...');
      await approveTx.wait();
      
      const stakeTx = await bankContract.stack(amountWei, { gasLimit: 3000000 });
      toast.loading('Staking tokens...');
      await stakeTx.wait();
      
      toast.success('Successfully staked tokens');
      await fetchBalances();
    } catch (error) {
      console.error('Staking error:', error);
      toast.error('Failed to stake tokens');
    } finally {
      setIsLoading(false);
    }
  };

  const unstake = async () => {
    if (!account || !provider) {
      toast.error('Please connect your wallet');
      return;
    }

    setIsLoading(true);
    try {
      const signer = provider.getSigner();
      const bankContract = new ethers.Contract(BANK_CONTRACT_ADDR, BANK_CONTRACT_ABI, signer);
      
      const tx = await bankContract.unStack();
      toast.loading('Unstaking tokens...');
      await tx.wait();
      
      toast.success('Successfully unstaked tokens');
      await fetchBalances();
    } catch (error) {
      console.error('Unstaking error:', error);
      toast.error('Failed to unstake tokens');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stakedAmount,
    rewardAmount,
    isLoading,
    stake,
    unstake,
  };
}