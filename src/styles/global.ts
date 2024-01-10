import {createGlobalStyle} from "styled-components";
import {skeletonStyle} from "./skeleton-style.ts";
import {charStyles} from "./char-styles.ts";
import {randomcharStyles} from "./randomchar-styles.ts";
import {singlecomicStyles} from "./singlecomic-styles.ts";

export const GlobalStyles = createGlobalStyle`

  ${skeletonStyle}
  ${charStyles}
  ${randomcharStyles}
  ${singlecomicStyles}

  * {
    font-family: "Roboto Condensed", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul,
  li,
  dl {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
    &:hover {
      text-decoration: none;
      color: inherit;
    }
  }

  p {
    margin: 0;
    padding: 0;
  }
  
  header {
    
      display: flex;
      align-items: center;
      justify-content: space-between;
    
  }
  
  .active.nav-link {
    color: #9F0013;
  }

  .comics__item-img {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
    width: 225px;
    height: 190px;
    display: block;
  }
  
  .randomchar {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .app {
    width: 1100px;
    margin: 0 auto;
    padding: 50px 0 50px 0;
    position: relative;
    .bg-decoration {
      position: absolute;
      right: -174px;
      bottom: -70px;
      z-index: -1;
    }
  }

  main {
    margin-top: 50px;
    position: relative;
  }

  .pulse {
    animation: pulse 1.5s ease-in-out .5s infinite
  }

  button:disabled {
    opacity: 0.8;
  }

  .button {
    min-width: 101px;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
    transition: 0.3s transform;
    border: none;
    background-color: transparent;
    cursor: pointer;
    &__long {
      display: block;
      width: 200px;
      margin: 45px auto 0 auto;
    }
    .inner {
      position: relative;
      background-color: ${props => props.theme.colors.main};
      line-height: 18px;
      padding: 0 18px;
      transition: none;
      &::before {
        border-color:  ${props => props.theme.colors.main} transparent;
        border-style: solid;
        border-width: 0 0 10px 10px;
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: -10px;
        transition: none;
      }
      &::after {
        border-color:  ${props => props.theme.colors.main} transparent;
        border-style: solid;
        border-width: 0 0 10px 10px;
        content: "";
        display: block;
        position: absolute;
        right: 0;
        bottom: -10px;
        transform: rotate(180deg);
        transition: none;
      }
    }
    &__main, &__secondary {
      &:hover {
        color: #fff;
      }
    }
    &__secondary {
      .inner {
        background-color:  ${props => props.theme.colors.grey};
        &::before {
          border-color:  ${props => props.theme.colors.grey} transparent;
          transition: none;
        }
        &::after {
          border-color:  ${props => props.theme.colors.grey} transparent;
          transition: none;
        }
      }
    }
    &::before {
      content: '';
      display: block;
      height: 10px;
      margin-left: 10px;
      transition: none;

    }
    &::after {
      content: '';
      display: block;
      height: 10px;
      margin-right: 10px;
      transition: none;

    }
    &.button__main::before, &.button__main::after {
      background-color:  ${props => props.theme.colors.main};
    }
    &.button__secondary::before, &.button__secondary::after {
      background-color:  ${props => props.theme.colors.grey};
    }
    &:hover {
      transform: translateY(-5px);
    }
  }
  
  .error {
    margin: 5px 0;
    text-align: center;
    color: red;
  }
  
  .char-form {
    padding: 15px;
  }

  @keyframes pulse {
    0% {
      opacity: 1
    }
    50% {
      opacity: .4
    }
    100% {
      opacity: 1
    }
  }



`