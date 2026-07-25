import { BillingForm, initBillingForm, getFormId } from "./BillingForm.js";
import {
    PaymentSection,
    initPaymentSection,
    validatePaymentMethod,
    setPlaceOrderState,
} from "./PaymentSection.js";

export function initCheckout({ formContainer, sidebarRoot, instanceId, onPlaceOrder }) {
    if (typeof onPlaceOrder !== "function") {
        console.error(
            "[checkoutController] initCheckout requires an onPlaceOrder(order) function — none was provided."
        );
        return;
    }

    const formId = getFormId(instanceId);
    const formElement = formContainer.id === formId
        ? formContainer
        : formContainer.querySelector(`#${CSS.escape(formId)}`);

    if (!formElement) {
        console.error(
            `[checkoutController] Could not find form "#${formId}" in formContainer. ` +
            `Make sure BillingForm({ instanceId }) was rendered with the same instanceId passed here.`
        );
        return;
    }

    initPaymentSection(sidebarRoot);

    initBillingForm(formElement, {
        onValidSubmit: async (billingData) => {
            const paymentMethod = validatePaymentMethod(sidebarRoot);

            if (!paymentMethod) {
                sidebarRoot
                    .querySelector('[id$="paymentMethod-error"]')
                    ?.scrollIntoView({ block: "center", behavior: "smooth" });
                return;
            }

            setPlaceOrderState(sidebarRoot, "processing");

            try {
                await onPlaceOrder({ billing: billingData, paymentMethod });
                setPlaceOrderState(sidebarRoot, "success");
            } catch (error) {
                console.error("[checkoutController] Order submission failed:", error);
                setPlaceOrderState(sidebarRoot, "idle");
            }
        },
    });
}

export { BillingForm, PaymentSection };