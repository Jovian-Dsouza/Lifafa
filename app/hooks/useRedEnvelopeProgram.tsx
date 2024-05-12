import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { useMemo } from "react";
import * as anchor from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor";
import { RedEnvelope } from "../../lifafa-solana-contracts/target/types/red_envelope";
import idl from "../../lifafa-solana-contracts/target/idl/red_envelope.json";
import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";

export function useRedEnvelopeProgram(
  connection: Connection
) {
  const oktoWalletPublicKey = new PublicKey(
    "58chdRkNN8RN72jSyUGnwcN8nhUVrHcZrHEGpcYF6Jsz"
  );
  const redEnvelopeProgramId = new PublicKey(
    "58chdRkNN8RN72jSyUGnwcN8nhUVrHcZrHEGpcYF6Jsz"
  );

  const provider = useMemo(() => {
    return new AnchorProvider(connection, null, {
      // preflightCommitment: "confirmed",
      commitment: "confirmed",
    });
  }, [connection]);

  const program = useMemo(() => {
    if (!provider) {
      return null;
    }
    return new Program<RedEnvelope>(
      idl as RedEnvelope,
      redEnvelopeProgramId,
      provider
    );
  }, [redEnvelopeProgramId, provider]);

  async function fetchLifafa(id: number) {
    if (!program) {
      console.error("Program not initialized");
      return;
    }
    try {
      const [lifafaPDA] = getLifafaPDA(id);
      const lifafaAccount = await program.account.envelope.fetch(lifafaPDA);
      console.log("LifafaAccount ", lifafaAccount);
    } catch (error) {
      console.error("Error fetchLifafa:", error);
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
      [
        Buffer.from("envelopeVault"),
        new BN(lifafaId).toArrayLike(Buffer, "le", 8),
      ],
      redEnvelopeProgramId
    );
  }

  async function createLifafa(
    id: number,
    amount: number,
    timeLimit: number,
    maxClaims: number,
    ownerName: string
  ) {
    if (!program) {
      console.error("Program not initialized");
      return;
    }
    const [lifafaPDA] = getLifafaPDA(id);
    console.log(`\nCreate Envelope, amount = ${amount}, id = ${id}`);
    try {
      const instruction = await program.methods
        .createEnvelope(
          new anchor.BN(id),
          new anchor.BN(amount * LAMPORTS_PER_SOL),
          new anchor.BN(timeLimit),
          maxClaims,
          ownerName
        )
        .accounts({
          envelope: lifafaPDA,
          signer: oktoWalletPublicKey,
          systemProgram: SystemProgram.programId,
        })
        .instruction();
      const txn = new Transaction().add(instruction);
      const blockhash = await connection.getLatestBlockhash();
      txn.recentBlockhash = blockhash.blockhash;
      txn.feePayer = oktoWalletPublicKey;
      console.log("Transaction", txn);

      const fee = await estimateTransactionFee(txn);
      console.log("fee: ", fee / LAMPORTS_PER_SOL);

      // const signedTxn = await anchorWallet?.signTransaction(txn);
      // const serialized = signedTxn?.serialize();
      // if (serialized) {
      //   const txnHash = await connection.sendRawTransaction(serialized);
      //   await confirmHash(txnHash);
      // }
    } catch (error) {
      console.error("Error creating lifafa: ", error);
    }
  }

  async function claimLifafa(id: any) {
    if (!program) {
      console.error("Program not initialized");
      return;
    }
    console.log("\nClaiming Envelope id: ", id);
    const [lifafaPDA] = getLifafaPDA(id);
    try {
      const instruction = await program.methods
        .claim(new anchor.BN(id))
        .accounts({
          envelope: lifafaPDA,
          signer: oktoWalletPublicKey,
          systemProgram: SystemProgram.programId,
        })
        .instruction();
      const txn = new Transaction().add(instruction);
      const blockhash = await connection.getLatestBlockhash();
      txn.recentBlockhash = blockhash.blockhash;
      txn.feePayer = oktoWalletPublicKey;

      // const signedTxn = await anchorWallet?.signTransaction(txn);
      // const serialized = signedTxn?.serialize();
      // if (serialized) {
      //   const txnHash = await connection.sendRawTransaction(serialized);
      //   await confirmHash(txnHash);
      // }
    } catch (error) {
      console.error("Error claiming lifafa: ", error);
    }
  }

  const value = useMemo(
    () => ({
      redEnvelopeProgram: program,
      redEnvelopeProgramId: redEnvelopeProgramId,
      getLifafaPDA: getLifafaPDA,
      fetchLifafa: fetchLifafa,
      createLifafa: createLifafa,
      // claimLifafa: claimLifafa,
    }),
    [program, redEnvelopeProgramId]
  );

  return value;
}
