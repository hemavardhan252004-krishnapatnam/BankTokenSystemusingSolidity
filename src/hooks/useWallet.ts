import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
          setProvider(provider);
        } catch (error) {
          toast.error('Failed to connect to MetaMask');
          console.error(error);
        }
      } else {
        toast.error('Please install MetaMask');
      }
    };

    init();

    window.ethereum?.on('accountsChanged', (accounts: string[]) => {
      setAccount(accounts[0] || null);
    });

    return () => {
      window.ethereum?.removeAllListeners();
    };
  }, []);

  return { account, provider };
}