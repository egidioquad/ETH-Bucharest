import React, { useState } from "react";
import { Box, Button, Calendar, DateInput, FileInput, Meter } from "grommet";
import { useAccount } from "wagmi";
import { InputBase, IntegerInput } from "~~/components/scaffold-eth";
import { greenfieldTransfer } from "~~/hooks/greendieldTransfer";

interface DonateFormProps {
  recipient: string;
}

const DonateForm: React.FC<DonateFormProps> = ({ recipient }) => {
  const [totalAmount, setTotalAmount] = useState("");
  const [error, setError] = useState("");
  const { address } = useAccount();
  const handleSubmit = () => {
    if (!totalAmount || !address) {
      setError("Please enter an amount.");
      return;
    }
    const numericTotalAmount = Number(totalAmount);
    if (!numericTotalAmount) {
      setError("Invalid total amount. Please enter a number.");
      return;
    }

    greenfieldTransfer(recipient, totalAmount, address);
  };

  return (
    <Box gap="small" border={{ size: "small", color: "#4ade80" }} round="medium" pad="medium">
      <Box>
        <h1>Pay Project</h1>
        <InputBase name="totalAmount" value={totalAmount} onChange={value => setTotalAmount(value)} />
        {error && <p className="text-red-600">{error}</p>}
      </Box>
      <Button
        color="#4ade80"
        size="medium"
        //primary
        pad={{ horizontal: "xsmall", vertical: "small" }}
        label="Donate"
        onClick={handleSubmit}
      />
    </Box>
  );
};

export default DonateForm;
