import avengers from '../../assets/images/Avengers.png';
import avengersLogo from '../../assets/images/Avengers_logo.png';
import styled from "styled-components";

const StyledAppBanner = styled.div`
  
  .app {
    &__banner {
      width: 100%;
      background-color: ${props => props.theme.colors.main};
      height: 100px;
      padding: 0 25px 0 45px;
      display: grid;
      grid-template-columns: 152px auto 133px;
      &-text {
        font-weight: bold;
        font-size: 24px;
        line-height: 32px;
        color: #FFFFFF;
        padding-left: 83px;
        padding-top: 18px;
      }
    }
  }

`

const AppBanner = () => {
    return (
       <StyledAppBanner>

           <div className="app__banner">
               <img src={avengers} alt="Avengers"/>
               <div className="app__banner-text">
                   New comics every week!<br/>
                   Stay tuned!
               </div>
               <img src={avengersLogo} alt="Avengers logo"/>
           </div>

       </StyledAppBanner>
    )
}

export default AppBanner;