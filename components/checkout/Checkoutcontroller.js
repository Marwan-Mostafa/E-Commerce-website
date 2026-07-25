import {
    BillingForm,
    initBillingForm,
    getFormId,
} from "./BillingForm.js";

import {
    PaymentSection,
    initPaymentSection,
    validatePaymentMethod,
    setPlaceOrderState,
} from "./PaymentSection.js";

export function initCheckout({
    formContainer,
    sidebarRoot,
    instanceId,
    onPlaceOrder,
}) {

    if (!formContainer || !sidebarRoot) {
        console.error(
            "[checkoutController] Missing required checkout root elements."
        );
        return;
    }

    if (typeof onPlaceOrder !== "function") {
        console.error(
            "[checkoutController] initCheckout requires an onPlaceOrder(order) function."
        );
        return;
    }

    const formId = getFormId(instanceId);

    const formElement =
        formContainer.id === formId
            ? formContainer
            : formContainer.querySelector(
                `#${CSS.escape(formId)}`
            );

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

            const paymentMethod =
                validatePaymentMethod(sidebarRoot);

            if (!paymentMethod) {

                const paymentError =
                    sidebarRoot.querySelector(
                        '[id$="paymentMethod-error"]'
                    );

                paymentError?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });

                return;

            }

            setPlaceOrderState(
                sidebarRoot,
                "processing"
            );

            try {

                const order = {
                    billing: billingData,
                    paymentMethod,
                    formElement,
                };

                await onPlaceOrder(order);

                setPlaceOrderState(
                    sidebarRoot,
                    "success"
                );

            } catch (error) {

                console.error(
                    "[checkoutController] Order submission failed:",
                    error
                );

                // Allow the customer to retry submitting the order.
                setPlaceOrderState(
                    sidebarRoot,
                    "idle"
                );

            }

        },

    });

}

export {
    BillingForm,
    PaymentSection,
};