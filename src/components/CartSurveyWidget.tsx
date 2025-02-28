
import SurveyForm from "./SurveyForm";

interface CartSurveyWidgetProps {
  // In a real Shopify app, this would receive cart data and other context
  storeId?: string;
  cartValue?: number;
}

const CartSurveyWidget = ({ storeId, cartValue }: CartSurveyWidgetProps) => {
  return (
    <div className="cart-survey-widget max-w-md mx-auto mb-8 mt-8">
      <SurveyForm />
    </div>
  );
};

export default CartSurveyWidget;
