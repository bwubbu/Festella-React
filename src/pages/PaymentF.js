import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Toastify.css';
import Styles from "../components/Styles"; // Corrected path
import { Form, Field } from "react-final-form";
import Card from "../components/Card"; // Corrected path
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../components/cardUtils"; // Corrected path
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { useEvent } from "../components/EventContext";

axios.defaults.baseURL = "/api";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function PaymentF() { // Renamed function to PaymentF
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { currentEvent } = useEvent();

  useEffect(() => {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window["Stripe"].setPublishableKey(
          "pk_test_51P7fjDP790o5eEdoiLWnl3d148S6P1GVkIpIbLLgW1AvHSMr4mnTyAxdjAYRtDSzp8SsHe7TnoMKiWH41mQyttim00rU6bSvCT"
        );
      };
      window.document.body.appendChild(s);
    }
  }, []);

  const registerEvent = async () => {
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        registeredEvents: [...user.profile.registeredEvents, currentEvent],
        bookmarkedEvents: [...user.profile.bookmarkedEvents],
      },
    };

    try {
      await updateUser(updatedUser);
      toast.success("Event registered successfully");
    } catch (error) {
      console.error("Failed to update user", error);
      toast.error("Failed to register event");
    }
  }

  const onSubmit = async (values) => {
    await sleep(300);
    try {
      window.Stripe.card.createToken(
        {
          number: values.number,
          exp_month: values.expiry.split("/")[0],
          exp_year: values.expiry.split("/")[1],
          cvc: values.cvc,
          name: values.name,
        },
        (status, response) => {
          if (status === 200) {
            axios
              .post("http://localhost:5000/api/stripe-payment", {
                token: response,
                email: values.email,
                amount: values.amount,
              })
              .then((res) => {
                toast.success("Payment successful!", {
                  onClose: () => {
                    registerEvent();
                    navigate('/') // Redirect to Home.js on success
                  }
                });
              })
              .catch((err) => {
                toast.error("Payment failed!");
                console.log(err);
              });
          } else {
            toast.error(response.error.message);
            console.log(response.error.message);
          }
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };

  return (
    <Styles>
      <ToastContainer />
      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          active,
        }) => (
          <form onSubmit={handleSubmit}>
            <Card
              number={values.number || ""}
              name={values.name || ""}
              expiry={values.expiry || ""}
              cvc={values.cvc || ""}
              focused={active}
            />
            <div>
              <Field
                name="amount"
                component="input"
                type="number"
                placeholder="Amount"
              />
              <Field
                name="email"
                component="input"
                type="text"
                placeholder="Your email"
              />
            </div>
            <div>
              <Field
                name="number"
                component="input"
                type="text"
                pattern="[\d| ]{16,22}"
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
            </div>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <Field
                name="expiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Valid Thru"
                format={formatExpirationDate}
              />
              <Field
                name="cvc"
                component="input"
                type="text"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
              />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </form>
        )}
      />
    </Styles>
  );
}

export default PaymentF;

