import { Container, Typography } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyPayment } from "../utils/api_payment";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export default function PaymentVerify() {
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const nav = useNavigate();
  const billplz_id = searchParams.get("billplz[id]");
  const billplz_paid = searchParams.get("billplz[paid]");
  const billplz_paid_at = searchParams.get("billplz[paid_at]");
  const billplz_x_signature = searchParams.get("billplz[x_signature]");

  const verifyPaymentMutation = useMutation({
    mutationFn: verifyPayment,
    onSuccess: (updatedOrder) => {
      if (updatedOrder.status === "paid") {
        enqueueSnackbar("Payment is success", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Payment is failed", {
          variant: "error",
        });
      }
      nav("/orders");
    },
    onError: (e) => {
      enqueueSnackbar(e, {
        variant: "error",
      });
    },
  });

  useEffect(() => {
    verifyPaymentMutation.mutate({
      billplz_id: billplz_id,
      billplz_paid: billplz_paid,
      billplz_paid_at: billplz_paid_at,
      billplz_x_signature: billplz_x_signature,
    });
  }, []);
  return (
    <Container sx={{ textAlign: "center", py: 30 }}>
      <Typography variant="h5">Verifying your payment....</Typography>
    </Container>
  );
}
