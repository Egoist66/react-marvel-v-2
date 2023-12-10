import styled from "styled-components";


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
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="#">Characters</a></li>
                    /
                    <li><a href="#">Comics</a></li>
                </ul>
            </nav>


        </StyledAppHeader>
    )
}

export default AppHeader;