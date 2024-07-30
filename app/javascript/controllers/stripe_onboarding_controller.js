import { Controller } from "@hotwired/stimulus"
import {loadConnectAndInitialize} from '@stripe/connect-js';
import { post } from "@rails/request.js"

// Connects to data-controller="stripe-onboarding"
export default class extends Controller {
  static values = { url: String }

  connect() {
    const fetchClientSecret = async () => {
      // Fetch the AccountSession client secret
      const response = await post(this.urlValue);
      if (!response.ok) {
        // Handle errors on the client side here
        const {error} = await response.json;
        console.error('An error occurred: ', error);
        return undefined;
      } else {
        const {client_secret: clientSecret} = await response.json;
        return clientSecret;
      }
    }

    const stripeConnectInstance = loadConnectAndInitialize({
      // This is your test publishable API key.
      publishableKey: document.head.querySelector("meta[name='stripe-pk']").content,
      fetchClientSecret: fetchClientSecret,
    });

    const accountOnboarding = stripeConnectInstance.create('account-onboarding');
    accountOnboarding.setOnExit(() => {
      console.log('User exited the onboarding flow');
    });

    this.element.appendChild(accountOnboarding);

  }
}
