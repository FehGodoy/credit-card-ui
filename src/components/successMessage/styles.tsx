import styled from 'styled-components';

export const boxMessageValidate = styled.div`
padding: 6rem 18rem;
@media screen and (max-width:640px){
    padding: 8rem 0rem 4rem 0rem;


}

@media screen and(max-width:375px){
    .boxFrontCard{

        .headerCard{
            img{
                width:50px ;
            }
        }
        .boxNumber{
            bottom:140px ;

            span{
                font-size: 1rem ;
            }
        }
        .boxNamePerson{
            bottom:115px ;

            span{
                font-size: .6rem ;
            }
        }
        .validadeData{
            bottom: 115px ;
            right: 8px ;

            span{
                font-size:.6rem ;
            }
        }
    }
    .boxBackCard{
        top:0 ;
    }
}


h5{
    letter-spacing:10px ;
}
`