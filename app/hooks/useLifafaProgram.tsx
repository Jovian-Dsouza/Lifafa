import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useMemo } from "react";
import * as anchor from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor";
import { Lifafa } from "../../lifafa-solana-contracts/target/types/lifafa";
import idl from "../../lifafa-solana-contracts/target/idl/lifafa.json";
import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { solanaTransaction } from "okto-sdk-react-native";
import { useWallet } from "../providers/WalletProvider";
import { useConnection } from "../providers/ConnectionProvider";

export const LIFAFA_PROGRAM_ID = "AXBZp473xo61tmpSryZfuZMGBs2c1q2MdVh2yW7GLS1z";
export const LIFAFA_SEED = "lifafa";

export function useLifafaProgram() {
  const { wallet, walletPublicKey, network, getWalletForSelectedCluster } =
    useWallet();
  const { connection, anchorProvider: provider } = useConnection();

  const lifafaProgramId = new PublicKey(LIFAFA_PROGRAM_ID);

  useEffect(() => {
    console.log("Wallet Public Key", walletPublicKey);
    console.log("Wallet network", network);
  }, [walletPublicKey]);

  const program = useMemo(() => {
    if (!provider) {
      return null;
    }
    return new Program<Lifafa>(idl as Lifafa, lifafaProgramId, provider);
  }, [lifafaProgramId, provider]);

  async function fetchLifafa(id: number) {
    if (!program) {
      throw new Error("Program not initialized");
    }
    if (!wallet) {
      throw new Error("Wallet not initialized");
    }
    try {
      const [lifafaPDA] = getLifafaPDA(id);
      const lifafaAccount = await program.account.lifafa.fetch(lifafaPDA);
      return lifafaAccount;
    } catch (error) {
      console.error("Error fetchLifafa:", error);
      return null;
    }
  }

  async function confirmHash(txHash: any) {
    console.log(`TRANSACTION CONFIRMED -> ${txHash}`);
    await connection.confirmTransaction(txHash);
  }

  async function estimateTransactionFee(
    transaction: Transaction
  ): Promise<number> {
    // Ensure the transaction has a recent blockhash set
    if (!transaction.recentBlockhash) {
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
    }

    // Create a message from the transaction to calculate the fee
    const message = transaction.compileMessage();

    // Get the fee for the message
    const feeCalculator = await connection.getFeeCalculatorForBlockhash(
      transaction.recentBlockhash
    );
    if (!feeCalculator.value) {
      throw new Error("Failed to get fee calculator");
    }

    const fee =
      feeCalculator.value.lamportsPerSignature *
      message.header.numRequiredSignatures;
    return fee;
  }

  function getLifafaPDA(lifafaId: any) {
    return anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from(LIFAFA_SEED), new BN(lifafaId).toArrayLike(Buffer, "le", 8)],
      lifafaProgramId
    );
  }

  async function getRawTxnAndFees(instruction) {
    const txn = new Transaction().add(instruction);
    txn.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    txn.feePayer = walletPublicKey;

    const fee = (await estimateTransactionFee(txn)) / LAMPORTS_PER_SOL;

    const rawTxn = solanaTransaction(
      txn,
      [walletPublicKey.toString()],
      network
    );
    return {
      rawTxn,
      fee,
    };
  }

  async function createLifafa(
    id: number,
    amount: number,
    timeLimit: number,
    maxClaims: number,
    ownerName: string,
    desc: string
  ) {
    console.log(`\nCreate Envelope, amount = ${amount}, id = ${id}`);
    if (!program) {
      throw new Error("Program not initialized");
    }
    if (!wallet) {
      throw new Error("Wallet not initialized");
    }
    const [lifafaPDA] = getLifafaPDA(id);
    const instruction = await program.methods
      .createSolLifafa(
        new anchor.BN(id),
        new anchor.BN(amount * LAMPORTS_PER_SOL),
        new anchor.BN(timeLimit),
        maxClaims,
        ownerName,
        desc
      )
      .accounts({
        lifafa: lifafaPDA,
        signer: walletPublicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    return await getRawTxnAndFees(instruction);
  }

  async function claimLifafa(id: any) {
    if (!program) {
      throw new Error("Program not initialized");
    }
    if (!wallet) {
      throw new Error("Wallet not initialized");
    }
    console.log("\nClaiming Envelope id: ", id);
    const [lifafaPDA] = getLifafaPDA(id);

    const instruction = await program.methods
      .claimSolLifafa(new anchor.BN(id))
      .accounts({
        lifafa: lifafaPDA,
        signer: walletPublicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    return await getRawTxnAndFees(instruction);
  }

  const value = useMemo(
    () => ({
      lifafaProgram: program,
      lifafaProgramId: lifafaProgramId,
      getLifafaPDA: getLifafaPDA,
      fetchLifafa: fetchLifafa,
      createLifafa: createLifafa,
      claimLifafa: claimLifafa,
    }),
    [program, lifafaProgramId]
  );

  return value;
}
