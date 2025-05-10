import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openPaymentModal = () => {
    setIsModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsModalOpen(false);
  };

  const processDummyPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      closePaymentModal();
      toast.success("Dummy Payment Successful! Payment ID: DUMMY12345");
    }, 2000); // Simulate payment processing delay
  };

  return (
    <div>
      <Button onClick={openPaymentModal}>Purchase Course</Button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Complete Payment</h2>
            <p className="text-sm mb-4">
              You are about to pay <strong>₹100</strong> for Dummy Course.
            </p>
            <div className="flex justify-between">
              <Button onClick={closePaymentModal} variant="outline">
                Cancel
              </Button>
              <Button onClick={processDummyPayment} disabled={isLoading}>
                {isLoading ? "Processing..." : "Pay ₹100"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyCourseButton;
