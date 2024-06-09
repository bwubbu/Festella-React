import styled, { css } from "styled-components";

const btn = (light, dark) => css`
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 10px 20px;  // Increased padding for bigger buttons
  font-size: 20px;    // Increased font size for bigger buttons
  color: white;
  &:visited {
    color: white;
  }
  background-image: linear-gradient(45deg, ${light}, ${dark});
  border: 1px solid ${dark};
  &:hover {
    background-image: linear-gradient(45deg, ${light}, ${dark});
    &[disabled] {
      background-image: linear-gradient(45deg, ${light}, ${dark});
    }
  }
  &:visited {
    color: black;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const btnDefault = css`
  ${btn("#ffffff", "#d5d5d5")} color: #555;
`;

const btnPrimary = btn("#4f93ce", "#285f8f");
const btnDanger = btn("#e27c79", "#c9302c");

const Styles = styled.div`
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;

  form {
    text-align: left;
    max-width: 600px;  // Increased max-width for form
    width: 100%;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 30px;  // Increased padding for form
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 5px;  // Slightly increased border-radius for form
    background-color: white;
    font-size: 18px;  // Increased font size for form

    & > div {
      display: flex;
      flex-flow: row nowrap;
      line-height: 2.5em;  // Increased line-height for better spacing
      position: relative;
      padding: 10px 0;  // Increased padding for form rows
      border: 1px solid transparent;

      &.active {
        background-color: paleturquoise;
        border-color: turquoise;
      }

      & > label {
        color: #333;
        width: 130px;  // Increased width for labels
        min-width: 70px;  // Increased min-width for labels
        font-size: 1.2em;  // Increased font size for labels
        line-height: 2.5em;  // Increased line-height for labels
      }

      & > input,
      & > .downshift > input,
      & > select,
      & > textarea {
        flex: 1;
        padding: 10px;  // Increased padding for inputs
        font-size: 1.2em;  // Increased font size for inputs
        margin-left: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;  // Slightly increased border-radius for inputs
        &[disabled] {
          background: #eee;
        }
      }

      & > input[type="checkbox"] {
        margin-top: 7px;
      }

      & > div {
        margin-left: 16px;

        & > label {
          margin-left: 0;
          display: block;

          & > input {
            margin-right: 3px;
          }
        }

        &.downshift {
          margin-left: 0;
          padding-left: 15px;
          flex: 1;

          & > input {
            width: 100%;
            padding: 10px;  // Increased padding for inputs in downshift
            font-size: 1.2em;  // Increased font size for inputs in downshift
            margin-left: 0;
            border: 1px solid #ccc;
            border-radius: 5px;  // Slightly increased border-radius for inputs in downshift
          }
        }
      }

      & > span {
        line-height: 32px;
        margin-left: 10px;
        color: #800;
        font-weight: bold;
      }

      & > button.remove {
        ${btnDanger};
      }
    }

    & > .buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-top: 20px;  // Increased margin-top for buttons
    }

    .error {
      display: flex;
      font-weight: bold;
      color: #800;
      flex-flow: row nowrap;
      justify-content: center;
    }

    pre {
      position: relative;
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }

    .submitting {
      display: block;
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      padding: 0;
      text-align: center;
      background: rgba(0, 0, 0, 0.4);
      color: white;
      z-index: 10;
      font-weight: bold;
      font-size: 1em;
    }

    .saving {
      font-size: 1em;  // Increased font size for saving message
      font-weight: bold;
      color: darkblue;
      margin: 8px 0 0 7px;
    }
  }

  button {
    margin: 0 10px;
    &[type="submit"] {
      ${btnPrimary};
    }
    &[type="button"] {
      ${btnDefault};
    }
    &[type="reset"] {
      ${btnDanger};
    }
  }

  .downshift-options {
    border: 1px solid #ddd;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

    & > div {
      padding: 10px;  // Increased padding for downshift options
    }
  }
`;

export default Styles;
