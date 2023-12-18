import styled from "styled-components";
import {NavLink} from "react-router-dom";


const StyledAppHeader = styled.header`
  
 
  

  .app {

    &__title {
      font-weight: bold;
      font-size: 28px;
      line-height: 37px;
      span {
        color:  ${props => props.theme.colors.main};
      }
    }
    &__menu {
      ul {
        display: flex;
        justify-content: flex-end;
        font-weight: bold;
        font-size: 24px;
        line-height: 32px;
        li {
          margin: 0 8px;
          a:hover {
            color:  ${props => props.theme.colors.main};
          }
        }
      }
    }
  }



`
const AppHeader = () => {
    return (
        <StyledAppHeader id={'app__header'}>

            <h1 className="app__title">
                <NavLink  exact to={'/'}>
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink activeClassName={'active-nav'} exact to={'/'}>Characters</NavLink></li>
                    /
                    <li><NavLink activeClassName={'active-nav'} exact to={'/comics'}>Comics</NavLink></li>
                </ul>
            </nav>


        </StyledAppHeader>
    )
}

export default AppHeader;