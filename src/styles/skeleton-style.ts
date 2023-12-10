import {css} from "styled-components";

export const skeletonStyle = css`
  
  .skeleton {
    &__header {
      display: grid;
      grid-template-columns: 40px auto;
      column-gap: 10px;
      align-items: center;
    }
    &__circle {
      width: 40px;
      height: 40px;
      background-color: #C4C4C4;
      border-radius: 100%;
    }
    &__mini {
      width: 100%;
      height: 16px;
      background-color: #C4C4C4;
    }
    &__block {
      height: 35px;
      width: 100%;
      background-color: #C4C4C4;
      margin-top: 15px;
    }
  }


`